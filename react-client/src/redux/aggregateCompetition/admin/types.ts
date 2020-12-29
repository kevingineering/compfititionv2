import { TCompetition } from '../../../types';

export enum EAdminActions {
  ACCEPT_ADMIN_REQUEST = 'ACCEPT_ADMIN_REQUEST',
  RELINQUISH_ADMIN = 'RELINQUISH_ADMIN',
}

export interface IAcceptAdminRequest {
  type: EAdminActions.ACCEPT_ADMIN_REQUEST;
  payload: TCompetition;
}

export interface IRelinquishAdmin {
  type: EAdminActions.RELINQUISH_ADMIN;
  payload: TCompetition;
}

export type AdminDispatchTypes = IAcceptAdminRequest | IRelinquishAdmin;
