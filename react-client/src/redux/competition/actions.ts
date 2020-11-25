import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CompetitionDispatchTypes,
  COMPETITION_LOADING,
  GET_COMPETITION_GOALS,
  COMPETITION_ERROR,
  ADD_COMPETITION,
  GET_COMPETITION,
  CLEAR_CURRENT_COMPETITION,
  UPDATE_PARTICIPANT_LEDGER,
  UPDATE_PARTICIPANT_TARGET,
  UPDATE_PARTICIPANT_INITIAL_VALUE,
  DELETE_COMPETITION,
  REMOVE_ADMIN_FROM_COMPETITION,
} from './types';
import {
  NO_BUTTON,
  ADD_COMPETITION_BUTTON,
  UPDATE_PARTICIPANT_LEDGER_BUTTON,
  UPDATE_PARTICIPANT_TARGET_BUTTON,
  DELETE_COMPETITION_BUTTON,
  REMOVE_ADMIN_FROM_COMPETITION_BUTTON,
  UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
} from '../buttonTypes';
import { TGoalDTO, TLedgerDTO, TUpdateParticipantDTO } from '../DTOs';
import { SetAlert } from '../alert/actions';

export const GetCompetitionGoals = () => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({ type: COMPETITION_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/competition');
    dispatch({ type: GET_COMPETITION_GOALS, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const GetCompetition = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({ type: COMPETITION_LOADING, payload: NO_BUTTON });
    const res = await axios.get('/api/competition/' + id);
    dispatch({ type: GET_COMPETITION, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const AddCompetition = (competition: TGoalDTO) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({ type: COMPETITION_LOADING, payload: ADD_COMPETITION_BUTTON });
    const res = await axios.post('/api/competition', competition);
    dispatch({ type: ADD_COMPETITION, payload: res.data });
    dispatch(SetAlert('Competition added', true));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const UpdateParticipantLedger = (ledger: TLedgerDTO) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: UPDATE_PARTICIPANT_LEDGER_BUTTON,
    });
    const res = await axios.patch(
      '/api/competition/participant/ledger',
      ledger
    );
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
      payload: UPDATE_PARTICIPANT_TARGET_BUTTON,
    });
    const res = await axios.patch(
      '/api/competition/participant/target',
      update
    );
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
      payload: UPDATE_PARTICIPANT_INITIAL_VALUE_BUTTON,
    });
    const res = await axios.patch(
      '/api/competition/participant/initialvalue',
      update
    );
    dispatch(SetAlert('Participant starting value updated'));
    dispatch({ type: UPDATE_PARTICIPANT_INITIAL_VALUE, payload: res.data });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const DeleteCompetition = (compId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>
) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: DELETE_COMPETITION_BUTTON,
    });
    await axios.delete('/api/competition/' + compId);
    dispatch(SetAlert('Competition deleted', true));
    dispatch({ type: DELETE_COMPETITION, payload: compId });
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const RemoveAdminFromCompetition = (
  compId: string,
  userId: string
) => async (dispatch: ThunkDispatch<{}, {}, CompetitionDispatchTypes>) => {
  try {
    dispatch({
      type: COMPETITION_LOADING,
      payload: REMOVE_ADMIN_FROM_COMPETITION_BUTTON,
    });
    await axios.patch('/api/competition/removeadmin/' + compId);
    dispatch({ type: REMOVE_ADMIN_FROM_COMPETITION, payload: userId });
    dispatch(SetAlert('Relinquished admin role'));
  } catch (error) {
    dispatch({ type: COMPETITION_ERROR });
  }
};

export const ClearCurrentCompetition = () => (
  dispatch: Dispatch<CompetitionDispatchTypes>
) => {
  dispatch({ type: CLEAR_CURRENT_COMPETITION });
};
