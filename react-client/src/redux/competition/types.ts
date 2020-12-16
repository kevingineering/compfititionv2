import { CompetitionButtonTypes } from '../buttonTypes';
import { TGoal, TCompetition, TParticipant } from '../../types';

//#region general competition
export const COMPETITION_LOADING = 'COMPETITION_LOADING';
export const COMPETITION_ERROR = 'COMPETITION_ERROR';
export const CLEAR_CURRENT_COMPETITION = 'CLEAR_CURRENT_COMPETITION';
export const GET_COMPETITION_GOALS = 'GET_COMPETITION_GOALS';
export const GET_COMPETITION = 'GET_COMPETITION';
export const ADD_COMPETITION = 'ADD_COMPETITION';
export const ADMIN_UPDATE_COMPETITION = 'ADMIN_UPDATE_COMPETITION';
export const ADMIN_DELETE_COMPETITION = 'ADMIN_DELETE_COMPETITION';

export interface ICompetitionLoading {
  type: typeof COMPETITION_LOADING;
  payload: {
    type: CompetitionButtonTypes;
    userId?: string;
  };
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

export interface IAdminUpdateCompetition {
  type: typeof ADMIN_UPDATE_COMPETITION;
  payload: TCompetition;
}

export interface IAdminDeleteCompetition {
  type: typeof ADMIN_DELETE_COMPETITION;
  payload: string;
}

export interface ICompetitionError {
  type: typeof COMPETITION_ERROR;
  payload?: string;
}

export interface IClearCurrentCompetition {
  type: typeof CLEAR_CURRENT_COMPETITION;
}
//#endregion

//#region participant
export const ACCEPT_INVITE = 'ACCEPT_INVITE';
export const ADMIN_ACCEPT_PARTICIPANT_REQUEST =
  'ADMIN_ACCEPT_PARTICIPANT_REQUEST';
export const UPDATE_PARTICIPANT_LEDGER = 'UPDATE_PARTICIPANT_LEDGER';
export const UPDATE_PARTICIPANT_TARGET = 'UPDATE_PARTICIPANT_TARGET';
export const UPDATE_PARTICIPANT_INITIAL_VALUE =
  'UPDATE_PARTICIPANT_INITIAL_VALUE';
export const REMOVE_SELF_FROM_COMPETITION = 'REMOVE_SELF_FROM_COMPETITION';
export const ADMIN_KICK_USER_FROM_COMPETITION =
  'ADMIN_KICK_USER_FROM_COMPETITION';

export interface IAcceptInvite {
  type: typeof ACCEPT_INVITE;
  payload: TParticipant;
}

export interface IAdminAcceptParticipantRequest {
  type: typeof ADMIN_ACCEPT_PARTICIPANT_REQUEST;
  payload: TParticipant;
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

export interface IRemoveSelfFromCompetition {
  type: typeof REMOVE_SELF_FROM_COMPETITION;
}

export interface IAdminKickUserFromCompetition {
  type: typeof ADMIN_KICK_USER_FROM_COMPETITION;
  payload: string;
}

//#endregion

//#region participant request
export const ADD_PARTICIPANT_REQUEST = 'ADD_PARTICIPANT_REQUEST';
export const DELETE_PARTICIPANT_REQUEST = 'DELETE_PARTICIPANT_REQUEST';
export const ADMIN_REJECT_PARTICIPANT_REQUEST =
  'ADMIN_REJECT_PARTICIPANT_REQUEST';

export interface IAddParticipantRequest {
  type: typeof ADD_PARTICIPANT_REQUEST;
  payload: string;
}

export interface IDeleteParticipantRequest {
  type: typeof DELETE_PARTICIPANT_REQUEST;
  payload: string;
}

export interface IAdminRejectParticipantRequest {
  type: typeof ADMIN_REJECT_PARTICIPANT_REQUEST;
  payload: string;
}
//#endregion

//#region invite
export const ADMIN_ADD_INVITE = 'ADMIN_ADD_INVITE';
export const ADMIN_DELETE_INVITE = 'ADMIN_DELETE_INVITE';
export const REJECT_INVITE = 'REJECT_INVITE';

export interface IAdminAddInvite {
  type: typeof ADMIN_ADD_INVITE;
  payload: string;
}

export interface IAdminDeleteInvite {
  type: typeof ADMIN_DELETE_INVITE;
  payload: string;
}

export interface IRejectInvite {
  type: typeof REJECT_INVITE;
  payload: string;
}
//#endregion

//#region admin
export const ACCEPT_ADMIN_REQUEST = 'ACCEPT_ADMIN_REQUEST';
export const RELINQUISH_ADMIN = 'RELINQUISH_ADMIN';

export interface IAcceptAdminRequest {
  type: typeof ACCEPT_ADMIN_REQUEST;
  payload: TCompetition;
}

export interface IRelinquishAdmin {
  type: typeof RELINQUISH_ADMIN;
  payload: TCompetition;
}
//#endregion

//#region admin request
export const ADMIN_ADD_ADMIN_REQUEST = 'ADMIN_ADD_ADMIN_REQUEST';
export const REJECT_ADMIN_REQUEST = 'REJECT_ADMIN_REQUEST';

export interface IAdminAddAdminRequest {
  type: typeof ADMIN_ADD_ADMIN_REQUEST;
  payload: string;
}

export interface IRejectAdminRequest {
  type: typeof REJECT_ADMIN_REQUEST;
  payload: string;
}
//#endregion

export type CompetitionDispatchTypes =
  //general competition
  | ICompetitionLoading
  | IGetCompetitionGoals
  | IGetCompetition
  | IAddCompetition
  | IAdminUpdateCompetition
  | IAdminDeleteCompetition
  | ICompetitionError
  | IClearCurrentCompetition
  //participant
  | IAcceptInvite
  | IAdminAcceptParticipantRequest
  | IUpdateParticipantLedger
  | IUpdateParticipantTarget
  | IUpdateParticipantInitialValue
  | IRemoveSelfFromCompetition
  | IAdminKickUserFromCompetition
  //participant request
  | IAddParticipantRequest
  | IDeleteParticipantRequest
  | IAdminRejectParticipantRequest
  //invite
  | IAdminAddInvite
  | IAdminDeleteInvite
  | IRejectInvite
  //admin
  | IAcceptAdminRequest
  | IRelinquishAdmin
  //adminrequest
  | IAdminAddAdminRequest
  | IRejectAdminRequest;
