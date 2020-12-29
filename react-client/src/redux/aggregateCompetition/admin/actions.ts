import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AdminDispatchTypes, EAdminActions } from './types';
import {
  CommonDispatchTypes,
  ECommonCompetitionActions,
} from '../common/types';
import {
  ACCEPT_ADMIN_REQUEST_BUTTON,
  RELINQUISH_ADMIN_BUTTON,
} from '../../buttonTypes';

type CombinedDispatchTypes = AdminDispatchTypes | CommonDispatchTypes;

export const AcceptAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ACCEPT_ADMIN_REQUEST_BUTTON },
    });
    const res = await axios.post('/api/admin/' + competitionId);
    dispatch({ type: EAdminActions.ACCEPT_ADMIN_REQUEST, payload: res.data });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const RelinquishAdmin = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: RELINQUISH_ADMIN_BUTTON },
    });
    const res = await axios.delete('/api/admin/' + competitionId);
    dispatch({ type: EAdminActions.RELINQUISH_ADMIN, payload: res.data });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};
