import React from 'react';
import GoalItem from './GoalItem';
import { TGoal } from '../../../types';

interface IProps {
  goals: TGoal[];
  isOwner: boolean;
  isComp: boolean;
}

const GoalList: React.FC<IProps> = ({ goals, isOwner, isComp }) => {
  const goalList = goals.map((goal, index) => {
    return (
      <GoalItem key={index} goal={goal} isOwner={isOwner} isComp={isComp} />
    );
  });
  return <React.Fragment>{goalList}</React.Fragment>;
};

export default GoalList;
