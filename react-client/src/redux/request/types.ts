import { IAddFriend } from '../friend/types';
import { RequestButtonTypes } from '../buttonTypes';
import { TDifferentUser } from '../../types';

export const REQUEST_LOADING = 'REQUEST_LOADING';
export const GET_REQUESTS_AND_SEARCHABLE_USERS =
  'GET_REQUESTS_AND_SEARCHABLE_USERS';
export const ADD_REQUEST = 'ADD_REQUEST';
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const REJECT_REQUEST = 'REJECT_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
// export const CLEAR_REQUESTS = 'CLEAR_REQUESTS';
// //export const CLEAR_REQUESTS_ERROR = 'CLEAR_REQUESTS_ERROR'
export const FILTER_SEARCHABLE_USERS = 'FILTER_SEARCHABLE_USERS';
export const CLEAR_FILTERED_SEARCHABLE_USERS =
  'CLEAR_FILTERED_SEARCHABLE_USERS';

export interface IRequestLoading {
  type: typeof REQUEST_LOADING;
  payload: {
    type: RequestButtonTypes;
    id?: string;
  };
}

export interface IGetRequestsAndSearchableUsers {
  type: typeof GET_REQUESTS_AND_SEARCHABLE_USERS;
  payload: {
    sentRequestUsers: TDifferentUser[];
    receivedRequestUsers: TDifferentUser[];
    searchableUsers: TDifferentUser[];
  };
}

export interface IAddRequest {
  type: typeof ADD_REQUEST;
  payload: TDifferentUser;
}

export interface IDeleteRequest {
  type: typeof DELETE_REQUEST;
  payload: string;
}

export interface IRequestError {
  type: typeof REQUEST_ERROR;
  payload?: string;
}

export interface IAcceptRequest {
  type: typeof ACCEPT_REQUEST;
  payload: string;
}

export interface IRejectRequest {
  type: typeof REJECT_REQUEST;
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
  | IRequestLoading
  | IGetRequestsAndSearchableUsers
  | IAddRequest
  | IDeleteRequest
  | IAcceptRequest
  | IAddFriend
  | IRejectRequest
  | IRequestError
  | IFilterSearchableUsers
  | IClearFilteredSearchableUsers;
