import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { LogoutUser } from '../../redux/user/actions';
import { toggleNightTheme } from '../../util/toggleNightTheme';
import { Button } from '../styledComponents/Button';
import styled from 'styled-components';

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
      <ThemeButton onClick={handleToggle}>
        <i className={isNightTheme ? 'fas fa-sun' : 'fas fa-moon'} />
      </ThemeButton>
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
          <LogOutMessage>Log Out </LogOutMessage>
          <i className='fas fa-sign-out-alt' />
        </a>
      </li>
    </React.Fragment>
  );

  return (
    <NavbarContainer>
      <h1>
        <Link to='/'>
          <i className='fas fa-medal' /> Compfitition
        </Link>
      </h1>
      <ul>
        {themeToggle}
        {userState.isAuthenticated && links}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.5rem;
  z-index: 1;
  width: 100%;
  margin-bottom: 1rem;
  background: var(--primary-color);
  color: var(--secondary-color);
  ul,
  li {
    display: flex;
  }
  a,
  p {
    color: var(--secondary-color);
    padding: 0.4rem;
    margin: auto;
  }

  @media (max-width: 32rem) {
    display: block;
    text-align: center;
    padding: 0.4rem 0 0.2rem 0;
    h1 {
      margin-bottom: 0rem;
    }
    ul {
      text-align: center;
      justify-content: center;
    }
  }
`;

const ThemeButton = styled(Button)`
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 0 0.7rem;
  float: right;
  white-space: nowrap;
  margin: auto 0;
  vertical-align: middle;
  line-height: normal;
`;

const LogOutMessage = styled.span`
  color: var(--secondary-color);
  @media (max-width: 32rem) {
    display: none;
  }
`;
