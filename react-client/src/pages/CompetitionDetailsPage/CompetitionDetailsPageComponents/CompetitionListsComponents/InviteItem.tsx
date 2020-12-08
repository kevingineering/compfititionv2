import React from 'react';
import { TDifferentUser } from '../../../../types';
import styled from 'styled-components';

interface IProps {
  user: TDifferentUser;
  isLast: boolean;
  isInvitePending: boolean;
}

const InviteItem: React.FC<IProps> = ({ user, isLast, isInvitePending }) => {
  const handleSendInvite = () => {};

  const handleDeleteInvite = () => {};

  let name = user.name;

  let row = (
    <React.Fragment>
      <span>{name}</span>
      {isInvitePending ? (
        <InviteButton onClick={handleDeleteInvite} isDanger={true}>
          <i className='fas fa-times' />
        </InviteButton>
      ) : (
        <InviteButton onClick={handleSendInvite} isDanger={false}>
          <i className='fas fa-plus' />
        </InviteButton>
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

const InviteButton = styled.button<{ isDanger: boolean }>`
  background: var(--secondary-color);
  color: ${(props) =>
    props.isDanger ? 'var(--danger-color);' : 'var(--primary-color);'}
  width: 2rem;
  border: none;
`;
