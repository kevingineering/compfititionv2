import {
  FriendDispatchTypes,
  GET_OTHER_USER,
  GET_FRIENDS,
  FRIEND_LOADING,
  FRIEND_ERROR,
  DELETE_FRIEND,
  FILTER_FRIENDS,
  CLEAR_FILTERED_FRIENDS,
  ADD_FRIEND,
  FRIEND_FILTER_FRIENDS,
  CLEAR_FRIEND,
  SET_FRIEND_CURRENT_GOAL,
} from './types';
import { makeSimpleRegex } from '../../util/makeRegex';
import { NOT_LOADING } from '../buttonTypes';
import { TDifferentUser, TOtherUser } from '../../types';

export interface IFriendState {
  loadingButton: string;
  friends: TDifferentUser[];
  friend?: TOtherUser;
  filteredFriends: TDifferentUser[];
  isFiltered: boolean;
}

const friendState: IFriendState = {
  loadingButton: NOT_LOADING,
  friends: [],
  friend: undefined,
  filteredFriends: [],
  isFiltered: false,
};

const friendReducer = (
  state: IFriendState = friendState,
  action: FriendDispatchTypes
) => {
  switch (action.type) {
    case FRIEND_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case GET_FRIENDS:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friends: action.payload,
      };
    case GET_OTHER_USER:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friend: { ...action.payload },
        filteredFriends: [],
      };
    case ADD_FRIEND:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friends: [...state.friends, action.payload],
      };
    case DELETE_FRIEND:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friend: undefined,
      };
    case FRIEND_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case FILTER_FRIENDS:
      const regex = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredFriends: state.friends.filter((friend) => {
          return friend.email.match(regex) || friend.name.match(regex);
        }),
        isFiltered: true,
      };
    case FRIEND_FILTER_FRIENDS:
      const regexB = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredFriends: state.friend!.friends.filter(
          (friend) => friend.email.match(regexB) || friend.name.match(regexB)
        ),
        isFiltered: true,
      };
    case CLEAR_FILTERED_FRIENDS:
      return {
        ...state,
        filteredFriends: [],
        isFiltered: false,
      };
    case CLEAR_FRIEND:
      return friendState;
    case SET_FRIEND_CURRENT_GOAL:
      if (state.friend === undefined) {
        return state;
      } else {
        let concatGoals =
          state.friend && state.friend.activeGoals
            ? state.friend.activeGoals.concat(state.friend.pastGoals)
            : [];
        let goal = concatGoals.find((goal) => goal.goalId === action.payload);
        return {
          ...state,
          friends: state.friends,
          friend: { ...state.friend, selectedGoal: goal },
        };
      }
    default:
      return state;
  }
};

export default friendReducer;
