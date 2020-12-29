import { TCompetitionUser } from '../../../types';

export enum EParticipationRequestActions {
  ADD_PARTICIPATION_REQUEST = 'ADD_PARTICIPATION_REQUEST',
  DELETE_PARTICIPATION_REQUEST = 'DELETE_PARTICIPATION_REQUEST',
  ADMIN_REJECT_PARTICIPATION_REQUEST = 'ADMIN_REJECT_PARTICIPATION_REQUEST',
}

export interface IAddParticipationRequest {
  type: EParticipationRequestActions.ADD_PARTICIPATION_REQUEST;
  payload: TCompetitionUser;
}

export interface IDeleteParticipationRequest {
  type: EParticipationRequestActions.DELETE_PARTICIPATION_REQUEST;
  payload: string;
}

export interface IAdminRejectParticipationRequest {
  type: EParticipationRequestActions.ADMIN_REJECT_PARTICIPATION_REQUEST;
  payload: string;
}

export type ParticipationRequestDispatchTypes =
  | IAddParticipationRequest
  | IDeleteParticipationRequest
  | IAdminRejectParticipationRequest;
