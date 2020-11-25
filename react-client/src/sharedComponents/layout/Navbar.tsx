import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { LogoutUser } from '../../redux/user/actions';
import { toggleNightTheme } from '../../util/toggleNightTheme';

const Navbar = () => {
  const [isNightTheme, setIsNightTheme] = useState(false);

  const userState = useSelector((state: RootStore) => state.userState);
  const dispatch = useDispatch();

  const handleToggle = () => {
    toggleNightTheme(!isNightTheme);
    setIsNightTheme((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  //day / night theme
  let themeToggle = (
    <li>
      <button
        className='btn btn-primary right theme-button'
        onClick={handleToggle}
      >
        <i className={isNightTheme ? 'fas fa-sun' : 'fas fa-moon'} />
      </button>
    </li>
  );

  //logged in links
  let links = userState.isAuthenticated && (
    <React.Fragment>
      <li>
        <p>
          Hello<Link to='/user'>{userState.user!.name}!</Link>
        </p>
      </li>
      <li>
        <a href='#!' onClick={handleLogout}>
          <span className='hide-sm text-secondary'>Log Out </span>
          <i className='fas fa-sign-out-alt'></i>
        </a>
      </li>
    </React.Fragment>
  );

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className='fas fa-medal' /> Compfitition
        </Link>
      </h1>
      <ul>
        {themeToggle}
        {userState.isAuthenticated && links}
      </ul>
    </nav>
  );
};

export default Navbar;
