import React from 'react';
import styled from 'styled-components';

interface IProps {
  message: string;
  handleClick: (event?: any) => void;
  //isLoading shows loading spinner
  isLoading?: boolean;
  isDisabled?: boolean;
  //for styling
  isInline?: boolean;
  isFlex?: boolean;
  styles?: string;
}

//for displaying loading spinner and disabling buttons with async actions
const LoadingButton: React.FC<IProps> = ({
  message,
  handleClick,
  isLoading = false,
  isDisabled = false,
  isInline = false,
  isFlex = true,
  styles = '',
}) => {
  return (
    <LoadingButtonContainer isInline={isInline} isFlex={isFlex}>
      {isLoading && <InputSpinner />}
      <LoadingButtonButton
        styles={styles}
        isLoading={isLoading}
        isDisabled={isDisabled || isLoading}
        disabled={isDisabled || isLoading}
        onClick={handleClick}
      >
        {message}
      </LoadingButtonButton>
    </LoadingButtonContainer>
  );
};

export default LoadingButton;

const InputSpinner = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 1;
  :after {
    content: ' ';
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.15rem solid var(--secondary-color);
    border-color: var(--secondary-color) transparent var(--secondary-color)
      transparent;
    animation: spinner 3s linear infinite;
  }
`;

const LoadingButtonContainer = styled.div<{
  isInline: boolean;
  isFlex: boolean;
}>`
  position: relative;
  ${(props) => props.isFlex && 'flex: 1;'}
  ${(props) => props.isInline && 'display: inline;'}
`;

const LoadingButtonButton = styled.button<{
  isLoading: boolean;
  isDisabled: boolean;
  styles: string;
}>`
  font: inherit;
  display: block;
  width: 100%;
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  ${(props) => props.styles}
  ${(props) => props.isLoading && 'color: transparent;'}
  ${(props) =>
    props.isDisabled && 'opacity: 0.6; cursor: default'}
`;
