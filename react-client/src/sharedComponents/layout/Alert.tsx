import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';

//displays message at top of page when user performs specific actions or when error occurs
const Alert = () => {
  const alert = useSelector((state: RootStore) => state.alertState.message);
  return (
    <div
      className='alert-placeholder'
      style={alert === undefined ? { zIndex: -1 } : { zIndex: 1 }}
    >
      {alert !== undefined && (
        <div className='alert alert-primary'>
          <i className='fas fa-exclamation-circle margin-right-05' />
          {' ' + alert}
        </div>
      )}
    </div>
  );
};

export default Alert;
