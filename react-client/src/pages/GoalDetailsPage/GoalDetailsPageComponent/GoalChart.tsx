import React from 'react';
import GoalChartDifference from './GoalChartComponents/GoalChartDifference';
import GoalChartCumulative from './GoalChartComponents/GoalChartCumulative';
import GoalChartPassFail from './GoalChartComponents/GoalChartPassFail';
import {
  getGoalCumulativeDataPoints,
  getGoalDifferenceDataPoints,
} from '../../../util/goalFunctions';
import { EGoalType, TGoal } from '../../../types';

interface IProps {
  goal: TGoal;
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  time: number;
  isClickable: boolean;
}

const GoalChart: React.FC<IProps> = ({
  goal,
  record,
  setRecord,
  time,
  isClickable,
}) => {
  let jsx: any = '';
  if (goal.type === EGoalType.cumulative) {
    let dataPoints = getGoalCumulativeDataPoints(record, time, goal.units!);
    jsx = <GoalChartCumulative dataPoints={dataPoints} />;
  } else if (goal.type === EGoalType.difference) {
    let { dataPoints, chartMax } = getGoalDifferenceDataPoints(
      goal.initialValue!,
      goal.units!,
      time,
      goal.duration,
      record
    );
    jsx = <GoalChartDifference dataPoints={dataPoints} chartMax={chartMax} />;
  } else {
    return (
      <GoalChartPassFail
        isClickable={isClickable}
        time={time}
        record={record}
        setRecord={setRecord}
        duration={goal.duration}
        startDate={goal.startDate}
        target={goal.target}
      />
    );
  }

  return jsx;
};

export default GoalChart;
