import { UserDispatchTypes, EUserActions } from './types';
import axios from 'axios';
import { SetAlert } from '../alert/actions';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { TLoginRequest, TRegisterRequest, TUpdateUserRequest } from '../Models';
import {
  LOGIN_OR_REGISTER_BUTTON,
  UPDATE_USER_BUTTON,
  DELETE_USER_BUTTON,
  CHANGE_PASSWORD_BUTTON,
  NO_BUTTON,
} from '../buttonTypes';
import { TChangePasswordRequest } from '../Models';
import { TUserInfo } from '../../types';
import { EGoalActions } from '../goal/types';
import { ECompetitionActions } from '../aggregateCompetition/competition/types';
import { EFriendActions } from '../friendship/types';
import { EFriendRequestActions } from '../friendRequest/types';

//TODO - ThunkDispatch doesn't make any sense to me - it fixes my TypeScript issues, but I don't really know how
export const RegisterUser = (user: TRegisterRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({
      type: EUserActions.USER_LOADING,
      payload: LOGIN_OR_REGISTER_BUTTON,
    });
    const res = await axios.post('/api/user/register', user);
    dispatch({
      type: EUserActions.REGISTER_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: EUserActions.AUTH_ERROR });
  }
};

export const LoginUser = (user: TLoginRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({
      type: EUserActions.USER_LOADING,
      payload: LOGIN_OR_REGISTER_BUTTON,
    });
    const res = await axios.post('/api/user/login', user);
    dispatch({
      type: EUserActions.LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: EUserActions.AUTH_ERROR });
  }
};

export const LogoutUser = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ type: EUserActions.LOGOUT });
};

export const GetUser = () => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: EUserActions.USER_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/user');
    dispatch({
      type: EUserActions.GET_USER,
      payload: res.data,
    });
  } catch (error) {
    localStorage.removeItem('token');
    dispatch({ type: EUserActions.AUTH_ERROR });
  }
};

export const GetUserInfo = () => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: EUserActions.USER_LOADING, payload: NO_BUTTON });
    const resData: TUserInfo = (await axios.get('/api/user/info')).data;
    dispatch({
      type: EUserActions.GET_USER_INFO,
    });
    dispatch({
      type: EGoalActions.SET_GOALS,
      payload: {
        pastGoals: resData.pastGoals,
        activeGoals: resData.activeGoals,
      },
    });
    dispatch({
      type: ECompetitionActions.SET_COMPETITION_GOALS,
      payload: {
        pastCompetitions: resData.pastCompetitions,
        activeCompetitions: resData.activeCompetitions,
      },
    });
    dispatch({
      type: EFriendActions.SET_FRIENDS,
      payload: resData.friends,
    });
    dispatch({
      type: EFriendRequestActions.SET_USERS_WHO_SENT_FRIEND_REQUESTS,
      payload: resData.usersWhoSentFriendRequest,
    });
  } catch (error) {
    localStorage.removeItem('token');
    dispatch({ type: EUserActions.AUTH_ERROR });
  }
};

export const UpdateUser = (user: TUpdateUserRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: EUserActions.USER_LOADING, payload: UPDATE_USER_BUTTON });
    const res = await axios.patch('/api/user', user);
    dispatch({
      type: EUserActions.UPDATE_USER,
      payload: res.data,
    });
    dispatch(SetAlert('User updated', true));
    dispatch({ type: EUserActions.RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({
      type: EUserActions.USER_ERROR,
    });
  }
};

export const ChangePassword = (request: TChangePasswordRequest) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({
      type: EUserActions.USER_LOADING,
      payload: CHANGE_PASSWORD_BUTTON,
    });
    await axios.patch('/api/user/changePassword', request);
    dispatch({
      type: EUserActions.CHANGE_PASSWORD,
    });
    dispatch(SetAlert('Password changed', true));
    dispatch({ type: EUserActions.RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({
      type: EUserActions.USER_ERROR,
    });
  }
};

export const DeleteUser = (password: string) => async (
  dispatch: ThunkDispatch<{}, {}, UserDispatchTypes>
) => {
  try {
    dispatch({ type: EUserActions.USER_LOADING, payload: DELETE_USER_BUTTON });
    //can't get Content-Type header or body on delete request, so using post
    await axios.post('/api/user/delete', { password });
    dispatch({
      type: EUserActions.DELETE_USER,
    });
    dispatch(SetAlert('User deleted', true));
    dispatch({ type: EUserActions.RESET_IS_MODIFIED });
  } catch (error) {
    dispatch({ type: EUserActions.USER_ERROR });
  }
};
