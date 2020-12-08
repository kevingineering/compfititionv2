import {
  CompetitionDispatchTypes,
  COMPETITION_LOADING,
  GET_COMPETITION_GOALS,
  COMPETITION_ERROR,
  ADD_COMPETITION,
  GET_COMPETITION,
  ADMIN_UPDATE_COMPETITION,
  ADMIN_DELETE_COMPETITION,
  CLEAR_CURRENT_COMPETITION,
  UPDATE_PARTICIPANT_TARGET,
  UPDATE_PARTICIPANT_LEDGER,
  UPDATE_PARTICIPANT_INITIAL_VALUE,
  ACCEPT_INVITE,
  ADMIN_ACCEPT_PARTICIPANT_REQUEST,
  ADMIN_KICK_USER_FROM_COMPETITION,
  REMOVE_SELF_FROM_COMPETITION,
  RELINQUISH_ADMIN,
  ADD_PARTICIPANT_REQUEST,
  DELETE_PARTICIPANT_REQUEST,
  ADMIN_REJECT_PARTICIPANT_REQUEST,
  ADMIN_ADD_INVITE,
  ADMIN_DELETE_INVITE,
  REJECT_INVITE,
  ACCEPT_ADMIN_REQUEST,
  ADMIN_ADD_ADMIN_REQUEST,
  REJECT_ADMIN_REQUEST,
} from './types';
import { NOT_LOADING } from '../buttonTypes';
import { TGoal, TCompetition } from '../../types';
import { getGoalTime } from '../../util/dateFunctions';

export interface ICompetitionState {
  loadingButton: string;
  activeCompetitionGoals: TGoal[];
  pastCompetitionGoals: TGoal[];
  selectedCompetition?: TCompetition;
  buttonIds: string[];
}

const competitionState: ICompetitionState = {
  loadingButton: NOT_LOADING,
  activeCompetitionGoals: [],
  pastCompetitionGoals: [],
  selectedCompetition: undefined,
  buttonIds: [],
};

const competitionReducer = (
  state: ICompetitionState = competitionState,
  action: CompetitionDispatchTypes
) => {
  switch (action.type) {
    //#region general
    case COMPETITION_LOADING:
      let ids = state.buttonIds;
      if (action.payload.id !== undefined) {
        ids.push(action.payload.type + action.payload.id);
      }
      return {
        ...state,
        loadingButton: action.payload.type,
        buttonIds: ids,
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
    case GET_COMPETITION_GOALS:
      let fetchedCompetitionGoals = action.payload;
      return {
        ...state,
        loadingButton: NOT_LOADING,
        activeCompetitionGoals: fetchedCompetitionGoals.filter(
          (goal) => !getGoalTime(goal.startTime, goal.duration).isFinished
        ),
        pastCompetitionGoals: fetchedCompetitionGoals.filter(
          (goal) => getGoalTime(goal.startTime, goal.duration).isFinished
        ),
      };
    case GET_COMPETITION:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case ADD_COMPETITION:
    case ADMIN_UPDATE_COMPETITION:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case ADMIN_DELETE_COMPETITION:
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
    //#endregion
    //#region participant
    case ACCEPT_INVITE:
    case ADMIN_ACCEPT_PARTICIPANT_REQUEST:
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
      };
    case UPDATE_PARTICIPANT_LEDGER:
    case UPDATE_PARTICIPANT_TARGET:
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
    case REMOVE_SELF_FROM_COMPETITION:
      return {
        ...state,
        selectedCompetition: undefined,
        loadingButton: NOT_LOADING,
      };
    case ADMIN_KICK_USER_FROM_COMPETITION:
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
      };
    //#endregion
    //#region participant request
    case ADD_PARTICIPANT_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                participantRequests: [
                  ...state.selectedCompetition.participantRequests,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    case DELETE_PARTICIPANT_REQUEST:
    case ADMIN_REJECT_PARTICIPANT_REQUEST:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                participantRequests: state.selectedCompetition.participantRequests.filter(
                  (x) => x !== action.payload
                ),
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    //#endregion
    //#region invite
    case ADMIN_ADD_INVITE:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                invites: [
                  ...state.selectedCompetition.participantRequests,
                  action.payload,
                ],
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    case ADMIN_DELETE_INVITE:
    case REJECT_INVITE:
      return {
        ...state,
        selectedCompetition:
          state.selectedCompetition !== undefined
            ? {
                ...state.selectedCompetition,
                invites: state.selectedCompetition.participantRequests.filter(
                  (x) => x !== action.payload
                ),
              }
            : undefined,
        loadingButton: NOT_LOADING,
      };
    //#endregion
    //#region admin
    case ACCEPT_ADMIN_REQUEST:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    case RELINQUISH_ADMIN:
      return {
        ...state,
        selectedCompetition: action.payload,
        loadingButton: NOT_LOADING,
      };
    //#endregion
    //#region admin request
    case ADMIN_ADD_ADMIN_REQUEST:
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
      };
    case REJECT_ADMIN_REQUEST:
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
    //#endregion
    default:
      return state;
  }
};

export default competitionReducer;
