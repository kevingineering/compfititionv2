import { Dispatch } from 'redux';
import {
  AlertDispatchTypes,
  SET_ALERT,
  CLEAR_ALERT,
  REMOVE_ALERT,
} from './types';

export const createAlertActions = (
  message?: string,
  persist = false
): { alertAction: AlertDispatchTypes; clearAction: AlertDispatchTypes } => {
  const timestamp = new Date().getTime();
  return {
    alertAction: { type: SET_ALERT, payload: { message, timestamp, persist } },
    clearAction: { type: REMOVE_ALERT, payload: timestamp },
  };
};

//alert times out after three seconds
export const SetAlert = (message?: string, persist = false) => (
  dispatch: Dispatch<AlertDispatchTypes>
) => {
  let actions = createAlertActions(message, persist);
  dispatch(actions.alertAction);
  setTimeout(() => dispatch(actions.clearAction), 3000);
};

export const ClearAlert = () => (dispatch: Dispatch<AlertDispatchTypes>) => {
  dispatch({ type: CLEAR_ALERT });
};
