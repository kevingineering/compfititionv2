import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import { TGoalRequest } from '../../redux/Models';
import { UpdateGoal } from '../../redux/goal/actions';
import GCInputs from '../../sharedComponents/goalCompPage/GCInputs';
import { SetAlert } from '../../redux/alert/actions';
import { timeIsInPast } from '../../util/dateFunctions';
import { UPDATE_GOAL_BUTTON } from '../../redux/buttonTypes';

//page for changing goal parameters
const UpdateGoalPage = () => {
  const dispatch = useDispatch();
  const goalState = useSelector((state: RootStore) => state.goalState);
  let history = useHistory();
  const [isModified, setisModified] = useState(false);

  const dispatchAction = (goal: TGoalRequest) => {
    dispatch(UpdateGoal(goal, goalState.selectedGoal!.goalId));
  };

  //redirect if selected goal is empty - should only occur on reload
  useEffect(() => {
    if (goalState.selectedGoal === undefined) {
      console.log('redirect from update goal');
      history.push('/');
    }
  }, [goalState.selectedGoal, history]);

  //warn users if goal has already started
  useEffect(() => {
    if (
      goalState.selectedGoal !== undefined &&
      timeIsInPast(goalState.selectedGoal!.startTime!.toString())
    ) {
      dispatch(
        SetAlert(
          'This goal has already begun, so some attributes cannot be changed.'
        )
      );
    }
    //eslint-disable-next-line
  }, []);

  //redirects to goal page after successful submission
  useEffect(() => {
    if (!isModified) {
      setisModified(true);
    } else {
      history.push('/goal/' + goalState.selectedGoal!.goalId);
    }
    //eslint-disable-next-line
  }, [goalState.selectedGoal, history]);

  return (
    <GCInputs
      isGoal={true}
      isUpdate={true}
      dispatchAction={dispatchAction}
      isLoading={goalState.loadingButton === UPDATE_GOAL_BUTTON}
      goal={goalState.selectedGoal}
    />
  );
};

export default UpdateGoalPage;
