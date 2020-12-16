import React from 'react';
import GCChartDifference from './GCChartDifference';
import GCChartCumulative from './GCChartCumulative';
import GCChartPassFail from './GCChartPassFail';
import {
  getGoalCumulativeDataPoints,
  getGoalDifferenceDataPoints,
} from '../../../util/goalFunctions';
import { EGoalCategory, TGoal } from '../../../types';

interface IProps {
  goal: TGoal;
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  time: number;
  isClickable: boolean;
}

const GCChart: React.FC<IProps> = ({
  goal,
  record,
  setRecord,
  time,
  isClickable,
}) => {
  let jsx: any = '';
  if (goal.category === EGoalCategory.cumulative) {
    let { dataPoints, chartYMax } = getGoalCumulativeDataPoints(
      record,
      time,
      goal.units!
    );
    jsx = <GCChartCumulative dataPoints={dataPoints} chartYMax={chartYMax} />;
  } else if (goal.category === EGoalCategory.difference) {
    //many values can be null, so this value is used to keep chart width where it should be without empty values
    const chartXMax = time;
    let { dataPoints, chartYMax, chartYMin } = getGoalDifferenceDataPoints(
      goal.initialValue!,
      goal.units!,
      time,
      record
    );
    jsx = (
      <GCChartDifference
        dataPoints={dataPoints}
        chartXMax={chartXMax}
        chartYMax={chartYMax}
        chartYMin={chartYMin}
      />
    );
  } else {
    return (
      <GCChartPassFail
        isClickable={isClickable}
        time={time}
        record={record}
        setRecord={setRecord}
        duration={goal.duration}
        startTime={goal.startTime}
        daysPerWeek={goal.daysPerWeek!}
        isFinished={time === goal.duration}
      />
    );
  }

  return jsx;
};

export default GCChart;
