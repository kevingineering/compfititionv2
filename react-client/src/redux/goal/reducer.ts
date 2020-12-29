import { GoalDispatchTypes, EGoalActions } from './types';
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
    case EGoalActions.GOAL_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case EGoalActions.SET_GOALS:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        activeGoals: action.payload.activeGoals,
        pastGoals: action.payload.pastGoals,
      };
    case EGoalActions.GET_GOAL:
      return {
        ...state,
        selectedGoal: action.payload,
        loadingButton: NOT_LOADING,
      };
    case EGoalActions.SET_CURRENT_GOAL:
      let concatGoals = state.activeGoals.concat(state.pastGoals);
      let goal = concatGoals.find((goal) => goal.goalId === action.payload);
      return {
        ...state,
        selectedGoal: goal,
      };
    case EGoalActions.CLEAR_CURRENT_GOAL:
      return {
        ...state,
        selectedGoal: undefined,
      };
    case EGoalActions.ADD_GOAL:
      return {
        ...state,
        activeGoals: [...state.activeGoals, action.payload],
        selectedGoal: action.payload,
        loadingButton: NOT_LOADING,
      };
    case EGoalActions.UPDATE_GOAL:
    case EGoalActions.UPDATE_GOAL_LEDGER:
      return {
        ...state,
        selectedGoal: action.payload,
        activeGoals: state.activeGoals.map((goal) =>
          goal.goalId === action.payload.goalId ? action.payload : goal
        ),
        loadingButton: NOT_LOADING,
      };
    case EGoalActions.DELETE_GOAL:
      return {
        ...state,
        selectedGoal: undefined,
        loadingButton: NOT_LOADING,
        activeGoals: state.activeGoals.filter(
          (goal) => goal.goalId !== action.payload
        ),
        pastGoals: state.pastGoals.filter(
          (goal) => goal.goalId !== action.payload
        ),
      };
    case EGoalActions.GOAL_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    default:
      return state;
  }
};

export default goalReducer;
