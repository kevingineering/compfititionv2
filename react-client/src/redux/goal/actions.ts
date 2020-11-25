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
import { TGoalDTO, TLedgerDTO } from '../DTOs';
import { SetAlert } from '../alert/actions';
import {
  NO_BUTTON,
  ADD_GOAL_BUTTON,
  UPDATE_GOAL_BUTTON,
  UPDATE_GOAL_LEDGER_BUTTON,
  DELETE_GOAL_BUTTON,
} from '../buttonTypes';

export const GetUserGoals = () => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/goals');
    dispatch({ type: GET_GOALS, payload: res.data });
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const SetSelectedGoal = (id: string) => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_GOAL, payload: id });
};

export const ClearSelectedGoal = () => (
  dispatch: Dispatch<GoalDispatchTypes>
) => {
  dispatch({ type: CLEAR_CURRENT_GOAL });
};

export const GetGoal = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/goals/' + id);
    dispatch({ type: GET_GOAL, payload: res.data });
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const AddGoal = (goal: TGoalDTO) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: ADD_GOAL_BUTTON });
    const res = await axios.post('/api/goals', goal);
    dispatch({ type: ADD_GOAL, payload: res.data });
    dispatch(SetAlert('Goal added', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const UpdateGoal = (goal: TGoalDTO, id: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: UPDATE_GOAL_BUTTON });
    const res = await axios.patch('/api/goals/' + id, goal);
    dispatch({ type: UPDATE_GOAL, payload: res.data });
    dispatch(SetAlert('Goal updated', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const UpdateGoalLedger = (ledger: TLedgerDTO) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: UPDATE_GOAL_LEDGER_BUTTON });
    const res = await axios.patch('/api/goals/ledger', ledger);
    dispatch({ type: UPDATE_GOAL_LEDGER, payload: res.data });
    dispatch(SetAlert('Goal saved', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};

export const DeleteGoal = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, GoalDispatchTypes>
) => {
  try {
    dispatch({ type: GOAL_LOADING, payload: DELETE_GOAL_BUTTON });
    await axios.delete('/api/goals/' + id);
    dispatch({ type: DELETE_GOAL, payload: id });
    dispatch(SetAlert('Goal deleted', true));
  } catch (error) {
    dispatch({ type: GOAL_ERROR });
  }
};
