import React from 'react';
import { TDifferentUser } from '../../../../types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AddInvite, DeleteInvite } from '../../../../redux/competition/actions';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import {
  InviteButtonDelete,
  InviteButtonSend,
} from '../../../../sharedComponents/styledComponents/Button';
import {
  ADMIN_ADD_INVITE_BUTTON,
  ADMIN_DELETE_INVITE_BUTTON,
} from '../../../../redux/buttonTypes';

interface IProps {
  user: TDifferentUser;
  competitionId: string;
  isInvitePending: boolean;
  buttonIds: string[];
}

const InviteItem: React.FC<IProps> = ({
  user,
  competitionId,
  isInvitePending,
  buttonIds,
}) => {
  const dispatch = useDispatch();

  const handleSendInvite = () => {
    dispatch(AddInvite(user.userId, competitionId));
  };

  const handleDeleteInvite = () => {
    dispatch(DeleteInvite(user.userId, competitionId));
  };

  let name = user.name;

  let row = (
    <React.Fragment>
      <span>{name}</span>
      {isInvitePending ? (
        <LoadingButton
          styles={InviteButtonDelete}
          handleClick={handleDeleteInvite}
          isLoading={
            buttonIds.indexOf(ADMIN_DELETE_INVITE_BUTTON + user.userId) !== -1
          }
          message='Delete'
          isFlex={false}
        />
      ) : (
        <LoadingButton
          styles={InviteButtonSend}
          handleClick={handleSendInvite}
          isLoading={
            buttonIds.indexOf(ADMIN_ADD_INVITE_BUTTON + user.userId) !== -1
          }
          message='Send'
          isFlex={false}
        />
      )}
    </React.Fragment>
  );

  return <InviteItemContainer>{row}</InviteItemContainer>;
};

export default InviteItem;

const InviteItemContainer = styled.div`
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
