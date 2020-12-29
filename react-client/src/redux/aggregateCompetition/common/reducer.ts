import { CommonDispatchTypes, ECommonCompetitionActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const commonReducer = (
  state: ICompetitionState,
  action: CommonDispatchTypes
) => {
  switch (action.type) {
    case ECommonCompetitionActions.COMPETITION_LOADING:
      return {
        ...state,
        loadingButton: action.payload.type,
        buttonIds:
          action.payload.userId !== undefined
            ? [...state.buttonIds, action.payload.type + action.payload.userId]
            : state.buttonIds,
      };
    case ECommonCompetitionActions.COMPETITION_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        buttonIds: action.payload
          ? state.buttonIds.filter((x) => x !== action.payload)
          : state.buttonIds,
      };
    default:
      return state;
  }
};

export default commonReducer;
