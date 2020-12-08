import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import styled from 'styled-components';

//displays message at top of page when user performs specific actions or when error occurs
const Alert = () => {
  const alert = useSelector((state: RootStore) => state.alertState.message);
  return alert === undefined ? null : (
    <AlertPlaceholder>
      <i className='fas fa-exclamation-circle' />
      {' ' + alert}
    </AlertPlaceholder>
  );
};

export default Alert;

const AlertPlaceholder = styled.div`
  min-height: 2.5rem;
  position: fixed;
  top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--primary-color);
  color: var(--secondary-color);
  i {
    margin-right: 0.5rem;
  }
  @media (max-width: 32rem) {
    top: 6rem;
  }
`;
