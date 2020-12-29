import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AdminRequestDispatchTypes, EAdminRequestActions } from './types';
import {
  CommonDispatchTypes,
  ECommonCompetitionActions,
} from '../common/types';
import {
  ADMIN_ADD_ADMIN_REQUEST_BUTTON,
  REJECT_ADMIN_REQUEST_BUTTON,
} from '../../buttonTypes';

type CombinedDispatchTypes = AdminRequestDispatchTypes | CommonDispatchTypes;

export const AddAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ADMIN_ADD_ADMIN_REQUEST_BUTTON, userId: userId },
    });
    await axios.post('/api/adminrequest/' + userId + '/' + competitionId);
    dispatch({
      type: EAdminRequestActions.ADMIN_ADD_ADMIN_REQUEST,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_ERROR,
      payload: ADMIN_ADD_ADMIN_REQUEST_BUTTON + userId,
    });
  }
};

export const RejectAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: REJECT_ADMIN_REQUEST_BUTTON },
    });
    await axios.delete('/api/adminrequest/' + competitionId);
    dispatch({
      type: EAdminRequestActions.REJECT_ADMIN_REQUEST,
      payload: userId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};
