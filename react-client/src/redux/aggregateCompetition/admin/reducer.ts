import { AdminDispatchTypes, EAdminActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const adminReducer = (state: ICompetitionState, action: AdminDispatchTypes) => {
  switch (action.type) {
    case EAdminActions.ACCEPT_ADMIN_REQUEST:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case EAdminActions.RELINQUISH_ADMIN:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    default:
      return state;
  }
};

export default adminReducer;
