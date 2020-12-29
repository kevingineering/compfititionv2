import { FriendButtonTypes } from '../buttonTypes';
import { TDifferentUser, TDifferentUserInfo } from '../../types';

export enum EFriendActions {
  FRIEND_LOADING = 'FRIEND_LOADING',
  SET_FRIENDS = 'SET_FRIENDS',
  GET_FRIENDS = 'GET_FRIENDS',
  GET_DIFFERENT_USER_INFO = 'GET_DIFFERENT_USER_INFO',
  ADD_FRIEND = 'ADD_FRIEND',
  DELETE_FRIEND = 'DELETE_FRIEND',
  FRIEND_ERROR = 'FRIEND_ERROR',
  FILTER_FRIENDS = 'FILTER_FRIENDS',
  FRIEND_FILTER_FRIENDS = 'FRIEND_FILTER_FRIENDS',
  CLEAR_FILTERED_FRIENDS = 'CLEAR_FILTERED_FRIENDS',
  CLEAR_FRIEND = 'CLEAR_FRIEND',
  SET_FRIEND_CURRENT_GOAL = 'SET_FRIEND_CURRENT_GOAL',
}

export interface IFriendLoading {
  type: EFriendActions.FRIEND_LOADING;
  payload: FriendButtonTypes;
}

export interface ISetFriends {
  type: EFriendActions.SET_FRIENDS;
  payload: TDifferentUser[];
}

export interface IGetFriends {
  type: EFriendActions.GET_FRIENDS;
  payload: TDifferentUser[];
}

export interface IGetDifferentUserInfo {
  type: EFriendActions.GET_DIFFERENT_USER_INFO;
  payload: TDifferentUserInfo;
}

export interface IAddFriend {
  type: EFriendActions.ADD_FRIEND;
  payload: TDifferentUser;
}

export interface IDeleteFriend {
  type: EFriendActions.DELETE_FRIEND;
}

export interface IFriendError {
  type: EFriendActions.FRIEND_ERROR;
}

export interface IFilterFriends {
  type: EFriendActions.FILTER_FRIENDS;
  payload: string;
}

export interface IFriendFilterFriends {
  type: EFriendActions.FRIEND_FILTER_FRIENDS;
  payload: string;
}

export interface IClearFilteredFriends {
  type: EFriendActions.CLEAR_FILTERED_FRIENDS;
}

export interface IClearFriend {
  type: EFriendActions.CLEAR_FRIEND;
}

export interface ISetFriendSelectedGoal {
  type: EFriendActions.SET_FRIEND_CURRENT_GOAL;
  payload: string;
}

export type FriendDispatchTypes =
  | IFriendLoading
  | ISetFriends
  | IGetFriends
  | IGetDifferentUserInfo
  | IAddFriend
  | IDeleteFriend
  | IFriendError
  | IFilterFriends
  | IFriendFilterFriends
  | IClearFilteredFriends
  | IClearFriend
  | ISetFriendSelectedGoal;
