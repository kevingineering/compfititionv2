import React from 'react';
import styled from 'styled-components';

interface IProps {
  //hasContainer adds box around loading spinner that matches typical project container
  hasContainer?: boolean;
  //if container has border around it
  hasBorder?: boolean;
  isFullPage?: boolean;
}

const LoadingSpinner: React.FC<IProps> = ({
  hasContainer = false,
  hasBorder = true,
  isFullPage = false,
}) => {
  return hasContainer ? (
    <LoadingSpinnerContainer hasBorder={hasBorder}>
      <Spinner />
    </LoadingSpinnerContainer>
  ) : isFullPage ? (
    <LoadingSpinnerPage>
      <Spinner />
    </LoadingSpinnerPage>
  ) : (
    <Spinner />
  );
};

export default LoadingSpinner;

const LoadingSpinnerPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const LoadingSpinnerContainer = styled.div<{ hasBorder: boolean }>`
  padding: 3rem;
  ${(props) =>
    props.hasBorder &&
    `border: 0.125rem solid var(--primary-color);  border-top: none;`}
  position: relative;
  margin: auto;
`;

const Spinner = styled.div`
  display: block;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 5rem;
  height: 5rem;
  z-index: 1;
  &:after {
    content: ' ';
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 0.5rem solid var(--primary-color);
    border-color: var(--primary-color) transparent var(--primary-color)
      transparent;
    animation: spinner 3s linear infinite;
  }
`;
