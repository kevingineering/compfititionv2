import { CompetitionDispatchTypes, ECompetitionActions } from './types';
import { ICompetitionState } from '../reducer';
import { NOT_LOADING } from '../../buttonTypes';

const competitionReducer = (
  state: ICompetitionState,
  action: CompetitionDispatchTypes
) => {
  switch (action.type) {
    case ECompetitionActions.CLEAR_CURRENT_GOAL:
      return {
        ...state,
        selectedCompetition: undefined,
      };
    case ECompetitionActions.SET_COMPETITION_GOALS:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        activeCompetitionGoals: action.payload.activeCompetitions,
        pastCompetitionGoals: action.payload.pastCompetitions,
      };
    case ECompetitionActions.GET_GOAL:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case ECompetitionActions.ADD_GOAL:
    case ECompetitionActions.UPDATE_GOAL:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case ECompetitionActions.DELETE_GOAL:
      return {
        ...state,
        selectedCompetition: undefined,
        activeCompetitionGoals: state.activeCompetitionGoals.filter(
          (goal) => goal.goalId !== action.payload
        ),
        pastCompetitionGoals: state.pastCompetitionGoals.filter(
          (goal) => goal.goalId !== action.payload
        ),
        loadingButton: NOT_LOADING,
      };
    default:
      return state;
  }
};

export default competitionReducer;
