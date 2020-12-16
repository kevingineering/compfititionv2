import React, { useState, useEffect } from 'react';
import { TParticipant } from '../../../../types';
import ParticipantButtons from './ParticipantButtons';
import styled from 'styled-components';

interface IProps {
  participant: TParticipant;
  isAdmin: boolean;
  //for styling bottom border
  isLast: boolean;
  hasAdminRequest: boolean;
  competitionId: string;
  buttonIds: string[];
}

const ParticipantItem: React.FC<IProps> = ({
  participant,
  isAdmin,
  hasAdminRequest,
  competitionId,
  buttonIds,
}) => {
  const [userToggle, setUserToggle] = useState(false);
  let name = participant.name;

  //closes toggle after request is sent
  useEffect(() => {
    if (isAdmin || hasAdminRequest) {
      setUserToggle(false);
    }
  }, [isAdmin, hasAdminRequest]);

  let row = isAdmin ? (
    <p>{name + ' (admin)'}</p>
  ) : hasAdminRequest ? (
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
      {userToggle && (
        <ParticipantButtons
          // setUserToggle={setUserToggle}
          userId={participant.userId}
          competitionId={competitionId}
          buttonIds={buttonIds}
        />
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
