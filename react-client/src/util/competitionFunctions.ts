import { getGoalTime } from './dateFunctions';
import { TCompetition, EGoalType } from '../types';

//competition information for a single participant
export type TCompetitionParticipantInfo = {
  name: string;
  score: number;
  dataArray: any[];
  initialValue: number;
  userId: string;
};

//creates record for a single participant
export const getCompRecord = (
  competition: TCompetition,
  ledger: string | null
) => {
  const { isStarted, time, isFinished } = getGoalTime(
    competition.startTime,
    competition.duration
  );

  let record: (number | null)[] = ledger ? JSON.parse(ledger) : [];

  // TEST
  if (!isStarted || isFinished) {
    return record;
  }

  for (let i = 0; i <= time; i++) {
    if (competition.type === EGoalType.passfail) {
      record[i] = record[i] ? 1 : 0;
    } else if (competition.type === EGoalType.cumulative) {
      record[i] = record[i] || 0;
    } else {
      record[i] = record[i] || null;
    }
  }

  return record;
};

//creates array of all competition participant information
//TODO - optimize so only user array updates
export const getCompetitionArray = (
  competition: TCompetition,
  userRecord?: (number | null)[],
  id?: string
) => {
  let competitionArray: TCompetitionParticipantInfo[] = competition.participants.map(
    (participant) => {
      let record;
      if (participant.userId === id && userRecord) {
        record = userRecord;
      } else {
        record = getCompRecord(competition, participant.ledger);
      }

      let { score, dataArray } = getCompScores(
        competition.type,
        record,
        participant.initialValue
      );
      let item: TCompetitionParticipantInfo = {
        name: participant.name ? participant.name : 'TODO',
        score: score,
        dataArray,
        initialValue: participant.initialValue || 0,
        userId: participant.userId,
      };
      return item;
    }
  );

  return competitionArray;
};

//returns score and an array showing inputs to date
export const getCompScores = (
  type: string,
  record: (number | null)[],
  initialValue?: number | undefined
) => {
  if (record === null) {
    return { score: 0, dataArray: [] };
  }

  let score = 0;
  let dataArray = new Array<number | null>(record.length);
  if (type === EGoalType.difference) {
    record.forEach((day) => {
      if (day !== null) {
        score = day - initialValue!;
      }
    });
    dataArray = record;
    if (!record[record.length - 1]) {
      dataArray[record.length - 1] = score + initialValue!;
    }
  } else if (type === EGoalType.passfail) {
    record.forEach((day) => {
      score += day!;
    });
    dataArray = record;
  } else {
    record.forEach((day, index) => {
      score += day!;
      dataArray[index] = score;
    });
  }

  return { score, dataArray };
};

//TODO - optimize so only user data points update
export const getCompDataPoints = (
  competitionArray: TCompetitionParticipantInfo[],
  type: string,
  units: string
) => {
  //format data array and configure tooltip
  let dataPointsZero: any[] = ['x'];
  let dataPointsOne: any[] = [0];
  let dataPointsBeyond: any[] = [];
  let dataLength = 0;

  if (competitionArray.length !== 0) {
    dataLength = competitionArray[0].dataArray.length;
  }

  let tooltipMsg1 = type === EGoalType.cumulative ? 'Daily: ' : 'Change: ';
  let tooltipMsg2 = type === EGoalType.cumulative ? 'Total: ' : 'Current: ';
  //configure initial values (dataPoints [0] and[1])
  for (let i = 0; i < competitionArray.length; i++) {
    dataPointsZero.push(competitionArray[i].name, {
      role: 'tooltip',
      type: 'string',
      p: { html: true },
    });
    //all difference goals start at zero
    dataPointsOne.push(
      type === EGoalType.cumulative ? competitionArray[i].initialValue : 0,
      'Start'
    );
  }

  //values at edge of chart
  let chartYMax = 0;
  let chartYMin = 0;

  //configure rest of dataPoints
  for (let i = 0; i < dataLength; i++) {
    let list: (number | string)[] = [i + 1];
    for (let j = 0; j < competitionArray.length; j++) {
      let difference =
        type === EGoalType.cumulative
          ? competitionArray[j].dataArray[i] -
            (competitionArray[j].dataArray[i - 1] || 0)
          : competitionArray[j].dataArray[i] - competitionArray[j].initialValue;
      let sign = difference > 0 ? '+' : '';

      chartYMax = Math.max(
        chartYMax,
        type === EGoalType.cumulative
          ? competitionArray[j].dataArray[i]
          : difference
      );

      chartYMin =
        type === EGoalType.difference && competitionArray[j].dataArray[i]
          ? Math.min(chartYMin, difference)
          : 0;

      //show running total for cumulative goal, difference from start (or null with interpolation) for difference goal
      list.push(
        type === EGoalType.cumulative
          ? competitionArray[j].dataArray[i]
          : //check if null on difference goal
          competitionArray[j].dataArray[i]
          ? difference
          : null,
        `Day ${i + 1} 
        ${tooltipMsg1} ${
          type === EGoalType.cumulative ? difference : sign + difference
        } ${units}
        ${tooltipMsg2} ${competitionArray[j].dataArray[i]} ${units}`
      );
      dataPointsBeyond.push(list);
    }
  }

  let dataPoints = [dataPointsZero, dataPointsOne, ...dataPointsBeyond];
  return { dataPoints, chartYMax, chartYMin };
};
