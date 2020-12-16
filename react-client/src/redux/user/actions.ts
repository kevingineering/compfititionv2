import {
  UserDispatchTypes,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_IS_MODIFIED,
} from './types';
import axios from 'axios';
import { SetAlert } from '../alert/actions';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { TLoginRequest, TRegisterRequest } from '../Models';
import {
  LOGIN_OR_REGISTER_BUTTON,
  UPDATE_USER_BUTTON,
  DELETE_USER_BUTTON,
  CHANGE_PASSWORD_BUTTON,
  NO_BUTTON,
} from '../buttonTypes';
import { TChangePasswordRequest } from '../Models';

//TODO - ThunkDispatch doesn't make any sense to me - it fixes my TypeScript issues, but I don't really know how
export const RegisterUser = (user: TRegisterRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: USER_LOADING, payload: LOGIN_OR_REGISTER_BUTTON });
    const res = await axios.post('/api/user/register', user);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
  }
};

export const LoginUser = (user: TLoginRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: USER_LOADING, payload: LOGIN_OR_REGISTER_BUTTON });
    const res = await axios.post('/api/user/login', user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const LogoutUser = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ type: LOGOUT });
};

export const GetUser = () => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: USER_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/user');
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    localStorage.removeItem('token');
    dispatch({ type: GET_USER_FAIL });
  }
};

export const UpdateUser = (user: {
  name: string;
  email: string;
  password: string;
  isSearchable: boolean;
}) => async (dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>) => {
  try {
    dispatch({ type: USER_LOADING, payload: UPDATE_USER_BUTTON });
    const res = await axios.patch('/api/user', user);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(SetAlert('User updated', true));
    dispatch({ type: RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
    });
  }
};

export const ChangePassword = (request: TChangePasswordRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: USER_LOADING, payload: CHANGE_PASSWORD_BUTTON });
    await axios.patch('/api/user/changePassword', request);
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
    });
    dispatch(SetAlert('Password changed', true));
    dispatch({ type: RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
    });
  }
};

export const DeleteUser = (password: string) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: USER_LOADING, payload: DELETE_USER_BUTTON });
    //can't get Content-Type header or body on delete request, so using post
    await axios.post('/api/user/delete', { password });
    dispatch({
      type: DELETE_USER_SUCCESS,
    });
    dispatch(SetAlert('User deleted', true));
    dispatch({ type: RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL });
  }
};
