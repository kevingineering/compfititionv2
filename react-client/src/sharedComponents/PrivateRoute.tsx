import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
  component: React.ComponentType<any>;
}

//Checks if user is authenticated, if not, redirects to auth page
//https://stackoverflow.com/questions/53104165/implement-react-router-privateroute-in-typescript-project
const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const userState = useSelector((state: RootStore) => state.userState);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userState.isAuthenticated && !localStorage.token ? (
          <Redirect to='/auth' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
