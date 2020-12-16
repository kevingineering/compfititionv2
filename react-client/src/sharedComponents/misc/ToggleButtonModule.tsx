import React, { useState, useEffect } from 'react';
import {
  ButtonSplitPrimary,
  ButtonSplitDanger,
  Button,
  ButtonSplitGray,
} from '../styledComponents/Button';
import { EmptyBorderedSpace, FlexContainer } from '../styledComponents/Misc';
import LoadingButton from '../forms/LoadingButton';
import styled from 'styled-components';

interface IProps {
  handleClick: () => void;
  isLoading: boolean;
  topButton: string;
  leftButton?: string;
  rightButton?: string;
  //changes styling - standalone button as compared to button in list
  isStandalone?: boolean;
  isDanger?: boolean;
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
  isDanger = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  //close after button clicked and resovled
  useEffect(() => {
    if (isLoading === false) {
      setIsOpen(false);
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      {(!isOpen || isStandalone) && (
        <React.Fragment>
          {!isStandalone && <EmptyBorderedSpace />}
          <TopButton
            isStandalone={isStandalone}
            onClick={() => setIsOpen(true)}
          >
            {topButton}
          </TopButton>
        </React.Fragment>
      )}
      {isOpen && (
        <React.Fragment>
          {children}
          <FlexContainer>
            <LoadingButton
              styles={isDanger ? ButtonSplitPrimary : ButtonSplitGray}
              handleClick={() => setIsOpen(false)}
              message={leftButton}
              isDisabled={isLoading}
              isInline={true}
            />
            <LoadingButton
              styles={isDanger ? ButtonSplitDanger : ButtonSplitPrimary}
              isLoading={isLoading}
              handleClick={handleClick}
              message={rightButton}
              isInline={true}
            />
          </FlexContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ToggleButtonModule;

const TopButton = styled(Button)<{ isStandalone: boolean }>`
  background: var(--primary-color);
  color: var(--secondary-color);
  display: block;
  width: 100%;
  ${(props) => props.isStandalone && 'font-size: 1.17em; font-weight: bold;'}
`;
