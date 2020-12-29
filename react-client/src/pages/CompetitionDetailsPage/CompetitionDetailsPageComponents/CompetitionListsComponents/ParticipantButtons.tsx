import React, { useState } from 'react';
import {
  Button,
  ButtonSplitPrimary,
  ButtonSplitDanger,
} from '../../../../sharedComponents/styledComponents/Button';
import styled from 'styled-components';
import { KickUserFromCompetition } from '../../../../redux/aggregateCompetition/participant/actions';
import { AddAdminRequest } from '../../../../redux/aggregateCompetition/adminRequest/actions';
import { useDispatch } from 'react-redux';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import {
  ADMIN_ADD_ADMIN_REQUEST_BUTTON,
  ADMIN_KICK_USER_FROM_COMPETITION_BUTTON,
} from '../../../../redux/buttonTypes';
import { FlexContainer } from '../../../../sharedComponents/styledComponents/Misc';

interface IProps {
  // setUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
  buttonIds: string[];
  userId: string;
  competitionId: string;
}

const ParticipantButtons: React.FC<IProps> = ({
  userId,
  competitionId,
  buttonIds,
}) => {
  const dispatch = useDispatch();

  const [deleteToggle, setDeleteToggle] = useState(false);
  const [adminToggle, setAdminToggle] = useState(false);

  const handleRequestAdmin = () => {
    dispatch(AddAdminRequest(userId, competitionId));
  };

  const handleKickUser = () => {
    dispatch(KickUserFromCompetition(userId, competitionId));
  };

  var adminLoading =
    buttonIds.findIndex(
      (x) => x === ADMIN_ADD_ADMIN_REQUEST_BUTTON + userId
    ) !== -1;

  var kickLoading =
    buttonIds.findIndex(
      (x) => x === ADMIN_KICK_USER_FROM_COMPETITION_BUTTON + userId
    ) !== -1;

  let buttons = (
    <ParticipantButtonContainer>
      <ParticipantButtonLeft onClick={() => setAdminToggle(true)}>
        Make Admin
      </ParticipantButtonLeft>
      <ParticipantButtonRight onClick={() => setDeleteToggle(true)}>
        Kick User
      </ParticipantButtonRight>
    </ParticipantButtonContainer>
  );

  if (deleteToggle) {
    buttons = (
      <ParticipantToggleContainer>
        <ParticipantMessage>
          Are you sure you want to kick this user? This action cannot be undone.
        </ParticipantMessage>
        <FlexContainer>
          <LoadingButton
            handleClick={() => setDeleteToggle(false)}
            message='No'
            styles={ButtonSplitPrimary}
            isDisabled={kickLoading}
          />
          <LoadingButton
            handleClick={handleKickUser}
            message='Yes'
            styles={ButtonSplitDanger}
            isLoading={kickLoading}
          />
        </FlexContainer>
      </ParticipantToggleContainer>
    );
  }

  if (adminToggle) {
    buttons = (
      <ParticipantToggleContainer>
        <ParticipantMessage>
          Are you sure? Admins can modify and delete competitions, invite or
          kick users, and promote other users to admin.
        </ParticipantMessage>
        <FlexContainer>
          <LoadingButton
            handleClick={() => setAdminToggle(false)}
            message='No'
            styles={ButtonSplitPrimary}
            isDisabled={adminLoading}
          />
          <LoadingButton
            handleClick={handleRequestAdmin}
            message='Yes'
            styles={ButtonSplitDanger}
            isLoading={adminLoading}
          />
        </FlexContainer>
      </ParticipantToggleContainer>
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

const ParticipantToggleContainer = styled.div`
  margin: 0;
  min-height: 0.5rem;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
`;

const ParticipantMessage = styled.p`
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  margin: 0;
  min-height: 0.5rem;
`;

const ParticipantButtonContainer = styled.div`
  display: flex;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
`;
