import { AdminRequestDispatchTypes, EAdminRequestActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const adminRequestReducer = (
  state: ICompetitionState,
  action: AdminRequestDispatchTypes
) => {
  switch (action.type) {
    case EAdminRequestActions.ADMIN_ADD_ADMIN_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                adminRequests: [
                  ...state.selectedCompetition.adminRequests,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
      };
    case EAdminRequestActions.REJECT_ADMIN_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                adminRequests: [],
              }
            : undefined,
      };
    default:
      return state;
  }
};

export default adminRequestReducer;
