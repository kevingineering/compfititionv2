import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import {
  ParticipationRequestDispatchTypes,
  EParticipationRequestActions,
} from './types';
import {
  CommonDispatchTypes,
  ECommonCompetitionActions,
} from '../common/types';
import {
  ADD_PARTICIPATION_REQUEST_BUTTON,
  DELETE_PARTICIPATION_REQUEST_BUTTON,
  ADMIN_REJECT_PARTICIPATION_REQUEST_BUTTON,
} from '../../buttonTypes';

type CombinedDispatchTypes =
  | ParticipationRequestDispatchTypes
  | CommonDispatchTypes;

export const AddParticipationRequest = (
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ADD_PARTICIPATION_REQUEST_BUTTON },
    });
    const res = await axios.post('/api/ParticipationRequest/' + competitionId);
    dispatch({
      type: EParticipationRequestActions.ADD_PARTICIPATION_REQUEST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const DeleteParticipationRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: DELETE_PARTICIPATION_REQUEST_BUTTON },
    });
    await axios.delete('/api/ParticipationRequest/' + competitionId);
    dispatch({
      type: EParticipationRequestActions.DELETE_PARTICIPATION_REQUEST,
      payload: userId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const RejectParticipationRequest = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: {
        type: ADMIN_REJECT_PARTICIPATION_REQUEST_BUTTON,
        userId: userId,
      },
    });
    await axios.delete(
      '/api/ParticipationRequest/' + competitionId + '/' + userId
    );
    dispatch({
      type: EParticipationRequestActions.DELETE_PARTICIPATION_REQUEST,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_ERROR,
      payload: ADMIN_REJECT_PARTICIPATION_REQUEST_BUTTON + userId,
    });
  }
};
