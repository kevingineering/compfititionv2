import { UserButtonTypes } from '../buttonTypes';
import { TUser } from '../../types';
import { ISetGoals } from '../goal/types';
import { ISetFriends } from '../friendship/types';
import { ISetCompetitionGoals } from '../aggregateCompetition/competition/types';
import { ISetUsersWhoSentFriendRequests } from '../friendRequest/types';

export enum EUserActions {
  USER_LOADING = 'USER_LOADING',
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  USER_ERROR = 'USER_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGOUT = 'LOGOUT',
  GET_USER = 'GET_USER',
  GET_USER_INFO = 'GET_USER_INFO',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_IS_MODIFIED = 'RESET_IS_MODIFIED',
}

export interface IUserLoading {
  type: EUserActions.USER_LOADING;
  payload: UserButtonTypes;
}

export interface IRegisterUser {
  type: EUserActions.REGISTER_USER;
  payload: TUser;
}

export interface ILoginUser {
  type: EUserActions.LOGIN_USER;
  payload: TUser;
}

export interface IGetUser {
  type: EUserActions.GET_USER;
  payload: TUser;
}

export interface IGetUserInfo {
  type: EUserActions.GET_USER_INFO;
}

export interface IUpdateUser {
  type: EUserActions.UPDATE_USER;
  payload: TUser;
}

export interface IChangePassword {
  type: EUserActions.CHANGE_PASSWORD;
}

export interface IDeleteUser {
  type: EUserActions.DELETE_USER;
}

export interface ILogout {
  type: EUserActions.LOGOUT;
}

export interface IResetIsModified {
  type: EUserActions.RESET_IS_MODIFIED;
}

export interface IUserError {
  type: EUserActions.USER_ERROR;
}

export interface IAuthError {
  type: EUserActions.AUTH_ERROR;
}

export type UserDispatchTypes =
  | IUserLoading
  | ILoginUser
  | IRegisterUser
  | IUserError
  | IAuthError
  | ILogout
  | IGetUser
  | IGetUserInfo
  | IUpdateUser
  | IDeleteUser
  | IChangePassword
  | IResetIsModified
  | ISetGoals
  | ISetFriends
  | ISetCompetitionGoals
  | ISetUsersWhoSentFriendRequests;
