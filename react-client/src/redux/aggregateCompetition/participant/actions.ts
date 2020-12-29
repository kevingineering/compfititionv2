import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { ParticipantDispatchTypes, EParticipantActions } from './types';
import {
  ECommonCompetitionActions,
  CommonDispatchTypes,
} from '../common/types';
import {
  ADMIN_ACCEPT_PARTICIPATION_REQUEST_BUTTON,
  UPDATE_PARTICIPANT_LEDGER_BUTTON,
  UPDATE_PARTICIPANT_TARGET_BUTTON,
  UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
  REMOVE_SELF_FROM_COMPETITION_BUTTON,
  ADMIN_KICK_USER_FROM_COMPETITION_BUTTON,
  ACCEPT_INVITATION_BUTTON,
} from '../../buttonTypes';
import { TLedgerRequest, TUpdateParticipationRequest } from '../../Models';
import { SetAlert } from '../../alert/actions';

type CombinedDispatchTypes = ParticipantDispatchTypes | CommonDispatchTypes;

export const AcceptInvitation = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ACCEPT_INVITATION_BUTTON },
    });
    const res = await axios.post('/api/participant/' + competitionId);
    //TODO - return participation
    dispatch({
      type: EParticipantActions.ACCEPT_INVITATION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const AcceptParticipationRequest = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: {
        type: ADMIN_ACCEPT_PARTICIPATION_REQUEST_BUTTON,
        userId: userId,
      },
    });
    const res = await axios.post(
      '/api/participant/' + userId + '/' + competitionId
    );
    dispatch({
      type: EParticipantActions.ADMIN_ACCEPT_PARTICIPATION_REQUEST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_ERROR,
      payload: ADMIN_ACCEPT_PARTICIPATION_REQUEST_BUTTON + userId,
    });
  }
};

export const UpdateParticipantLedger = (ledger: TLedgerRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_LEDGER_BUTTON },
    });
    const res = await axios.patch('/api/participant/ledger', ledger);
    dispatch({
      type: EParticipantActions.UPDATE_PARTICIPANT_LEDGER,
      payload: res.data,
    });
    dispatch(SetAlert('Progress saved'));
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const UpdateParticipantTarget = (
  update: TUpdateParticipationRequest
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_TARGET_BUTTON },
    });
    const res = await axios.patch('/api/participant/target', update);
    dispatch({
      type: EParticipantActions.UPDATE_PARTICIPANT_TARGET,
      payload: res.data,
    });
    dispatch(SetAlert('Participant goal updated'));
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const UpdateParticipantInitialValue = (
  update: TUpdateParticipationRequest
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON },
    });
    const res = await axios.patch('/api/participant/initialvalue', update);
    dispatch(SetAlert('Participant starting value updated'));
    dispatch({
      type: EParticipantActions.UPDATE_PARTICIPANT_INITIAL_VALUE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const RemoveSelfFromCompetition = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: REMOVE_SELF_FROM_COMPETITION_BUTTON },
    });
    await axios.delete('/api/participant/' + competitionId);
    dispatch({
      type: EParticipantActions.REMOVE_SELF_FROM_COMPETITION,
      payload: userId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const KickUserFromCompetition = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: {
        type: ADMIN_KICK_USER_FROM_COMPETITION_BUTTON,
        userId: userId,
      },
    });
    await axios.delete('/api/participant/' + userId + '/' + competitionId);
    dispatch({
      type: EParticipantActions.ADMIN_KICK_USER_FROM_COMPETITION,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_ERROR,
      payload: ADMIN_KICK_USER_FROM_COMPETITION_BUTTON + userId,
    });
  }
};
