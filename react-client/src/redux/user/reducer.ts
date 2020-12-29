import { UserDispatchTypes, EUserActions } from './types';

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
    case EUserActions.USER_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case EUserActions.LOGIN_USER:
    case EUserActions.REGISTER_USER:
    case EUserActions.GET_USER:
      localStorage.setItem('token', action.payload.token!);
      setAuthToken(action.payload.token!);
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: action.payload,
        isAuthenticated: true,
      };
    case EUserActions.GET_USER_INFO:
      //handled in other reducers
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case EUserActions.UPDATE_USER:
      localStorage.setItem('token', action.payload.token!);
      setAuthToken(action.payload.token!);
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: action.payload,
        isAuthenticated: true,
        isModified: true,
      };
    case EUserActions.CHANGE_PASSWORD:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        isAuthenticated: true,
        isModified: true,
      };
    case EUserActions.AUTH_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: undefined,
        isAuthenticated: false,
      };
    case EUserActions.USER_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case EUserActions.DELETE_USER:
    case EUserActions.LOGOUT:
      //NOTE - these cases are also handled by RootReducer
      localStorage.removeItem('token');
      setAuthToken('');
      return {
        ...state,
        loadingButton: NOT_LOADING,
        user: undefined,
        isAuthenticated: false,
      };
    case EUserActions.RESET_IS_MODIFIED:
      return {
        ...state,
        isModified: false,
      };
    default:
      return state;
  }
};

export default userReducer;
