import {
  UserDispatchTypes,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_IS_MODIFIED,
} from './types';

import setAuthToken from '../../util/setAuthToken';
import { NOT_LOADING } from '../buttonTypes';
import { TUser } from '../../types';

export interface IUserState {
  loadingButton: string;
  user?: TUser;
  isAuthenticated: boolean;
  isModified: boolean;
}

const userState: IUserState = {
  loadingButton: NOT_LOADING,
  isAuthenticated: false,
  isModified: false,
};

const userReducer = (
  state: IUserState = userState,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_USER_SUCCESS:
      localStorage.setItem('token', action.payload.token!);
      setAuthToken(action.payload.token!);
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: action.payload,
        isAuthenticated: true,
      };
    case UPDATE_USER_SUCCESS:
      localStorage.setItem('token', action.payload.token!);
      setAuthToken(action.payload.token!);
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: action.payload,
        isAuthenticated: true,
        isModified: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        isAuthenticated: true,
        isModified: true,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case GET_USER_FAIL:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: undefined,
        isAuthenticated: false,
      };
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case DELETE_USER_SUCCESS:
    case LOGOUT:
      //NOTE - these cases are also handled by RootReducer
      localStorage.removeItem('token');
      setAuthToken('');
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: undefined,
        isAuthenticated: false,
      };
    case RESET_IS_MODIFIED:
      return {
        ...state,
        isModified: false,
      };
    default:
      return state;
  }
};

export default userReducer;
