import {
  GoalDispatchTypes,
  GOAL_LOADING,
  GET_GOALS,
  GET_GOAL,
  SET_CURRENT_GOAL,
  ADD_GOAL,
  CLEAR_CURRENT_GOAL,
  UPDATE_GOAL,
  GOAL_ERROR,
  DELETE_GOAL,
  UPDATE_GOAL_LEDGER,
} from './types';
import moment from 'moment';
import { NOT_LOADING } from '../buttonTypes';
import { TGoal } from '../../types';

export interface IGoalState {
  loadingButton: string;
  activeGoals: TGoal[];
  pastGoals: TGoal[];
  selectedGoal?: TGoal;
}

const goalState: IGoalState = {
  loadingButton: NOT_LOADING,
  activeGoals: [],
  pastGoals: [],
  selectedGoal: undefined,
};

const goalReducer = (
  state: IGoalState = goalState,
  action: GoalDispatchTypes
) => {
  switch (action.type) {
    case GOAL_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case GET_GOALS:
      let fetchedGoals = action.payload;
      return {
        ...state,
        loadingButton: NOT_LOADING,
        activeGoals: fetchedGoals.filter(
          (goal) =>
            moment().startOf('day').diff(goal.startDate, 'days') + 1 <=
            goal.duration
        ),
        pastGoals: fetchedGoals.filter(
          (goal) =>
            moment().startOf('day').diff(goal.startDate, 'days') + 1 >
            goal.duration
        ),
      };
    case GET_GOAL:
      return {
        ...state,
        selectedGoal: action.payload,
        loadingButton: NOT_LOADING,
      };
    case SET_CURRENT_GOAL:
      let concatGoals = state.activeGoals.concat(state.pastGoals);
      let goal = concatGoals.find((goal) => goal.id === action.payload);
      return {
        ...state,
        selectedGoal: goal,
      };
    case CLEAR_CURRENT_GOAL:
      return {
        ...state,
        selectedGoal: undefined,
      };
    case ADD_GOAL:
      return {
        ...state,
        activeGoals: [...state.activeGoals, action.payload],
        selectedGoal: action.payload,
        loadingButton: NOT_LOADING,
      };
    case UPDATE_GOAL:
    case UPDATE_GOAL_LEDGER:
      return {
        ...state,
        selectedGoal: action.payload,
        activeGoals: state.activeGoals.map((goal) =>
          goal.id === action.payload.id ? action.payload : goal
        ),
        loadingButton: NOT_LOADING,
      };
    case DELETE_GOAL:
      return {
        ...state,
        selectedGoal: undefined,
        loadingButton: NOT_LOADING,
        activeGoals: state.activeGoals.filter(
          (goal) => goal.id !== action.payload
        ),
        pastGoals: state.pastGoals.filter((goal) => goal.id !== action.payload),
      };
    case GOAL_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    default:
      return state;
  }
};

export default goalReducer;
