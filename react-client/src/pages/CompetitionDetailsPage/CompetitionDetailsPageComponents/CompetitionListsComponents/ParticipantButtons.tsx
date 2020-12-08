import React, { useState } from 'react';
import { Button } from '../../../../sharedComponents/styledComponents/Button';
import styled from 'styled-components';

interface IProps {
  // compId: string;
  setUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParticipantButtons: React.FC<IProps> = ({ setUserToggle }) => {
  const [deleteToggle, setDeleteToggle] = useState(false);

  // const { kickUserFromCompetition } = useContext(CompetitionContext)

  // const { addLetter, deleteLetter } = useContext(LetterContext)

  const handleDeleteLetter = () => {
    // setUserToggle(false)
    // deleteLetter(letter._id)
  };

  const handleSendLetter = () => {
    // setUserToggle(false)
    // const fields = {
    //   type: 'LetterAdmin',
    //   compId: compId,
    //   compName: compName,
    //   userId: userId,
    // }
    // addLetter(fields)
  };

  //TODO
  let letter = false;

  let buttons = letter ? (
    <React.Fragment>
      <ParticipantButtonLeft onClick={handleDeleteLetter}>
        Delete Admin Request
      </ParticipantButtonLeft>
      <ParticipantButtonRight onClick={() => setDeleteToggle(true)}>
        Kick User
      </ParticipantButtonRight>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <ParticipantButtonLeft onClick={handleSendLetter}>
        Make Admin
      </ParticipantButtonLeft>
      <ParticipantButtonRight onClick={() => setDeleteToggle(true)}>
        Kick User
      </ParticipantButtonRight>
    </React.Fragment>
  );

  if (deleteToggle) {
    buttons = (
      <ParticipantContainer>
        <ParticipantMessage>
          Are you sure you want to kick this user? This action cannot be undone.
        </ParticipantMessage>
        <ParticipantButtonLeft onClick={() => setDeleteToggle(false)}>
          No
        </ParticipantButtonLeft>
        <ParticipantButtonRight
          onClick={() => {
            setDeleteToggle(false);
            // kickUserFromCompetition(compId, userId)
          }}
        >
          Yes
        </ParticipantButtonRight>
      </ParticipantContainer>
    );
  }

  return <React.Fragment>{buttons}</React.Fragment>;
};

export default ParticipantButtons;

const ParticipantButtonLeft = styled(Button)`
  background: var(--primary-color);
  color: var(--secondary-color);
  width: 50%;
  padding: 0.4rem 0;
`;

const ParticipantButtonRight = styled(Button)`
  background: var(--danger-color);
  color: var(--secondary-color);
  width: 50%;
  padding: 0.4rem 0;
`;

const ParticipantContainer = styled.div`
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
`;

const ParticipantMessage = styled.p`
  padding-left: 0.5rem;
  line-height: 1.8rem;
`;
