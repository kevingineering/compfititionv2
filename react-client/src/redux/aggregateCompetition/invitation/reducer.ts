import { InvitationDispatchTypes, EInvitationActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const invitationReducer = (
  state: ICompetitionState,
  action: InvitationDispatchTypes
) => {
  switch (action.type) {
    case EInvitationActions.ADMIN_ADD_INVITATION:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                invitations: [
                  ...state.selectedCompetition.invitations,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload.userId
        ),
      };
    case EInvitationActions.ADMIN_DELETE_INVITATION:
    case EInvitationActions.REJECT_INVITATION:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                invitations: state.selectedCompetition.invitations.filter(
                  (x) => x.userId !== action.payload
                ),
              }
            : undefined,
        loadingButton: NOT_LOADING,
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
      };
    default:
      return state;
  }
};

export default invitationReducer;
