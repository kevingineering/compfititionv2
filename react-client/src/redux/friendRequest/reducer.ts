import { RequestDispatchTypes, EFriendRequestActions } from './types';
import { makeSimpleRegex } from '../../util/makeRegex';
import { NOT_LOADING } from '../buttonTypes';
import { TDifferentUser } from '../../types';

export interface IRequestState {
  loadingButton: string;
  usersWhoSentFriendRequest: TDifferentUser[];
  usersWhoReceivedFriendRequest: TDifferentUser[];
  searchableUsers: TDifferentUser[];
  filteredSearchableUsers: TDifferentUser[];
  isFiltered: boolean;
  buttonIds: string[];
}

const requestState: IRequestState = {
  loadingButton: NOT_LOADING,
  usersWhoSentFriendRequest: [],
  usersWhoReceivedFriendRequest: [],
  searchableUsers: [],
  filteredSearchableUsers: [],
  isFiltered: false,
  buttonIds: [],
};

const requestReducer = (
  state: IRequestState = requestState,
  action: RequestDispatchTypes
) => {
  switch (action.type) {
    case EFriendRequestActions.FRIEND_REQUEST_LOADING:
      return {
        ...state,
        loadingButton: action.payload.type,
        buttonIds:
          action.payload.userId !== undefined
            ? [...state.buttonIds, action.payload.type + action.payload.userId]
            : state.buttonIds,
      };
    case EFriendRequestActions.GET_USER_FRIEND_REQUEST_INFO:
      return {
        ...state,
        usersWhoSentFriendRequest: action.payload.usersWhoSentFriendRequest,
        usersWhoReceivedFriendRequest:
          action.payload.usersWhoReceivedFriendRequest,
        searchableUsers: action.payload.searchableUsers,
        loadingButton: NOT_LOADING,
      };
    case EFriendRequestActions.SET_USERS_WHO_SENT_FRIEND_REQUESTS:
      return {
        ...state,
        usersWhoSentFriendRequest: action.payload,
        loadingButton: NOT_LOADING,
      };
    case EFriendRequestActions.ADD_FRIEND_REQUEST:
      var user = state.searchableUsers.find((x) => x.userId === action.payload);
      return {
        ...state,
        usersWhoReceivedFriendRequest: [
          ...state.usersWhoReceivedFriendRequest,
          user!,
        ],
        searchableUsers: state.searchableUsers.filter(
          (user) => user.userId !== action.payload
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case EFriendRequestActions.DELETE_FRIEND_REQUEST:
      return {
        ...state,
        searchableUsers: [
          ...state.searchableUsers,
          ...state.usersWhoReceivedFriendRequest.filter(
            (user) => user.userId === action.payload
          ),
        ],
        usersWhoReceivedFriendRequest: state.usersWhoReceivedFriendRequest.filter(
          (user) => user.userId !== action.payload
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case EFriendRequestActions.ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        usersWhoSentFriendRequest: state.usersWhoSentFriendRequest.filter(
          (uesr) => uesr.userId !== action.payload
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case EFriendRequestActions.REJECT_FRIEND_REQUEST:
      return {
        ...state,
        usersWhoSentFriendRequest: state.usersWhoSentFriendRequest.filter(
          (user) => user.userId !== action.payload
        ),
        searchableUsers: [
          ...state.searchableUsers,
          ...state.usersWhoSentFriendRequest.filter(
            (user) => user.userId === action.payload
          ),
        ],
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case EFriendRequestActions.FRIEND_REQUEST_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        buttonIds: action.payload
          ? state.buttonIds.filter((x) => x !== action.payload)
          : state.buttonIds,
      };
    case EFriendRequestActions.FILTER_SEARCHABLE_USERS:
      const regex = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredSearchableUsers: state.searchableUsers.filter(
          (user) => user.email.match(regex) || user.name.match(regex)
        ),
        isFiltered: true,
      };
    case EFriendRequestActions.CLEAR_FILTERED_SEARCHABLE_USERS:
      return {
        ...state,
        filteredSearchableUsers: [],
        isFiltered: false,
      };
    default:
      return state;
  }
};

export default requestReducer;
