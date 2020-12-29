import { ParticipantDispatchTypes, EParticipantActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const participantReducer = (
  state: ICompetitionState,
  action: ParticipantDispatchTypes
) => {
  switch (action.type) {
    case EParticipantActions.ACCEPT_INVITATION:
    case EParticipantActions.ADMIN_ACCEPT_PARTICIPATION_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                participants: [
                  ...state.selectedCompetition.participants,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload.userId
        ),
      };
    case EParticipantActions.UPDATE_PARTICIPANT_LEDGER:
    case EParticipantActions.UPDATE_PARTICIPANT_TARGET:
    case EParticipantActions.UPDATE_PARTICIPANT_INITIAL_VALUE:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                participants: state.selectedCompetition!.participants.map((x) =>
                  x.userId !== action.payload.userId ? x : action.payload
                ),
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    case EParticipantActions.REMOVE_SELF_FROM_COMPETITION:
      return {
        ...state,
        selectedCompetition: undefined,
        loadingButton: NOT_LOADING,
      };
    case EParticipantActions.ADMIN_KICK_USER_FROM_COMPETITION:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                participants: state.selectedCompetition.participants.filter(
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

export default participantReducer;
