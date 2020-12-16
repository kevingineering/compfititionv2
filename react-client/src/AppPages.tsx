import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './sharedComponents/PrivateRoute';
import styled from 'styled-components';

import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import FriendRequestsPage from './pages/FriendRequestsPage/FriendRequestsPage';
import AddGoalPage from './pages/AddGoalPage/AddGoalPage';
import UpdateGoalPage from './pages/UpdateGoalPage/UpdateGoalPage';
import GoalDetailsPage from './pages/GoalDetailsPage/GoalDetailsPage';
import AddCompetitionPage from './pages/AddCompetitionPage/AddCompetitionPage';
import UpdateCompetitionPage from './pages/UpdateCompetitionPage/UpdateCompetitionPage';
import CompetitionDetailsPage from './pages/CompetitionDetailsPage/CompetitionDetailsPage';
import FriendPage from './pages/FriendPage/FriendPage';
import FriendGoalPage from './pages/FriendGoalPage/FriendGoalPage';
import NotFoundPage from './pages/NotFoundPage';

const AppPages = () => {
  return (
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
        <PrivateRoute exact path='/goal/:goalId' component={GoalDetailsPage} />
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
  );
};

export default AppPages;

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
