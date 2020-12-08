import { getGoalTime } from './dateFunctions';
import { EGoalType, TGoal } from '../types';

//returns cumulative score of goal to date
export const getGoalScore = (
  type: string,
  record: (number | null)[],
  initialValue?: number | undefined
): number => {
  if (record === null) {
    return 0;
  }
  let score = 0;
  if (type === EGoalType.difference) {
    record.forEach((day) => {
      if (day !== null) {
        //change from day one
        score = day - initialValue!;
      }
    });
  } else {
    record.forEach((day) => {
      score += day!;
    });
  }

  return score;
};

//parses goal ledger and returns array of goal values to date
export const getGoalRecord = (goal: TGoal): (number | null)[] => {
  const { isStarted, time, isFinished } = getGoalTime(
    goal.startTime,
    goal.duration
  );
  let record: (number | null)[] = goal.ledger ? JSON.parse(goal.ledger) : [];
  //TEST
  if (!isStarted || isFinished) {
    return record;
  }

  //fills record with ledger or default values
  for (let i = 0; i <= time; i++) {
    if (goal.type === EGoalType.passfail) {
      record[i] = record[i] ? 1 : 0;
    } else if (goal.type === EGoalType.cumulative) {
      record[i] = record[i] || 0;
    } else {
      record[i] = record[i] || null;
    }
  }

  return record;
};

//creates array of data points for google chart
export const getGoalCumulativeDataPoints = (
  record: (number | null)[],
  time: number,
  units: string
) => {
  //initial values
  const dataPoints = [
    [
      'x',
      'Daily',
      { role: 'tooltip', type: 'string', p: { html: true } },
      'Total',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ],
    [0, 0, 'Start', 0, 'Start'],
  ];

  //populate data array
  let runningTotal = 0;
  for (let i = 0; i <= time; i++) {
    runningTotal += record[i]!;
    dataPoints.push([
      i + 1,
      record[i]!,
      `Day ${i + 1} \n Daily: ${record[i]} ${units}`,
      runningTotal,
      `Day ${i + 1} \n Total: ${runningTotal} ${units}`,
    ]);
  }

  return { dataPoints, chartYMax: runningTotal };
};

//creates array of data points for google chart
export const getGoalDifferenceDataPoints = (
  initialValue: number,
  units: string,
  time: number,
  record: (number | null)[]
) => {
  let chartYMax = initialValue;
  let chartYMin = initialValue;

  //initial values
  const dataPoints = [
    ['x', 'Daily', { role: 'tooltip', type: 'string', p: { html: true } }],
    [0, initialValue, `Start \n ${initialValue} ${units}`],
  ];

  //set dataPoints - time + 1 because we are storing start value in [0]
  for (let i = 0; i <= time; i++) {
    if (record[i] !== null) {
      let difference = record[i]! - initialValue;
      let sign = difference > 0 ? '+' : '';
      chartYMax = Math.max(chartYMax, record[i]!);
      chartYMin = Math.min(chartYMin, record[i]!);

      dataPoints.push([
        i + 1,
        record[i]!,
        `Day ${i + 1} \n Current: ${
          record[i]
        } ${units} \n Change: ${sign}${difference} ${units}`,
      ]);
    }
  }

  return { dataPoints, chartYMax, chartYMin };
};
