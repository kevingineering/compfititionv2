export enum EAdminRequestActions {
  ADMIN_ADD_ADMIN_REQUEST = 'ADMIN_ADD_ADMIN_REQUEST',
  REJECT_ADMIN_REQUEST = 'REJECT_ADMIN_REQUEST',
}

export interface IAdminAddAdminRequest {
  type: EAdminRequestActions.ADMIN_ADD_ADMIN_REQUEST;
  payload: string;
}

export interface IRejectAdminRequest {
  type: EAdminRequestActions.REJECT_ADMIN_REQUEST;
  payload: string;
}

export type AdminRequestDispatchTypes =
  | IAdminAddAdminRequest
  | IRejectAdminRequest;
