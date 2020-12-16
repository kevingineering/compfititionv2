import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddGoal } from '../../redux/goal/actions';
import { TGoalRequest } from '../../redux/Models';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import { ADD_GOAL_BUTTON } from '../../redux/buttonTypes';
import GCInputs from '../../sharedComponents/goalCompPage/GCInputs';

const AddGoalPage = () => {
  const dispatch = useDispatch();
  const goalState = useSelector((state: RootStore) => state.goalState);
  let history = useHistory();

  const dispatchAction = (goal: TGoalRequest) => {
    dispatch(AddGoal(goal));
  };

  //redirects to goal page after successful submission
  useEffect(() => {
    if (goalState.selectedGoal !== undefined) {
      history.push('/goal/' + goalState.selectedGoal!.goalId);
    }
  }, [goalState.selectedGoal, history]);

  return (
    <GCInputs
      isGoal={true}
      isUpdate={false}
      dispatchAction={dispatchAction}
      isLoading={goalState.loadingButton === ADD_GOAL_BUTTON}
    />
  );
};

export default AddGoalPage;
