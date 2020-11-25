import React, { useState, useEffect } from 'react';
import LoadingButton from './forms/LoadingButton';

interface IProps {
  handleClick: () => void;
  isLoading: boolean;
  topButton: string;
  leftButton?: string;
  rightButton?: string;
  //changes styling - standalone button as compared to button in list
  isStandalone?: boolean;
}

//When user clicks first button, a warning and Yes and No buttons are displayed
const ToggleButtonModule: React.FC<IProps> = ({
  children,
  handleClick,
  isLoading,
  topButton,
  leftButton = 'No',
  rightButton = 'Yes',
  isStandalone = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading === false) {
      setIsOpen(false);
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      {(!isOpen || isStandalone) && (
        <React.Fragment>
          {!isStandalone && <p className='lr-border' />}
          <button
            className={`btn btn-block btn-primary ${isStandalone ? 'h3' : ''}`}
            onClick={() => setIsOpen(true)}
          >
            {topButton}
          </button>
        </React.Fragment>
      )}
      {isOpen && (
        <React.Fragment>
          {children}
          <LoadingButton
            className='btn btn-primary btn-split'
            handleClick={() => setIsOpen(false)}
            message={leftButton}
            isDisabled={isLoading}
            isInput={false}
            isInline={true}
          />
          <LoadingButton
            isLoading={isLoading}
            isInput={false}
            className='btn btn-danger btn-split'
            handleClick={handleClick}
            message={rightButton}
            isInline={true}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ToggleButtonModule;
