import {
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_ALERT,
  AlertDispatchTypes,
} from './types';

interface IAlertState {
  message?: string;
  timestamp?: number;
  persist: boolean;
}

const alertState: IAlertState = {
  persist: false,
};

const alertReducer = (
  state: IAlertState = alertState,
  action: AlertDispatchTypes
) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        timestamp: action.payload.timestamp,
        persist: action.payload.persist,
      };
    case CLEAR_ALERT:
      if (!state.persist)
        return {
          ...state,
          message: undefined,
          timestamp: undefined,
          persist: false,
        };
      else return state;
    case REMOVE_ALERT:
      if (state.timestamp === action.payload)
        return {
          ...state,
          message: undefined,
          timestamp: undefined,
          persist: false,
        };
      else return state;
    default:
      return state;
  }
};

export default alertReducer;
