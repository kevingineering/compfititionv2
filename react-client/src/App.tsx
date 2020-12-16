import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './sharedComponents/layout/Navbar';
import Alert from './sharedComponents/layout/Alert';

import { RootStore } from './redux/Store';
import { GetUser } from './redux/user/actions';
import setAuthToken from './util/setAuthToken';
import LoadingSpinner from './sharedComponents/misc/LoadingSpinner';
import AppPages from './AppPages';

const App = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.userState);

  //Get user if token exists, otherwise redirect to /auth page (due to PrivateRoute)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      dispatch(GetUser());
    }
  }, [dispatch]);

  return !userState.isAuthenticated && localStorage.token ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <Router>
      <Navbar />
      <Alert />
      <AppPages />
    </Router>
  );
};

export default App;
