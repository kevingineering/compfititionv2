import { GoalButtonTypes } from '../buttonTypes';
import { TGoal } from '../../types';

export const GOAL_LOADING = 'GOAL_LOADING';
export const GET_GOALS = 'GET_GOALS';
export const GET_GOAL = 'GET_GOAL';
export const ADD_GOAL = 'ADD_GOAL';
export const DELETE_GOAL = 'DELETE_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const UPDATE_GOAL_LEDGER = 'UPDATE_GOAL_LEDGER';
export const SET_CURRENT_GOAL = 'SET_CURRENT_GOAL';
export const CLEAR_CURRENT_GOAL = 'CLEAR_CURRENT_GOAL';
export const GOAL_ERROR = 'GOAL_ERROR';

export interface IGoalLoading {
  type: typeof GOAL_LOADING;
  payload: GoalButtonTypes;
}

export interface IGetGoals {
  type: typeof GET_GOALS;
  payload: TGoal[];
}

export interface IGetGoal {
  type: typeof GET_GOAL;
  payload: TGoal;
}

export interface IGoalError {
  type: typeof GOAL_ERROR;
}

export interface ISetSelectedGoal {
  type: typeof SET_CURRENT_GOAL;
  payload: string;
}

export interface IClearSelectedGoal {
  type: typeof CLEAR_CURRENT_GOAL;
}

export interface IAddGoal {
  type: typeof ADD_GOAL;
  payload: TGoal;
}

export interface IUpdateGoal {
  type: typeof UPDATE_GOAL;
  payload: TGoal;
}

export interface IUpdateGoalLedger {
  type: typeof UPDATE_GOAL_LEDGER;
  payload: TGoal;
}

export interface IDeleteGoal {
  type: typeof DELETE_GOAL;
  payload: string;
}

export type GoalDispatchTypes =
  | IGoalLoading
  | IGetGoals
  | IGetGoal
  | IGoalError
  | ISetSelectedGoal
  | IClearSelectedGoal
  | IAddGoal
  | IUpdateGoal
  | IDeleteGoal
  | IUpdateGoalLedger;
