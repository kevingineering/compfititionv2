import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteFriend } from '../../../redux/friendship/actions';
import ToggleButtonModule from '../../../sharedComponents/misc/ToggleButtonModule';
import { MessageInBorderedSpace } from '../../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

interface IProps {
  friendId: string;
  isLoading: boolean;
}

const DeleteFriendModule: React.FC<IProps> = ({ friendId, isLoading }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(DeleteFriend(friendId));
  };

  return (
    <DeleteFriendContainer>
      <ToggleButtonModule
        handleClick={handleDelete}
        topButton='Delete Friend'
        isLoading={isLoading}
        isStandalone={true}
      >
        <MessageInBorderedSpace>
          Are you sure you want to delete this friendship? Deletions cannot be
          undone.
        </MessageInBorderedSpace>
      </ToggleButtonModule>
    </DeleteFriendContainer>
  );
};

export default DeleteFriendModule;

const DeleteFriendContainer = styled.div`
  max-width: 16rem;
  margin: auto;
`;
