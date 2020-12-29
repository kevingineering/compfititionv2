import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { RequestDispatchTypes, EFriendRequestActions } from './types';
import { Dispatch } from 'react';
import { EFriendActions } from '../friendship/types';
import {
  NO_BUTTON,
  ADD_FRIEND_REQUEST_BUTTON,
  DELETE_FRIEND_REQUEST_BUTTON,
  ACCEPT_FRIEND_REQUEST_BUTTON,
  REJECT_FRIEND_REQUEST_BUTTON,
} from '../buttonTypes';
import { SetAlert } from '../alert/actions';

export const GetFriendRequestUserInfo = () => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_LOADING,
      payload: { type: NO_BUTTON },
    });
    const res = await axios.get('/api/friendrequest');
    dispatch({
      type: EFriendRequestActions.GET_USER_FRIEND_REQUEST_INFO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: EFriendRequestActions.FRIEND_REQUEST_ERROR });
  }
};

export const AddFriendRequest = (userId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_LOADING,
      payload: { type: ADD_FRIEND_REQUEST_BUTTON, userId: userId },
    });
    await axios.post('/api/friendrequest/' + userId);
    dispatch({
      type: EFriendRequestActions.ADD_FRIEND_REQUEST,
      payload: userId,
    });
    dispatch(SetAlert('Request sent'));
  } catch (error) {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_ERROR,
      payload: ADD_FRIEND_REQUEST_BUTTON + userId,
    });
  }
};

export const DeleteFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_LOADING,
      payload: { type: DELETE_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    await axios.delete('/api/friendrequest/' + friendId);
    dispatch({
      type: EFriendRequestActions.DELETE_FRIEND_REQUEST,
      payload: friendId,
    });
    dispatch(SetAlert('Request deleted'));
  } catch (error) {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_ERROR,
      payload: DELETE_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

//putting here instead of in friendship reducer to more easily handle button
export const AcceptFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_LOADING,
      payload: { type: ACCEPT_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    const res = await axios.post('/api/friendship/' + friendId);
    dispatch({
      type: EFriendRequestActions.ACCEPT_FRIEND_REQUEST,
      payload: friendId,
    });
    dispatch({ type: EFriendActions.ADD_FRIEND, payload: res.data });
    dispatch(SetAlert('Added friend'));
  } catch (error) {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_ERROR,
      payload: ACCEPT_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

export const RejectFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_LOADING,
      payload: { type: REJECT_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    await axios.delete('/api/friendrequest/' + friendId);
    dispatch({
      type: EFriendRequestActions.REJECT_FRIEND_REQUEST,
      payload: friendId,
    });
    dispatch(SetAlert('Request rejected'));
  } catch (error) {
    dispatch({
      type: EFriendRequestActions.FRIEND_REQUEST_ERROR,
      payload: REJECT_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

export const FilterSearchableUsers = (text: string) => async (
  dispatch: Dispatch<RequestDispatchTypes>
) => {
  dispatch({
    type: EFriendRequestActions.FILTER_SEARCHABLE_USERS,
    payload: text,
  });
};

export const ClearFilteredSearchableUsers = () => async (
  dispatch: Dispatch<RequestDispatchTypes>
) => {
  dispatch({ type: EFriendRequestActions.CLEAR_FILTERED_SEARCHABLE_USERS });
};
