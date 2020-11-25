import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import { TGoalDTO } from '../../redux/DTOs';
import { UpdateGoal } from '../../redux/goal/actions';
import GoalCompInputs from '../../sharedComponents/GoalCompInputs';
import { SetAlert } from '../../redux/alert/actions';
import { dateIsBeforeToday } from '../../util/dateFunctions';
import { UPDATE_GOAL_BUTTON } from '../../redux/buttonTypes';

//page for changing goal parameters
const UpdateGoalPage = () => {
  const dispatch = useDispatch();
  const goalState = useSelector((state: RootStore) => state.goalState);
  let history = useHistory();
  const [isModified, setisModified] = useState(false);

  const dispatchAction = (goal: TGoalDTO) => {
    dispatch(UpdateGoal(goal, goalState.selectedGoal!.id));
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
      dateIsBeforeToday(goalState.selectedGoal!.startDate!.toString())
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
      history.push('/goal/' + goalState.selectedGoal!.id);
    }
    //eslint-disable-next-line
  }, [goalState.selectedGoal, history]);

  return (
    <GoalCompInputs
      isGoal={true}
      isUpdate={true}
      dispatchAction={dispatchAction}
      isLoading={goalState.loadingButton === UPDATE_GOAL_BUTTON}
      goal={goalState.selectedGoal}
    />
  );
};

export default UpdateGoalPage;
