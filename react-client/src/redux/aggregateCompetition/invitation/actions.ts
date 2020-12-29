import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { InvitationDispatchTypes, EInvitationActions } from './types';
import {
  CommonDispatchTypes,
  ECommonCompetitionActions,
} from '../common/types';
import {
  ADMIN_ADD_INVITATION_BUTTON,
  ADMIN_DELETE_INVITATION_BUTTON,
  REJECT_INVITATION_BUTTON,
} from '../../buttonTypes';

type CombinedDispatchTypes = InvitationDispatchTypes | CommonDispatchTypes;

export const AddInvitation = (userId: string, competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ADMIN_ADD_INVITATION_BUTTON, userId: userId },
    });
    const res = await axios.post(
      '/api/invitation/' + userId + '/' + competitionId
    );
    dispatch({
      type: EInvitationActions.ADMIN_ADD_INVITATION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_ERROR,
      payload: ADMIN_ADD_INVITATION_BUTTON + userId,
    });
  }
};

export const DeleteInvitation = (
  userId: string,
  competitionId: string
) => async (dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: ADMIN_DELETE_INVITATION_BUTTON, userId: userId },
    });
    await axios.delete('/api/invitation/' + userId + '/' + competitionId);
    dispatch({
      type: EInvitationActions.ADMIN_DELETE_INVITATION,
      payload: userId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};

export const RejectInvitation = (competitionId: string) => async (
  dispatch: ThunkDispatch<{}, {}, CombinedDispatchTypes>
) => {
  try {
    dispatch({
      type: ECommonCompetitionActions.COMPETITION_LOADING,
      payload: { type: REJECT_INVITATION_BUTTON },
    });
    await axios.delete('/api/invitation/' + competitionId);
    dispatch({
      type: EInvitationActions.REJECT_INVITATION,
      payload: competitionId,
    });
  } catch (error) {
    dispatch({ type: ECommonCompetitionActions.COMPETITION_ERROR });
  }
};
