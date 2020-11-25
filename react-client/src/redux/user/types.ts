import { UserButtonTypes } from '../buttonTypes';
import { TUser } from '../../types';

export const USER_LOADING = 'USER_LOADING';
export const USER_REGISTER = 'USER_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOGIN = 'USER_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const RESET_IS_MODIFIED = 'RESET_IS_MODIFIED';

export interface IUserLoading {
  type: typeof USER_LOADING;
  payload: UserButtonTypes;
}

export interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: TUser;
}
export interface ILoginFail {
  type: typeof LOGIN_FAIL;
}

export interface IRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: TUser;
}

export interface IRegisterFail {
  type: typeof REGISTER_FAIL;
}

export interface ILogout {
  type: typeof LOGOUT;
}

export interface IGetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: TUser;
}

export interface IGetUserFail {
  type: typeof GET_USER_FAIL;
}

export interface IUpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
  payload: TUser;
}

export interface IUpdateUserFail {
  type: typeof UPDATE_USER_FAIL;
}

export interface IDeleteUserSuccess {
  type: typeof DELETE_USER_SUCCESS;
}

export interface IDeleteUserFail {
  type: typeof DELETE_USER_FAIL;
}

export interface IChangePasswordSuccess {
  type: typeof CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFail {
  type: typeof CHANGE_PASSWORD_FAIL;
}

export interface IResetIsModified {
  type: typeof RESET_IS_MODIFIED;
}

export type UserDispatchTypes =
  | IUserLoading
  | ILoginSuccess
  | ILoginFail
  | IRegisterSuccess
  | IRegisterFail
  | ILogout
  | IGetUserSuccess
  | IGetUserFail
  | IUpdateUserSuccess
  | IUpdateUserFail
  | IDeleteUserSuccess
  | IDeleteUserFail
  | IChangePasswordSuccess
  | IChangePasswordFail
  | IResetIsModified;

// export const USER_LOADED = 'USER_LOADED';
// export const AUTH_ERROR = 'AUTH_ERROR';

// export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
