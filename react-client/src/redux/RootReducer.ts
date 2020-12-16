import { combineReducers, AnyAction } from 'redux';
import userReducer from './user/reducer';
import goalReducer from './goal/reducer';
import competitionReducer from './competition/reducer';
import alertReducer from './alert/reducer';
import requestReducer from './friendRequest/reducer';
import friendReducer from './friendship/reducer';
import axios from 'axios';
import { createAlertActions } from './alert/actions';
import Store from './Store';

//TODO - remove debugging delay
axios.interceptors.request.use(async (req) => {
  // console.log(`${req.method} ${req.url}`);
  await Promise.all([new Promise((resolve) => setTimeout(resolve, 2000))]);
  // console.log('delayed' + req.url);
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    //if 500 message, say so
    //else if message from backend, display it
    //else unexpected error
    let message =
      error && error.response
        ? error.response.status >= 500
          ? 'Server error'
          : error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred'
        : 'An unexpected error occurred';

    let actions = createAlertActions(message, false);
    Store.dispatch(actions.alertAction);
    setTimeout(() => Store.dispatch(actions.clearAction), 3000);
    throw error;
  }
);

//for requests sending data
axios.defaults.headers.common['Content-Type'] = 'application/json';

const CombinedReducer = combineReducers({
  userState: userReducer,
  alertState: alertReducer,
  goalState: goalReducer,
  competitionState: competitionReducer,
  requestState: requestReducer,
  friendState: friendReducer,
});

const RootReducer = (state: any, action: AnyAction) => {
  //resets all application state on logout
  if (action.type === 'LOGOUT' || action.type === 'DELETE_USER_SUCCESS') {
    state = undefined;
  }

  return CombinedReducer(state, action);
};

export default RootReducer;
