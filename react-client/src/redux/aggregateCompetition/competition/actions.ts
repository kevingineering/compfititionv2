import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { CompetitionDispatchTypes, ECompetitionActions } from './types';
import {
  CommonDispatchTypes,
  ECommonCompetitionActions,
} from '../common/types';
import {
  NO_BUTTON,
  ADD_COMPETITION_BUTTON,
  UPDATE_COMPETITION_BUTTON,
  DELETE_COMPETITION_BUTTON,
} from '../../buttonTypes';
import { TCompetitionRequest } from '../../Models';
import { SetAlert } from '../../alert/actions';

type CombinedDispatchTypes = CompetitionDispatchTypes | CommonDispatchTypes;

export const GetCompetition = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: NO_BUTTON },
    });
    const res = await axios.get('/api/competition/' + competitionId);
    dispatch({ type: ECompetitionActions.GET_GOAL, payload: res.data });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const AddCompetition = (competition: TCompetitionRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ADD_COMPETITION_BUTTON },
    });
    const res = await axios.post('/api/competition', competition);
    dispatch({ type: ECompetitionActions.ADD_GOAL, payload: res.data });
    dispatch(SetAlert('Competition added', true));
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const UpdateCompetition = (competition: TCompetitionRequest) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: UPDATE_COMPETITION_BUTTON },
    });
    const res = await axios.patch('/api/competition', competition);
    dispatch({ type: ECompetitionActions.UPDATE_GOAL, payload: res.data });
    dispatch(SetAlert('Competition updated', true));
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const DeleteCompetition = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: DELETE_COMPETITION_BUTTON },
    });
    await axios.delete('/api/competition/' + competitionId);
    dispatch(SetAlert('Competition deleted', true));
    dispatch({
      type: ECompetitionActions.DELETE_GOAL,
      payload: competitionId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const ClearCurrentCompetition = () => (
  dispatch: Dispatch<CompetitionDispatchTypes>
) => {
  dispatch({ type: ECompetitionActions.CLEAR_CURRENT_GOAL });
};
