import {
  ParticipationRequestDispatchTypes,
  EParticipationRequestActions,
} from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const participationRequestReducer = (
  state: ICompetitionState,
  action: ParticipationRequestDispatchTypes
) => {
  switch (action.type) {
    case EParticipationRequestActions.ADD_PARTICIPATION_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                ParticipationRequests: [
                  ...state.selectedCompetition.participationRequests,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    case EParticipationRequestActions.DELETE_PARTICIPATION_REQUEST:
    case EParticipationRequestActions.ADMIN_REJECT_PARTICIPATION_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                ParticipationRequests: state.selectedCompetition.participationRequests.filter(
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

export default participationRequestReducer;
