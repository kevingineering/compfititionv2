import { GoalButtonTypes } from '../buttonTypes';
import { TGoal } from '../../types';

export enum EGoalActions {
  GOAL_LOADING = 'GOAL_LOADING',
  SET_GOALS = 'SET_GOALS',
  GET_GOAL = 'GET_GOAL',
  ADD_GOAL = 'ADD_GOAL',
  DELETE_GOAL = 'DELETE_GOAL',
  UPDATE_GOAL = 'UPDATE_GOAL',
  UPDATE_GOAL_LEDGER = 'UPDATE_GOAL_LEDGER',
  SET_CURRENT_GOAL = 'SET_CURRENT_GOAL',
  CLEAR_CURRENT_GOAL = 'CLEAR_CURRENT_GOAL',
  GOAL_ERROR = 'GOAL_ERROR',
}

export interface IGoalLoading {
  type: EGoalActions.GOAL_LOADING;
  payload: GoalButtonTypes;
}

export interface ISetGoals {
  type: EGoalActions.SET_GOALS;
  payload: { pastGoals: TGoal[]; activeGoals: TGoal[] };
}

export interface IGetGoal {
  type: EGoalActions.GET_GOAL;
  payload: TGoal;
}

export interface IGoalError {
  type: EGoalActions.GOAL_ERROR;
}

export interface ISetSelectedGoal {
  type: EGoalActions.SET_CURRENT_GOAL;
  payload: string;
}

export interface IClearSelectedGoal {
  type: EGoalActions.CLEAR_CURRENT_GOAL;
}

export interface IAddGoal {
  type: EGoalActions.ADD_GOAL;
  payload: TGoal;
}

export interface IUpdateGoal {
  type: EGoalActions.UPDATE_GOAL;
  payload: TGoal;
}

export interface IUpdateGoalLedger {
  type: EGoalActions.UPDATE_GOAL_LEDGER;
  payload: TGoal;
}

export interface IDeleteGoal {
  type: EGoalActions.DELETE_GOAL;
  payload: string;
}

export type GoalDispatchTypes =
  | IGoalLoading
  | ISetGoals
  | IGetGoal
  | IGoalError
  | ISetSelectedGoal
  | IClearSelectedGoal
  | IAddGoal
  | IUpdateGoal
  | IDeleteGoal
  | IUpdateGoalLedger;
