import { FriendButtonTypes } from '../buttonTypes';
import { TDifferentUser, TOtherUser } from '../../types';

export const FRIEND_LOADING = 'FRIEND_LOADING';
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_OTHER_USER = 'GET_OTHER_USER';
export const ADD_FRIEND = 'ADD_FRIEND';
export const DELETE_FRIEND = 'DELETE_FRIEND';
export const FRIEND_ERROR = 'FRIEND_ERROR';
export const FILTER_FRIENDS = 'FILTER_FRIENDS';
export const FRIEND_FILTER_FRIENDS = 'FRIEND_FILTER_FRIENDS';
export const CLEAR_FILTERED_FRIENDS = 'CLEAR_FILTERED_FRIENDS';
export const CLEAR_FRIEND = 'CLEAR_FRIEND';
export const SET_FRIEND_CURRENT_GOAL = 'SET_FRIEND_CURRENT_GOAL';

export interface IFriendLoading {
  type: typeof FRIEND_LOADING;
  payload: FriendButtonTypes;
}

export interface IGetFriends {
  type: typeof GET_FRIENDS;
  payload: TDifferentUser[];
}

export interface IGetFriend {
  type: typeof GET_OTHER_USER;
  payload: TOtherUser;
}

export interface IAddFriend {
  type: typeof ADD_FRIEND;
  payload: TDifferentUser;
}

export interface IDeleteFriend {
  type: typeof DELETE_FRIEND;
}

export interface IFriendError {
  type: typeof FRIEND_ERROR;
}

export interface IFilterFriends {
  type: typeof FILTER_FRIENDS;
  payload: string;
}

export interface IFriendFilterFriends {
  type: typeof FRIEND_FILTER_FRIENDS;
  payload: string;
}

export interface IClearFilteredFriends {
  type: typeof CLEAR_FILTERED_FRIENDS;
}

export interface IClearFriend {
  type: typeof CLEAR_FRIEND;
}

export interface ISetFriendSelectedGoal {
  type: typeof SET_FRIEND_CURRENT_GOAL;
  payload: string;
}

export type FriendDispatchTypes =
  | IFriendLoading
  | IGetFriends
  | IGetFriend
  | IAddFriend
  | IDeleteFriend
  | IFriendError
  | IFilterFriends
  | IFriendFilterFriends
  | IClearFilteredFriends
  | IClearFriend
  | ISetFriendSelectedGoal;
