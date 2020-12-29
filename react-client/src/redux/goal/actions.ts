import { ThunkDispatch } from 'redux-thunk';
import { GoalDispatchTypes, EGoalActions } from './types';
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

export const SetSelectedGoal = (goalId: string) => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: EGoalActions.SET_CURRENT_GOAL, payload: goalId });
};

export const ClearSelectedGoal = () => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: EGoalActions.CLEAR_CURRENT_GOAL });
};

export const GetGoal = (goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: EGoalActions.GOAL_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/goal/' + goalId);
    dispatch({ type: EGoalActions.GET_GOAL, payload: res.data });
  } catch (error) {
    dispatch({ type: EGoalActions.GOAL_ERROR });
  }
};

export const AddGoal = (goal: TGoalRequest) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: EGoalActions.GOAL_LOADING, payload: ADD_GOAL_BUTTON });
    const res = await axios.post('/api/goal', goal);
    dispatch({ type: EGoalActions.ADD_GOAL, payload: res.data });
    dispatch(SetAlert('Goal added', true));
  } catch (error) {
    dispatch({ type: EGoalActions.GOAL_ERROR });
  }
};

export const UpdateGoal = (goal: TGoalRequest, goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: EGoalActions.GOAL_LOADING, payload: UPDATE_GOAL_BUTTON });
    const res = await axios.patch('/api/goal/' + goalId, goal);
    dispatch({ type: EGoalActions.UPDATE_GOAL, payload: res.data });
    dispatch(SetAlert('Goal updated', true));
  } catch (error) {
    dispatch({ type: EGoalActions.GOAL_ERROR });
  }
};

export const UpdateGoalLedger = (ledger: TLedgerRequest) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({
      type: EGoalActions.GOAL_LOADING,
      payload: UPDATE_GOAL_LEDGER_BUTTON,
    });
    const res = await axios.patch('/api/goal/ledger', ledger);
    dispatch({ type: EGoalActions.UPDATE_GOAL_LEDGER, payload: res.data });
    dispatch(SetAlert('Goal saved', true));
  } catch (error) {
    dispatch({ type: EGoalActions.GOAL_ERROR });
  }
};

export const DeleteGoal = (goalId: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: EGoalActions.GOAL_LOADING, payload: DELETE_GOAL_BUTTON });
    await axios.delete('/api/goal/' + goalId);
    dispatch({ type: EGoalActions.DELETE_GOAL, payload: goalId });
    dispatch(SetAlert('Goal deleted', true));
  } catch (error) {
    dispatch({ type: EGoalActions.GOAL_ERROR });
  }
};
