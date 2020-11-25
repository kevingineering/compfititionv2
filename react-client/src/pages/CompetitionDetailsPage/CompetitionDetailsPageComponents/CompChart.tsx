import React from 'react';
import { TCompetition, EGoalType } from '../../../types';
import GoalChartCumulative from '../../GoalDetailsPage/GoalDetailsPageComponent/GoalChartComponents/GoalChartCumulative';
import GoalChartDifference from '../../GoalDetailsPage/GoalDetailsPageComponent/GoalChartComponents/GoalChartDifference';
import {
  getCompDataPoints,
  TCompetitionParticipantInfo,
} from '../../../util/competitionFunctions';
import CompChartPassFail from './CompChartPassFail';

interface IProps {
  competition: TCompetition;
  competitionArray: TCompetitionParticipantInfo[];
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  time: number;
}

const CompChart: React.FC<IProps> = ({
  competition,
  competitionArray,
  record,
  setRecord,
  time,
}) => {
  let jsx: any = '';
  if (competition.type === EGoalType.cumulative) {
    let dataPoints = getCompDataPoints(
      competitionArray,
      competition.type,
      competition.units
    );
    jsx = <GoalChartCumulative dataPoints={dataPoints} />;
  } else if (competition.type === EGoalType.difference) {
    let dataPoints = getCompDataPoints(
      competitionArray,
      competition.type,
      competition.units
    );
    jsx = <GoalChartDifference dataPoints={dataPoints} />;
  } else {
    return (
      <CompChartPassFail
        time={time}
        record={record}
        setRecord={setRecord}
        competitionArray={competitionArray}
        competition={competition}
      />
    );
  }

  return jsx;
};

export default CompChart;
