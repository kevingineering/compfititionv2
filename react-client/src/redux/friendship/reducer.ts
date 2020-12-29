import { FriendDispatchTypes, EFriendActions } from './types';
import { makeSimpleRegex } from '../../util/makeRegex';
import { NOT_LOADING } from '../buttonTypes';
import { TDifferentUser, TDifferentUserInfo } from '../../types';

export interface IFriendState {
  loadingButton: string;
  friends: TDifferentUser[];
  friend?: TDifferentUserInfo;
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
    case EFriendActions.FRIEND_LOADING:
      return {
        ...state,
        loadingButton: action.payload,
      };
    case EFriendActions.SET_FRIENDS:
    case EFriendActions.GET_FRIENDS:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friends: action.payload,
      };
    case EFriendActions.GET_DIFFERENT_USER_INFO:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friend: { ...action.payload },
        filteredFriends: [],
      };
    case EFriendActions.ADD_FRIEND:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friends: [...state.friends, action.payload],
      };
    case EFriendActions.DELETE_FRIEND:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        friend: undefined,
      };
    case EFriendActions.FRIEND_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
      };
    case EFriendActions.FILTER_FRIENDS:
      const regex = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredFriends: state.friends.filter((friend) => {
          return friend.email.match(regex) || friend.name.match(regex);
        }),
        isFiltered: true,
      };
    case EFriendActions.FRIEND_FILTER_FRIENDS:
      const regexB = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredFriends: state.friend!.friends.filter(
          (friend) => friend.email.match(regexB) || friend.name.match(regexB)
        ),
        isFiltered: true,
      };
    case EFriendActions.CLEAR_FILTERED_FRIENDS:
      return {
        ...state,
        filteredFriends: [],
        isFiltered: false,
      };
    case EFriendActions.CLEAR_FRIEND:
      return friendState;
    case EFriendActions.SET_FRIEND_CURRENT_GOAL:
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
          friend: { ...state.friend, selectedGoal: goal },
        };
      }
    default:
      return state;
  }
};

export default friendReducer;
