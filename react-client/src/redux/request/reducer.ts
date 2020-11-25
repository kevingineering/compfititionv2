import {
  RequestDispatchTypes,
  FILTER_SEARCHABLE_USERS,
  CLEAR_FILTERED_SEARCHABLE_USERS,
} from './types';
import {
  REQUEST_LOADING,
  GET_REQUESTS_AND_SEARCHABLE_USERS,
  ADD_REQUEST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  DELETE_REQUEST,
  REQUEST_ERROR,
} from './types';
import { makeSimpleRegex } from '../../util/makeRegex';
import { NOT_LOADING } from '../buttonTypes';
import { TDifferentUser } from '../../types';

export interface IRequestState {
  loadingButton: string;
  receivedRequests: TDifferentUser[];
  sentRequests: TDifferentUser[];
  searchableUsers: TDifferentUser[];
  filteredSearchableUsers: TDifferentUser[];
  isFiltered: boolean;
  buttonIds: string[];
}

const requestState: IRequestState = {
  loadingButton: NOT_LOADING,
  receivedRequests: [],
  sentRequests: [],
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
    case REQUEST_LOADING:
      let ids = state.buttonIds;
      if (action.payload.id !== undefined) {
        ids.push(action.payload.type + action.payload.id);
      }
      return {
        ...state,
        loadingButton: action.payload.type,
        buttonIds: ids,
      };
    case GET_REQUESTS_AND_SEARCHABLE_USERS:
      return {
        ...state,
        receivedRequests: action.payload.receivedRequestUsers,
        sentRequests: action.payload.sentRequestUsers,
        searchableUsers: action.payload.searchableUsers,
        loadingButton: NOT_LOADING,
      };
    case ADD_REQUEST:
      return {
        ...state,
        sentRequests: [...state.sentRequests, action.payload],
        searchableUsers: state.searchableUsers.filter(
          (x) => x.id !== action.payload.id
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload.id
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case DELETE_REQUEST:
      return {
        ...state,
        searchableUsers: [
          ...state.searchableUsers,
          ...state.sentRequests.filter((req) => req.id === action.payload),
        ],
        sentRequests: state.sentRequests.filter(
          (req) => req.id !== action.payload
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        receivedRequests: state.receivedRequests.filter(
          (req) => req.id !== action.payload
        ),
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case REJECT_REQUEST:
      return {
        ...state,
        receivedRequests: state.receivedRequests.filter(
          (req) => req.id !== action.payload
        ),
        searchableUsers: [
          ...state.searchableUsers,
          ...state.receivedRequests.filter((req) => req.id === action.payload),
        ],
        buttonIds: state.buttonIds.filter(
          (x) => x !== action.type + '_BUTTON' + action.payload
        ),
        loadingButton:
          state.buttonIds.length === 0 ? NOT_LOADING : state.loadingButton,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        loadingButton: NOT_LOADING,
        buttonIds: action.payload
          ? state.buttonIds.filter((x) => x !== action.payload)
          : state.buttonIds,
      };
    case FILTER_SEARCHABLE_USERS:
      const regex = makeSimpleRegex(action.payload);
      return {
        ...state,
        filteredSearchableUsers: state.searchableUsers.filter(
          (user) => user.email.match(regex) || user.name.match(regex)
        ),
        isFiltered: true,
      };
    case CLEAR_FILTERED_SEARCHABLE_USERS:
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
