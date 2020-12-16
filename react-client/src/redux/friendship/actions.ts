import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import {
  FriendDispatchTypes,
  FRIEND_LOADING,
  FRIEND_ERROR,
  GET_FRIENDS,
  GET_OTHER_USER,
  DELETE_FRIEND,
  FILTER_FRIENDS,
  CLEAR_FILTERED_FRIENDS,
  FRIEND_FILTER_FRIENDS,
  CLEAR_FRIEND,
  SET_FRIEND_CURRENT_GOAL,
} from './types';
import { Dispatch } from 'react';
import { NO_BUTTON, DELETE_FRIEND_BUTTON } from '../buttonTypes';
import { SetAlert } from '../alert/actions';

export const GetFriends = () => async (
  dispatch: ThunkDispatch<{}, {}, FriendDispatchTypes>
) => {
  try {
    dispatch({ type: FRIEND_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/friendship');
    dispatch({ type: GET_FRIENDS, payload: res.data });
  } catch (error) {
    dispatch({ type: FRIEND_ERROR });
  }
};

export const GetOtherUserInfo = (userId: string) => async (
  dispatch: ThunkDispatch<{}, {}, FriendDispatchTypes>
) => {
  try {
    dispatch({ type: FRIEND_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/friendship/' + userId);
    dispatch({ type: GET_OTHER_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: FRIEND_ERROR });
  }
};

export const DeleteFriend = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, FriendDispatchTypes>
) => {
  try {
    dispatch({ type: FRIEND_LOADING, payload: DELETE_FRIEND_BUTTON });
    await axios.delete('/api/friendship/' + friendId);
    dispatch({ type: DELETE_FRIEND });
    dispatch(SetAlert('Friendship deleted', true));
  } catch (error) {
    dispatch({ type: FRIEND_ERROR });
  }
};

export const FilterFriends = (text: string) => async (
  dispatch: Dispatch<FriendDispatchTypes>
) => {
  dispatch({ type: FILTER_FRIENDS, payload: text });
};

export const FriendFilterFriends = (text: string) => async (
  dispatch: Dispatch<FriendDispatchTypes>
) => {
  dispatch({ type: FRIEND_FILTER_FRIENDS, payload: text });
};

export const ClearFilteredFriends = () => async (
  dispatch: Dispatch<FriendDispatchTypes>
) => {
  dispatch({ type: CLEAR_FILTERED_FRIENDS });
};

export const ClearFriend = () => async (
  dispatch: Dispatch<FriendDispatchTypes>
) => {
  dispatch({ type: CLEAR_FRIEND });
};

export const SetFriendSelectedGoal = (goalId: string) => (
  dispatch: Dispatch<FriendDispatchTypes>
) => {
  dispatch({ type: SET_FRIEND_CURRENT_GOAL, payload: goalId });
};
