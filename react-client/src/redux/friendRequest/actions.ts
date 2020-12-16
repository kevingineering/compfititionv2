import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import {
  RequestDispatchTypes,
  FRIEND_REQUEST_LOADING,
  GET_FRIEND_REQUEST_USER_INFO,
  GET_USERS_WHO_SENT_FRIEND_REQUESTS,
  FRIEND_REQUEST_ERROR,
  ADD_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  FILTER_SEARCHABLE_USERS,
  CLEAR_FILTERED_SEARCHABLE_USERS,
} from './types';
import { Dispatch } from 'react';
import { ADD_FRIEND } from '../friendship/types';
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
    dispatch({ type: FRIEND_REQUEST_LOADING, payload: { type: NO_BUTTON } });
    const res = await axios.get('/api/friendrequest');
    dispatch({
      type: GET_FRIEND_REQUEST_USER_INFO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FRIEND_REQUEST_ERROR });
  }
};

export const GetUsersWhoSentFriendRequests = () => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({ type: FRIEND_REQUEST_LOADING, payload: { type: NO_BUTTON } });
    const res = await axios.get('/api/friendrequest/received');
    dispatch({
      type: GET_USERS_WHO_SENT_FRIEND_REQUESTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FRIEND_REQUEST_ERROR });
  }
};

export const AddFriendRequest = (userId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: FRIEND_REQUEST_LOADING,
      payload: { type: ADD_FRIEND_REQUEST_BUTTON, userId: userId },
    });
    await axios.post('/api/friendrequest/' + userId);
    dispatch({ type: ADD_FRIEND_REQUEST, payload: userId });
    dispatch(SetAlert('Request sent'));
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: ADD_FRIEND_REQUEST_BUTTON + userId,
    });
  }
};

export const DeleteFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: FRIEND_REQUEST_LOADING,
      payload: { type: DELETE_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    await axios.delete('/api/friendrequest/' + friendId);
    dispatch({ type: DELETE_FRIEND_REQUEST, payload: friendId });
    dispatch(SetAlert('Request deleted'));
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: DELETE_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

export const AcceptFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: FRIEND_REQUEST_LOADING,
      payload: { type: ACCEPT_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    const res = await axios.post('/api/friendship/' + friendId);
    dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: friendId });
    dispatch({ type: ADD_FRIEND, payload: res.data });
    dispatch(SetAlert('Added friend'));
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: ACCEPT_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

export const RejectFriendRequest = (friendId: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: FRIEND_REQUEST_LOADING,
      payload: { type: REJECT_FRIEND_REQUEST_BUTTON, userId: friendId },
    });
    await axios.delete('/api/friendrequest/' + friendId);
    dispatch({ type: REJECT_FRIEND_REQUEST, payload: friendId });
    dispatch(SetAlert('Request rejected'));
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: REJECT_FRIEND_REQUEST_BUTTON + friendId,
    });
  }
};

export const FilterSearchableUsers = (text: string) => async (
  dispatch: Dispatch<RequestDispatchTypes>
) => {
  dispatch({ type: FILTER_SEARCHABLE_USERS, payload: text });
};

export const ClearFilteredSearchableUsers = () => async (
  dispatch: Dispatch<RequestDispatchTypes>
) => {
  dispatch({ type: CLEAR_FILTERED_SEARCHABLE_USERS });
};
