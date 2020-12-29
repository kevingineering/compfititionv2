import { IAddFriend } from '../friendship/types';
import { FriendRequestButtonTypes } from '../buttonTypes';
import { TFriendRequestInfoResponse } from '../Models';
import { TDifferentUser } from '../../types';

export enum EFriendRequestActions {
  FRIEND_REQUEST_LOADING = 'FRIEND_REQUEST_LOADING',
  GET_USER_FRIEND_REQUEST_INFO = 'GET_USER_FRIEND_REQUEST_INFO',
  SET_USERS_WHO_SENT_FRIEND_REQUESTS = 'SET_USERS_WHO_SENT_FRIEND_REQUESTS',
  ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST',
  ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST',
  REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST',
  DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST',
  FRIEND_REQUEST_ERROR = 'FRIEND_REQUEST_ERROR',
  FILTER_SEARCHABLE_USERS = 'FILTER_SEARCHABLE_USERS',
  CLEAR_FILTERED_SEARCHABLE_USERS = 'CLEAR_FILTERED_SEARCHABLE_USERS',
}

export interface IFriendRequestLoading {
  type: EFriendRequestActions.FRIEND_REQUEST_LOADING;
  payload: {
    type: FriendRequestButtonTypes;
    userId?: string;
  };
}

export interface ISetUsersWhoSentFriendRequests {
  type: EFriendRequestActions.SET_USERS_WHO_SENT_FRIEND_REQUESTS;
  payload: TDifferentUser[];
}

export interface IGetFriendRequestUserInfo {
  type: EFriendRequestActions.GET_USER_FRIEND_REQUEST_INFO;
  payload: TFriendRequestInfoResponse;
}

export interface IAddFriendRequest {
  type: EFriendRequestActions.ADD_FRIEND_REQUEST;
  payload: string;
}

export interface IDeleteFriendRequest {
  type: EFriendRequestActions.DELETE_FRIEND_REQUEST;
  payload: string;
}

export interface IFriendRequestError {
  type: EFriendRequestActions.FRIEND_REQUEST_ERROR;
  payload?: string;
}

export interface IAcceptFriendRequest {
  type: EFriendRequestActions.ACCEPT_FRIEND_REQUEST;
  payload: string;
}

export interface IRejectFriendRequest {
  type: EFriendRequestActions.REJECT_FRIEND_REQUEST;
  payload: string;
}

export interface IFilterSearchableUsers {
  type: EFriendRequestActions.FILTER_SEARCHABLE_USERS;
  payload: string;
}

export interface IClearFilteredSearchableUsers {
  type: EFriendRequestActions.CLEAR_FILTERED_SEARCHABLE_USERS;
}

export type RequestDispatchTypes =
  | IFriendRequestLoading
  | IGetFriendRequestUserInfo
  | ISetUsersWhoSentFriendRequests
  | IAddFriendRequest
  | IDeleteFriendRequest
  | IAcceptFriendRequest
  | IAddFriend
  | IRejectFriendRequest
  | IFriendRequestError
  | IFilterSearchableUsers
  | IClearFilteredSearchableUsers;
