import { AlertDispatchTypes, EAlertActions } from './types';

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
    case EAlertActions.SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        timestamp: action.payload.timestamp,
        persist: action.payload.persist,
      };
    case EAlertActions.CLEAR_ALERT:
      if (!state.persist)
        return {
          ...state,
          message: undefined,
          timestamp: undefined,
          persist: false,
        };
      else return state;
    case EAlertActions.REMOVE_ALERT:
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
