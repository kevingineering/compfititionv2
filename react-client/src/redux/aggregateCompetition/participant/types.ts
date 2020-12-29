import { TParticipant } from '../../../types';

export enum EParticipantActions {
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  ADMIN_ACCEPT_PARTICIPATION_REQUEST = 'ADMIN_ACCEPT_PARTICIPATION_REQUEST',
  UPDATE_PARTICIPANT_LEDGER = 'UPDATE_PARTICIPANT_LEDGER',
  UPDATE_PARTICIPANT_TARGET = 'UPDATE_PARTICIPANT_TARGET',
  UPDATE_PARTICIPANT_INITIAL_VALUE = 'UPDATE_PARTICIPANT_INITIAL_VALUE',
  REMOVE_SELF_FROM_COMPETITION = 'REMOVE_SELF_FROM_COMPETITION',
  ADMIN_KICK_USER_FROM_COMPETITION = 'ADMIN_KICK_USER_FROM_COMPETITION',
}

export interface IAcceptInvitation {
  type: EParticipantActions.ACCEPT_INVITATION;
  payload: TParticipant;
}

export interface IAdminAcceptParticipationRequest {
  type: EParticipantActions.ADMIN_ACCEPT_PARTICIPATION_REQUEST;
  payload: TParticipant;
}

export interface IUpdateParticipantLedger {
  type: EParticipantActions.UPDATE_PARTICIPANT_LEDGER;
  payload: TParticipant;
}

export interface IUpdateParticipantTarget {
  type: EParticipantActions.UPDATE_PARTICIPANT_TARGET;
  payload: TParticipant;
}

export interface IUpdateParticipantInitialValue {
  type: EParticipantActions.UPDATE_PARTICIPANT_INITIAL_VALUE;
  payload: TParticipant;
}

export interface IRemoveSelf {
  type: EParticipantActions.REMOVE_SELF_FROM_COMPETITION;
}

export interface IAdminKickUser {
  type: EParticipantActions.ADMIN_KICK_USER_FROM_COMPETITION;
  payload: string;
}

export type ParticipantDispatchTypes =
  | IAcceptInvitation
  | IAdminAcceptParticipationRequest
  | IUpdateParticipantLedger
  | IUpdateParticipantTarget
  | IUpdateParticipantInitialValue
  | IRemoveSelf
  | IAdminKickUser;
