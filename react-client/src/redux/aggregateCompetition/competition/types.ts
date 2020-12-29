import { TGoal, TCompetition } from '../../../types';

export enum ECompetitionActions {
  SET_COMPETITION_GOALS = 'SET_COMPETITION_GOALS',
  GET_GOAL = 'GET_GOAL',
  ADD_GOAL = 'ADD_GOAL',
  UPDATE_GOAL = 'UPDATE_GOAL',
  DELETE_GOAL = 'DELETE_GOAL',
  CLEAR_CURRENT_GOAL = 'CLEAR_CURRENT_GOAL',
}

export interface ISetCompetitionGoals {
  type: ECompetitionActions.SET_COMPETITION_GOALS;
  payload: { activeCompetitions: TGoal[]; pastCompetitions: TGoal[] };
}

export interface IGetCompetition {
  type: ECompetitionActions.GET_GOAL;
  payload: TCompetition;
}

export interface IAddCompetition {
  type: ECompetitionActions.ADD_GOAL;
  payload: TCompetition;
}

export interface IAdminUpdateCompetition {
  type: ECompetitionActions.UPDATE_GOAL;
  payload: TCompetition;
}

export interface IAdminDeleteCompetition {
  type: ECompetitionActions.DELETE_GOAL;
  payload: string;
}

export interface IClearCurrentCompetition {
  type: ECompetitionActions.CLEAR_CURRENT_GOAL;
}

export type CompetitionDispatchTypes =
  | ISetCompetitionGoals
  | IGetCompetition
  | IAddCompetition
  | IAdminUpdateCompetition
  | IAdminDeleteCompetition
  | IClearCurrentCompetition;
