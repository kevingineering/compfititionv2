import React from 'react';

interface IProps {
  //hasContainer adds box around loading spinner that matches typical project container
  hasContainer?: boolean;
}

const LoadingSpinner: React.FC<IProps> = ({ hasContainer = false }) => {
  return hasContainer ? (
    <div className='spinner-container'>
      <div className='spinner' />
    </div>
  ) : (
    <div className='spinner' />
  );
};

export default LoadingSpinner;
