import React, { useEffect } from 'react';
import GoalCompInputs from '../../sharedComponents/GoalCompInputs';
import { useDispatch, useSelector } from 'react-redux';
import { AddGoal } from '../../redux/goal/actions';
import { TGoalDTO } from '../../redux/DTOs';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import { ADD_GOAL_BUTTON } from '../../redux/buttonTypes';

const AddGoalPage = () => {
  const dispatch = useDispatch();
  const goalState = useSelector((state: RootStore) => state.goalState);
  let history = useHistory();

  const dispatchAction = (goal: TGoalDTO) => {
    dispatch(AddGoal(goal));
  };

  //redirects to goal page after successful submission
  useEffect(() => {
    if (goalState.selectedGoal !== undefined) {
      history.push('/goal/' + goalState.selectedGoal!.id);
    }
  }, [goalState.selectedGoal, history]);

  return (
    <GoalCompInputs
      isGoal={true}
      isUpdate={false}
      dispatchAction={dispatchAction}
      isLoading={goalState.loadingButton === ADD_GOAL_BUTTON}
    />
  );
};

export default AddGoalPage;
