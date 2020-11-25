import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import {
  RequestDispatchTypes,
  REQUEST_LOADING,
  GET_REQUESTS_AND_SEARCHABLE_USERS,
  REQUEST_ERROR,
  ADD_REQUEST,
  ACCEPT_REQUEST,
  DELETE_REQUEST,
  REJECT_REQUEST,
  FILTER_SEARCHABLE_USERS,
  CLEAR_FILTERED_SEARCHABLE_USERS,
} from './types';
import { Dispatch } from 'react';
import { ADD_FRIEND } from '../friend/types';
import {
  NO_BUTTON,
  ADD_REQUEST_BUTTON,
  DELETE_REQUEST_BUTTON,
  ACCEPT_REQUEST_BUTTON,
  REJECT_REQUEST_BUTTON,
} from '../buttonTypes';
import { SetAlert } from '../alert/actions';

export const GetRequestsAndSearchableUsers = () => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({ type: REQUEST_LOADING, payload: { type: NO_BUTTON } });
    const res = await axios.get('/api/userfriendrequest');
    dispatch({
      type: GET_REQUESTS_AND_SEARCHABLE_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: REQUEST_ERROR });
  }
};

export const AddRequest = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: REQUEST_LOADING,
      payload: { type: ADD_REQUEST_BUTTON, id },
    });
    const res = await axios.post('/api/userfriendrequest/' + id);
    dispatch({ type: ADD_REQUEST, payload: res.data });
    dispatch(SetAlert('Request sent'));
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: ADD_REQUEST_BUTTON + id });
  }
};

export const DeleteRequest = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: REQUEST_LOADING,
      payload: { type: DELETE_REQUEST_BUTTON, id },
    });
    await axios.delete('/api/userfriendrequest/' + id);
    dispatch({ type: DELETE_REQUEST, payload: id });
    dispatch(SetAlert('Request deleted'));
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: DELETE_REQUEST_BUTTON + id });
  }
};

export const AcceptRequest = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: REQUEST_LOADING,
      payload: { type: ACCEPT_REQUEST_BUTTON, id },
    });
    const res = await axios.post('/api/userfriend/' + id);
    dispatch({ type: ACCEPT_REQUEST, payload: id });
    dispatch({ type: ADD_FRIEND, payload: res.data });
    dispatch(SetAlert('Added friend'));
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: ACCEPT_REQUEST_BUTTON + id });
  }
};

export const RejectRequest = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, RequestDispatchTypes>
) => {
  try {
    dispatch({
      type: REQUEST_LOADING,
      payload: { type: REJECT_REQUEST_BUTTON, id },
    });
    await axios.delete('/api/userfriendrequest/' + id);
    dispatch({ type: REJECT_REQUEST, payload: id });
    dispatch(SetAlert('Request rejected'));
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: REJECT_REQUEST_BUTTON + id });
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
