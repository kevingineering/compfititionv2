import React from 'react';
import { TDifferentUser } from '../../../../types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  AddInvitation,
  DeleteInvitation,
} from '../../../../redux/aggregateCompetition/invitation/actions';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import {
  InvitationButtonDelete,
  InvitationButtonSend,
} from '../../../../sharedComponents/styledComponents/Button';
import {
  ADMIN_ADD_INVITATION_BUTTON,
  ADMIN_DELETE_INVITATION_BUTTON,
} from '../../../../redux/buttonTypes';

interface IProps {
  user: TDifferentUser;
  competitionId: string;
  isInvitationPending: boolean;
  buttonIds: string[];
}

const InvitationItem: React.FC<IProps> = ({
  user,
  competitionId,
  isInvitationPending,
  buttonIds,
}) => {
  const dispatch = useDispatch();

  const handleSendInvitation = () => {
    dispatch(AddInvitation(user.userId, competitionId));
  };

  const handleDeleteInvitation = () => {
    dispatch(DeleteInvitation(user.userId, competitionId));
  };

  let name = user.name;

  let row = (
    <React.Fragment>
      <span>{name}</span>
      {isInvitationPending ? (
        <LoadingButton
          styles={InvitationButtonDelete}
          handleClick={handleDeleteInvitation}
          isLoading={
            buttonIds.indexOf(ADMIN_DELETE_INVITATION_BUTTON + user.userId) !==
            -1
          }
          message='Delete'
          isFlex={false}
        />
      ) : (
        <LoadingButton
          styles={InvitationButtonSend}
          handleClick={handleSendInvitation}
          isLoading={
            buttonIds.indexOf(ADMIN_ADD_INVITATION_BUTTON + user.userId) !== -1
          }
          message='Send'
          isFlex={false}
        />
      )}
    </React.Fragment>
  );

  return <InvitationItemContainer>{row}</InvitationItemContainer>;
};

export default InvitationItem;

const InvitationItemContainer = styled.div`
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
