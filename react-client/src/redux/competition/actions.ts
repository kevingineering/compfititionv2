import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CompetitionDispatchTypes,
  //general competition
  COMPETITION_LOADING,
  GET_COMPETITION_GOALS,
  GET_COMPETITION,
  ADD_COMPETITION,
  ADMIN_UPDATE_COMPETITION,
  ADMIN_DELETE_COMPETITION,
  COMPETITION_ERROR,
  CLEAR_CURRENT_COMPETITION,
  //participant
  ACCEPT_INVITE,
  ADMIN_ACCEPT_PARTICIPANT_REQUEST,
  UPDATE_PARTICIPANT_LEDGER,
  UPDATE_PARTICIPANT_TARGET,
  UPDATE_PARTICIPANT_INITIAL_VALUE,
  REMOVE_SELF_FROM_COMPETITION,
  ADMIN_KICK_USER_FROM_COMPETITION,
  //participant request
  ADD_PARTICIPANT_REQUEST,
  DELETE_PARTICIPANT_REQUEST,
  ADMIN_REJECT_PARTICIPANT_REQUEST,
  //invite
  ADMIN_ADD_INVITE,
  ADMIN_DELETE_INVITE,
  REJECT_INVITE,
  //admin
  ACCEPT_ADMIN_REQUEST,
  RELINQUISH_ADMIN,
  //admin request
  ADMIN_ADD_ADMIN_REQUEST,
  REJECT_ADMIN_REQUEST,
} from './types';
import {
  NO_BUTTON,
  ADD_COMPETITION_BUTTON,
  UPDATE_COMPETITION_BUTTON,
  DELETE_COMPETITION_BUTTON,
  UPDATE_PARTICIPANT_LEDGER_BUTTON,
  UPDATE_PARTICIPANT_TARGET_BUTTON,
  UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
  ACCEPT_INVITE_BUTTON,
  ADMIN_ACCEPT_PARTICIPANT_REQUEST_BUTTON,
  REMOVE_SELF_FROM_COMPETITION_BUTTON,
  ADMIN_KICK_USER_FROM_COMPETITION_BUTTON,
  ADD_PARTICIPANT_REQUEST_BUTTON,
  ADMIN_REJECT_PARTICIPANT_REQUEST_BUTTON,
  ADMIN_ADD_INVITE_BUTTON,
  DELETE_PARTICIPANT_REQUEST_BUTTON,
  ADMIN_DELETE_INVITE_BUTTON,
  REJECT_INVITE_BUTTON,
  ACCEPT_ADMIN_REQUEST_BUTTON,
  RELINQUISH_ADMIN_BUTTON,
  ADMIN_ADD_ADMIN_REQUEST_BUTTON,
  REJECT_ADMIN_REQUEST_BUTTON,
} from '../buttonTypes';
import {
  TCompetitionRequest,
  TLedgerRequest,
  TUpdateParticipantDTO,
} from '../Models';
import { SetAlert } from '../alert/actions';

//#region general competition
export const GetCompetitionGoals = () => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({ type: COMPETITION_LOADING, payload: { type: NO_BUTTON } });
    const res = await axios.get('/api/competition');
    dispatch({ type: GET_COMPETITION_GOALS, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const GetCompetition = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({ type: COMPETITION_LOADING, payload: { type: NO_BUTTON } });
    const res = await axios.get('/api/competition/' + competitionId);
    dispatch({ type: GET_COMPETITION, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const AddCompetition = (competition: TCompetitionRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ADD_COMPETITION_BUTTON },
    });
    const res = await axios.post('/api/competition', competition);
    dispatch({ type: ADD_COMPETITION, payload: res.data });
    dispatch(SetAlert('Competition added', true));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const UpdateCompetition = (competition: TCompetitionRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: UPDATE_COMPETITION_BUTTON },
    });
    const res = await axios.patch('/api/competition', competition);
    dispatch({ type: ADMIN_UPDATE_COMPETITION, payload: res.data });
    dispatch(SetAlert('Competition updated', true));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const DeleteCompetition = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: DELETE_COMPETITION_BUTTON },
    });
    await axios.delete('/api/competition/' + competitionId);
    dispatch(SetAlert('Competition deleted', true));
    dispatch({ type: ADMIN_DELETE_COMPETITION, payload: competitionId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const ClearCurrentCompetition = () => (
  dispatch: Dispatch<CompetitionDispatchTypes>
) => {
  dispatch({ type: CLEAR_CURRENT_COMPETITION });
};
//#endregion

//#region participant
export const AcceptInvite = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ACCEPT_INVITE_BUTTON },
    });
    const res = await axios.post('/api/participant/' + competitionId);
    //TODO - return participation
    dispatch({ type: ACCEPT_INVITE, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const AcceptParticipantRequest = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: {
        type: ADMIN_ACCEPT_PARTICIPANT_REQUEST_BUTTON,
        userId: userId,
      },
    });
    const res = await axios.post(
      '/api/participant/' + userId + '/' + competitionId
    );
    dispatch({ type: ADMIN_ACCEPT_PARTICIPANT_REQUEST, payload: res.data });
  } catch (error) {
    dispatch({
      type: COMPETITION_ERROR,
      payload: ADMIN_ACCEPT_PARTICIPANT_REQUEST_BUTTON + userId,
    });
  }
};

export const UpdateParticipantLedger = (ledger: TLedgerRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_LEDGER_BUTTON },
    });
    const res = await axios.patch('/api/participant/ledger', ledger);
    dispatch({ type: UPDATE_PARTICIPANT_LEDGER, payload: res.data });
    dispatch(SetAlert('Progress saved'));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const UpdateParticipantTarget = (
  update: TUpdateParticipantDTO
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_TARGET_BUTTON },
    });
    const res = await axios.patch('/api/participant/target', update);
    dispatch({ type: UPDATE_PARTICIPANT_TARGET, payload: res.data });
    dispatch(SetAlert('Participant goal updated'));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const UpdateParticipantInitialValue = (
  update: TUpdateParticipantDTO
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON },
    });
    const res = await axios.patch('/api/participant/initialvalue', update);
    dispatch(SetAlert('Participant starting value updated'));
    dispatch({ type: UPDATE_PARTICIPANT_INITIAL_VALUE, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const RemoveSelfFromCompetition = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: REMOVE_SELF_FROM_COMPETITION_BUTTON },
    });
    await axios.delete('/api/participant/' + competitionId);
    dispatch({
      type: REMOVE_SELF_FROM_COMPETITION,
      payload: userId,
    });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const KickUserFromCompetition = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: {
        type: ADMIN_KICK_USER_FROM_COMPETITION_BUTTON,
        userId: userId,
      },
    });
    await axios.delete('/api/participant/' + userId + '/' + competitionId);
    dispatch({
      type: ADMIN_KICK_USER_FROM_COMPETITION,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_ERROR,
      payload: ADMIN_KICK_USER_FROM_COMPETITION_BUTTON + userId,
    });
  }
};

//#endregion

//#region participant request
export const AddParticipantRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ADD_PARTICIPANT_REQUEST_BUTTON },
    });
    await axios.post('/api/participantrequest/' + competitionId);
    dispatch({ type: ADD_PARTICIPANT_REQUEST, payload: userId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const DeleteParticipantRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: DELETE_PARTICIPANT_REQUEST_BUTTON },
    });
    await axios.delete('/api/participantrequest/' + competitionId);
    dispatch({ type: DELETE_PARTICIPANT_REQUEST, payload: userId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const RejectParticipantRequest = (
  competitionId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: {
        type: ADMIN_REJECT_PARTICIPANT_REQUEST_BUTTON,
        userId: userId,
      },
    });
    await axios.delete(
      '/api/participantrequest/' + competitionId + '/' + userId
    );
    dispatch({ type: ADMIN_REJECT_PARTICIPANT_REQUEST, payload: userId });
  } catch (error) {
    dispatch({
      type: COMPETITION_ERROR,
      payload: ADMIN_REJECT_PARTICIPANT_REQUEST_BUTTON + userId,
    });
  }
};

//#endregion

//#region invite
export const AddInvite = (userId: string, competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ADMIN_ADD_INVITE_BUTTON, userId: userId },
    });
    await axios.post('/api/invite/' + userId + '/' + competitionId);
    dispatch({ type: ADMIN_ADD_INVITE, payload: userId });
  } catch (error) {
    dispatch({
      type: COMPETITION_ERROR,
      payload: ADMIN_ADD_INVITE_BUTTON + userId,
    });
  }
};

export const DeleteInvite = (userId: string, competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ADMIN_DELETE_INVITE_BUTTON, userId: userId },
    });
    await axios.delete('/api/invite/' + userId + '/' + competitionId);
    dispatch({ type: ADMIN_DELETE_INVITE, payload: userId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const RejectInvite = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: REJECT_INVITE_BUTTON },
    });
    await axios.delete('/api/invite/' + competitionId);
    dispatch({ type: REJECT_INVITE, payload: competitionId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

//#endregion

//#region admin
//TODO - return competition with admin info?
export const AcceptAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ACCEPT_ADMIN_REQUEST_BUTTON },
    });
    const res = await axios.post('/api/admin/' + competitionId);
    dispatch({ type: ACCEPT_ADMIN_REQUEST, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const RelinquishAdmin = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: RELINQUISH_ADMIN_BUTTON },
    });
    const res = await axios.delete('/api/admin/' + competitionId);
    dispatch({ type: RELINQUISH_ADMIN, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

//#endregion

//#region admin request
export const AddAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: ADMIN_ADD_ADMIN_REQUEST_BUTTON, userId: userId },
    });
    await axios.post('/api/adminrequest/' + userId + '/' + competitionId);
    dispatch({ type: ADMIN_ADD_ADMIN_REQUEST, payload: userId });
  } catch (error) {
    dispatch({
      type: COMPETITION_ERROR,
      payload: ADMIN_ADD_ADMIN_REQUEST_BUTTON + userId,
    });
  }
};

export const RejectAdminRequest = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: { type: REJECT_ADMIN_REQUEST_BUTTON },
    });
    await axios.delete('/api/adminrequest/' + competitionId);
    dispatch({ type: REJECT_ADMIN_REQUEST, payload: userId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

//#endregion
