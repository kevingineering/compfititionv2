import {
  CompetitionDispatchTypes,
  COMPETITION_LOADING,
  GET_COMPETITION_GOALS,
  COMPETITION_ERROR,
  ADD_COMPETITION,
  GET_COMPETITION,
  CLEAR_CURRENT_COMPETITION,
  UPDATE_PARTICIPANT_TARGET,
  UPDATE_PARTICIPANT_LEDGER,
  DELETE_COMPETITION,
  REMOVE_ADMIN_FROM_COMPETITION,
  UPDATE_PARTICIPANT_INITIAL_VALUE,
  // SET_CURRENT_COMPETITION,
} from './types';
import moment from 'moment';
import { NOT_LOADING } from '../buttonTypes';
import { TGoal, TCompetition } from '../../types';

export interface ICompetitionState {
  loadingButton: string;
  activeCompetitionGoals: TGoal[];
  pastCompetitionGoals: TGoal[];
  selectedCompetition?: TCompetition;
}

const competitionState: ICompetitionState = {
  loadingButton: NOT_LOADING,
  activeCompetitionGoals: [],
  pastCompetitionGoals: [],
  selectedCompetition: undefined,
};

const competitionReducer = (
  state: ICompetitionState = competitionState,
  action: CompetitionDispatchTypes
) => {
  switch (action.type) {
    case COMPETITION_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case GET_COMPETITION_GOALS:
      let fetchedCompetitionGoals = action.payload;
      return {
        ...state,
        loadingButton: NOT_LOADING,
        activeCompetitionGoals: fetchedCompetitionGoals.filter(
          (goal) =>
            moment().startOf('day').diff(goal.startDate, 'days') + 1 <=
            goal.duration
        ),
        pastCompetitionGoals: fetchedCompetitionGoals.filter(
          (goal) =>
            moment().startOf('day').diff(goal.startDate, 'days') + 1 >
            goal.duration
        ),
      };
    case GET_COMPETITION:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case ADD_COMPETITION:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case UPDATE_PARTICIPANT_TARGET:
    case UPDATE_PARTICIPANT_LEDGER:
    case UPDATE_PARTICIPANT_INITIAL_VALUE:
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
    case DELETE_COMPETITION:
      return {
        ...state,
        selectedCompetition: undefined,
        activeCompetitionGoals: state.activeCompetitionGoals.filter(
          (x) => x.id !== action.payload
        ),
        pastCompetitionGoals: state.pastCompetitionGoals.filter(
          (x) => x.id !== action.payload
        ),
        loadingButton: NOT_LOADING,
      };
    case REMOVE_ADMIN_FROM_COMPETITION:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                admins: state.selectedCompetition!.admins.filter(
                  (x) => x !== action.payload
                ),
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    case COMPETITION_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case CLEAR_CURRENT_COMPETITION:
      return {
        ...state,
        selectedCompetition: undefined,
      };
    default:
      return state;
  }
};

export default competitionReducer;
