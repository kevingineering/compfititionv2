import { CompetitionButtonTypes } from '../buttonTypes';
import { TGoal, TCompetition, TParticipant } from '../../types';

export const COMPETITION_LOADING = 'COMPETITION_LOADING';
export const GET_COMPETITION_GOALS = 'GET_COMPETITION_GOALS';
export const GET_COMPETITION = 'GET_COMPETITION';
export const ADD_COMPETITION = 'ADD_COMPETITION';
export const UPDATE_PARTICIPANT_LEDGER = 'UPDATE_PARTICIPANT_LEDGER';
export const UPDATE_PARTICIPANT_TARGET = 'UPDATE_PARTICIPANT_TARGET';
export const UPDATE_PARTICIPANT_INITIAL_VALUE =
  'UPDATE_PARTICIPANT_INITIAL_VALUE';
export const UPDATE_COMPETITION = 'UPDATE_COMPETITION';
export const DELETE_COMPETITION = 'DELETE_COMPETITION';
export const COMPETITION_ERROR = 'COMPETITION_ERROR';
export const CLEAR_CURRENT_COMPETITION = 'CLEAR_CURRENT_COMPETITION';
export const REMOVE_ADMIN_FROM_COMPETITION = 'REMOVE_ADMIN_FROM_COMPETITION';

export interface ICompetitionLoading {
  type: typeof COMPETITION_LOADING;
  payload: CompetitionButtonTypes;
}

export interface IGetCompetitionGoals {
  type: typeof GET_COMPETITION_GOALS;
  payload: TGoal[];
}

export interface IGetCompetition {
  type: typeof GET_COMPETITION;
  payload: TCompetition;
}

export interface IAddCompetition {
  type: typeof ADD_COMPETITION;
  payload: TCompetition;
}

export interface IUpdateParticipantLedger {
  type: typeof UPDATE_PARTICIPANT_LEDGER;
  payload: TParticipant;
}

export interface IUpdateParticipantTarget {
  type: typeof UPDATE_PARTICIPANT_TARGET;
  payload: TParticipant;
}

export interface IUpdateParticipantInitialValue {
  type: typeof UPDATE_PARTICIPANT_INITIAL_VALUE;
  payload: TParticipant;
}

export interface IUpdateCompetition {
  type: typeof UPDATE_COMPETITION;
  payload: TCompetition;
}

export interface IDeleteCompetition {
  type: typeof DELETE_COMPETITION;
  payload: string;
}

export interface ICompetitionError {
  type: typeof COMPETITION_ERROR;
}

export interface IClearCurrentCompetition {
  type: typeof CLEAR_CURRENT_COMPETITION;
}

export interface IRemoveAdminFromCompetition {
  type: typeof REMOVE_ADMIN_FROM_COMPETITION;
  payload: string;
}

export type CompetitionDispatchTypes =
  | ICompetitionLoading
  | IGetCompetitionGoals
  | IGetCompetition
  | IAddCompetition
  | IUpdateParticipantLedger
  | IUpdateParticipantTarget
  | IUpdateParticipantInitialValue
  | IUpdateCompetition
  | IDeleteCompetition
  | ICompetitionError
  | IClearCurrentCompetition
  | IRemoveAdminFromCompetition;

export const ADD_USER_TO_COMPETITION = 'ADD_USER_TO_COMPETITION';
export const REMOVE_USER_FROM_COMPETITION = 'REMOVE_USER_FROM_COMPETITION';
export const KICK_USER_FROM_COMPETITION = 'KICK_USER_FROM_COMPETITION';
export const ADD_ADMIN_TO_COMPETITION = 'ADD_ADMIN_TO_COMPETITION';
