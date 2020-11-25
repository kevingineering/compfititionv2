import React from 'react';

interface IProps {
  message: string;
  handleClick: (event?: any) => void;
  //isLoading shows loading spinner
  isLoading?: boolean;
  isDisabled?: boolean;
  //input button as compared to button button
  isInput?: boolean;
  //for styling
  isInline?: boolean;
  //to add classes
  className?: string;
}

//for displaying loading spinner and disabling buttons with async actions
const LoadingButton: React.FC<IProps> = ({
  message,
  handleClick,
  isLoading = false,
  isDisabled = false,
  isInput = true,
  isInline = false,
  className = '',
}) => {
  let classes = className;
  if (isLoading) {
    // transparent class hides text so only loading spinner shows
    classes += ' transparent';
  }
  if (isDisabled || isLoading) {
    classes += ' disabled';
  }

  return (
    <div className={isInline ? 'relative inline' : 'relative'}>
      {isLoading && <div className='spinner-input'></div>}
      {isInput ? (
        <input
          type='submit'
          value={message}
          disabled={isDisabled || isLoading}
          className={classes}
          onClick={handleClick}
        />
      ) : (
        <button
          className={classes}
          disabled={isDisabled || isLoading}
          onClick={handleClick}
        >
          {message}
        </button>
      )}
    </div>
  );
};

export default LoadingButton;
