import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './sharedComponents/layout/Navbar';
import Alert from './sharedComponents/layout/Alert';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import FriendRequestsPage from './pages/FriendRequestsPage/FriendRequestsPage';
import GoalDetailsPage from './pages/GoalDetailsPage/GoalDetailsPage';
import AddCompetitionPage from './pages/AddCompetitionPage/AddCompetitionPage';
import CompetitionDetailsPage from './pages/CompetitionDetailsPage/CompetitionDetailsPage';
import FriendPage from './pages/FriendPage/FriendPage';
import FriendGoalPage from './pages/FriendGoalPage/FriendGoalPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './sharedComponents/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from './redux/user/actions';
import AuthPage from './pages/AuthPage/AuthPage';
import setAuthToken from './util/setAuthToken';
import { RootStore } from './redux/Store';
import LoadingSpinner from './sharedComponents/LoadingSpinner';
import AddGoalPage from './pages/AddGoalPage/AddGoalPage';
import UpdateGoalPage from './pages/UpdateGoalPage/UpdateGoalPage';
import UpdateCompetitionPage from './pages/UpdateCompetitionPage/UpdateCompetitionPage';

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
    <div className='spinner-page'>
      <LoadingSpinner />
    </div>
  ) : (
    <Router>
      <Navbar />
      <Alert />
      <div className='body-container'>
        <Switch>
          <Route exact path='/auth' component={AuthPage} />
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/user' component={UserPage} />
          <PrivateRoute
            exact
            path='/friendrequests'
            component={FriendRequestsPage}
          />
          <PrivateRoute exact path='/addgoal' component={AddGoalPage} />
          <PrivateRoute exact path='/updategoal' component={UpdateGoalPage} />
          <PrivateRoute
            exact
            path='/goal/:goalId'
            component={GoalDetailsPage}
          />
          <PrivateRoute
            exact
            path='/addcompetition'
            component={AddCompetitionPage}
          />
          <PrivateRoute
            exact
            path='/updatecompetition'
            component={UpdateCompetitionPage}
          />
          <PrivateRoute
            exact
            path='/competition/:competitionId'
            component={CompetitionDetailsPage}
          />
          <PrivateRoute exact path='/friend/:friendId' component={FriendPage} />
          <PrivateRoute
            exact
            path='/friend/goal/:goalId'
            component={FriendGoalPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
