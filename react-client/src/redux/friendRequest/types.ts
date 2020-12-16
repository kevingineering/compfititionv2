import { IAddFriend } from '../friendship/types';
import { FriendRequestButtonTypes } from '../buttonTypes';
import {
  TUsersWhoSentFriendRequestResponse,
  TFriendRequestUserInfoResponse,
} from '../Models';

export const FRIEND_REQUEST_LOADING = 'FRIEND_REQUEST_LOADING';
export const GET_FRIEND_REQUEST_USER_INFO = 'GET_FRIEND_REQUEST_USER_INFO';
export const GET_USERS_WHO_SENT_FRIEND_REQUESTS =
  'GET_USERS_WHO_SENT_FRIEND_REQUESTS';
export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST';
export const DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST';
export const FRIEND_REQUEST_ERROR = 'FRIEND_REQUEST_ERROR';
// export const CLEAR_REQUESTS = 'CLEAR_REQUESTS';
// //export const CLEAR_REQUESTS_ERROR = 'CLEAR_REQUESTS_ERROR'
export const FILTER_SEARCHABLE_USERS = 'FILTER_SEARCHABLE_USERS';
export const CLEAR_FILTERED_SEARCHABLE_USERS =
  'CLEAR_FILTERED_SEARCHABLE_USERS';

export interface IFriendRequestLoading {
  type: typeof FRIEND_REQUEST_LOADING;
  payload: {
    type: FriendRequestButtonTypes;
    userId?: string;
  };
}

export interface IGetFriendRequestUserInfo {
  type: typeof GET_FRIEND_REQUEST_USER_INFO;
  payload: TFriendRequestUserInfoResponse;
}

export interface IGetUsersWhoSentFriendRequests {
  type: typeof GET_USERS_WHO_SENT_FRIEND_REQUESTS;
  payload: TUsersWhoSentFriendRequestResponse;
}

export interface IAddFriendRequest {
  type: typeof ADD_FRIEND_REQUEST;
  payload: string;
}

export interface IDeleteFriendRequest {
  type: typeof DELETE_FRIEND_REQUEST;
  payload: string;
}

export interface IFriendRequestError {
  type: typeof FRIEND_REQUEST_ERROR;
  payload?: string;
}

export interface IAcceptFriendRequest {
  type: typeof ACCEPT_FRIEND_REQUEST;
  payload: string;
}

export interface IRejectFriendRequest {
  type: typeof REJECT_FRIEND_REQUEST;
  payload: string;
}

export interface IFilterSearchableUsers {
  type: typeof FILTER_SEARCHABLE_USERS;
  payload: string;
}

export interface IClearFilteredSearchableUsers {
  type: typeof CLEAR_FILTERED_SEARCHABLE_USERS;
}

export type RequestDispatchTypes =
  | IFriendRequestLoading
  | IGetFriendRequestUserInfo
  | IGetUsersWhoSentFriendRequests
  | IAddFriendRequest
  | IDeleteFriendRequest
  | IAcceptFriendRequest
  | IAddFriend
  | IRejectFriendRequest
  | IFriendRequestError
  | IFilterSearchableUsers
  | IClearFilteredSearchableUsers;
