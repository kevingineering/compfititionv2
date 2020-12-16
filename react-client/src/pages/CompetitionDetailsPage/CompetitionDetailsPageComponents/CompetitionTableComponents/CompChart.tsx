import React from 'react';
import { TCompetition, EGoalCategory } from '../../../../types';
import {
  getCompDataPoints,
  TCompetitionParticipantInfo,
} from '../../../../util/competitionFunctions';
import CompChartPassFail from './CompChartPassFail';
import GCChartCumulative from '../../../../sharedComponents/goalCompPage/goalcompCharts/GCChartCumulative';
import GCChartDifference from '../../../../sharedComponents/goalCompPage/goalcompCharts/GCChartDifference';

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
  if (competition.category === EGoalCategory.cumulative) {
    let { dataPoints, chartYMax } = getCompDataPoints(
      competitionArray,
      competition.category,
      competition.units!
    );
    jsx = <GCChartCumulative dataPoints={dataPoints} chartYMax={chartYMax} />;
  } else if (competition.category === EGoalCategory.difference) {
    let { dataPoints, chartYMax, chartYMin } = getCompDataPoints(
      competitionArray,
      competition.category,
      competition.units!
    );
    jsx = (
      <GCChartDifference
        dataPoints={dataPoints}
        isComp={true}
        chartYMax={chartYMax}
        chartYMin={chartYMin}
        chartXMax={time}
      />
    );
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
