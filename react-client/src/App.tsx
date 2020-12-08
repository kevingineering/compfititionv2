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
import LoadingSpinner from './sharedComponents/misc/LoadingSpinner';
import AddGoalPage from './pages/AddGoalPage/AddGoalPage';
import UpdateGoalPage from './pages/UpdateGoalPage/UpdateGoalPage';
import UpdateCompetitionPage from './pages/UpdateCompetitionPage/UpdateCompetitionPage';
import styled from 'styled-components';

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
      <AppContainer>
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
      </AppContainer>
    </Router>
  );
};

export default App;

const AppContainer = styled.div`
  max-width: 70rem;
  margin: auto;
  overflow: hidden;
  padding: 0 3rem 3rem 3rem;
  margin-top: 8.5rem;
  @media (max-width: 32rem) {
    margin-top: 9.5rem;
  }
`;
