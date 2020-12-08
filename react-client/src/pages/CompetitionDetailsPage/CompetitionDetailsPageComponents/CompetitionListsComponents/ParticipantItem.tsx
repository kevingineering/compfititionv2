import React, { useState } from 'react';
import { TParticipant } from '../../../../types';
import ParticipantButtons from './ParticipantButtons';
import styled from 'styled-components';

interface IProps {
  participant: TParticipant;
  isAdmin: boolean;
  //for styling bottom border
  isLast: boolean;
  // compId: string;
}

//TODO - buttons for kick / admin

const ParticipantItem: React.FC<IProps> = ({
  participant,
  isAdmin,
  isLast,
}) => {
  const [userToggle, setUserToggle] = useState(false);
  let name = participant.name;
  //TODO
  let isAdminPending = false;

  let row = isAdmin ? (
    <p>{name + ' (admin)'}</p>
  ) : isAdminPending ? (
    <p>{name + ' (admin pending)'} </p>
  ) : (
    <React.Fragment>
      <span>{name}</span>
      <ToggleButton
        onClick={() => {
          setUserToggle((prevState) => !prevState);
        }}
      >
        <i className={userToggle ? 'fas fa-times' : 'fas fa-plus'} />
      </ToggleButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ParticipantItemContainer>{row}</ParticipantItemContainer>
      {userToggle ? (
        <ParticipantButtons
          // letter={letter}
          setUserToggle={setUserToggle}
        />
      ) : (
        isLast && <hr />
      )}
    </React.Fragment>
  );
};

export default ParticipantItem;

const ParticipantItemContainer = styled.div`
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
  padding-left: 0.5rem;
  line-height: 1.8rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ToggleButton = styled.button`
  background: var(--secondary-color);
  color: var(--primary-color);
  width: 2rem;
  border: none;
`;
