import { ThunkDispatch } from 'redux-thunk';
import {
  GoalDispatchTypes,
  GOAL_LOADING,
  GOAL_ERROR,
  GET_GOALS,
  GET_GOAL,
  SET_CURRENT_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  CLEAR_CURRENT_GOAL,
  DELETE_GOAL,
  UPDATE_GOAL_LEDGER,
} from './types';
import axios from 'axios';
import { Dispatch } from 'redux';
import { TGoalRequest, TLedgerRequest } from '../Models';
import { SetAlert } from '../alert/actions';
import {
  NO_BUTTON,
  ADD_GOAL_BUTTON,
  UPDATE_GOAL_BUTTON,
  UPDATE_GOAL_LEDGER_BUTTON,
  DELETE_GOAL_BUTTON,
} from '../buttonTypes';

export const GetGoals = () => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/goal');
    dispatch({ type: GET_GOALS, payload: res.data });
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const SetSelectedGoal = (goalId: string) => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_GOAL, payload: goalId });
};

export const ClearSelectedGoal = () => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: CLEAR_CURRENT_GOAL });
};

export const GetGoal = (goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/goal/' + goalId);
    dispatch({ type: GET_GOAL, payload: res.data });
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const AddGoal = (goal: TGoalRequest) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: ADD_GOAL_BUTTON });
    const res = await axios.post('/api/goal', goal);
    dispatch({ type: ADD_GOAL, payload: res.data });
    dispatch(SetAlert('Goal added', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const UpdateGoal = (goal: TGoalRequest, goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: UPDATE_GOAL_BUTTON });
    const res = await axios.patch('/api/goal/' + goalId, goal);
    dispatch({ type: UPDATE_GOAL, payload: res.data });
    dispatch(SetAlert('Goal updated', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const UpdateGoalLedger = (ledger: TLedgerRequest) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: UPDATE_GOAL_LEDGER_BUTTON });
    const res = await axios.patch('/api/goal/ledger', ledger);
    dispatch({ type: UPDATE_GOAL_LEDGER, payload: res.data });
    dispatch(SetAlert('Goal saved', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const DeleteGoal = (goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: DELETE_GOAL_BUTTON });
    await axios.delete('/api/goal/' + goalId);
    dispatch({ type: DELETE_GOAL, payload: goalId });
    dispatch(SetAlert('Goal deleted', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};
