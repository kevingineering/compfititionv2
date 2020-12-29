import { TCompetitionUser } from '../../../types';

export enum EInvitationActions {
  ADMIN_ADD_INVITATION = 'ADMIN_ADD_INVITATION',
  ADMIN_DELETE_INVITATION = 'ADMIN_DELETE_INVITATION',
  REJECT_INVITATION = 'REJECT_INVITATION',
}

export interface IAdminAddInvitation {
  type: EInvitationActions.ADMIN_ADD_INVITATION;
  payload: TCompetitionUser;
}

export interface IAdminDeleteInvitation {
  type: EInvitationActions.ADMIN_DELETE_INVITATION;
  payload: string;
}

export interface IRejectInvitation {
  type: EInvitationActions.REJECT_INVITATION;
  payload: string;
}

export type InvitationDispatchTypes =
  | IAdminAddInvitation
  | IAdminDeleteInvitation
  | IRejectInvitation;
