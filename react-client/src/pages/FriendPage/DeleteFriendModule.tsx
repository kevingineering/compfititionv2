import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteFriend } from '../../redux/friend/actions';
import ToggleButtonModule from '../../sharedComponents/ToggleButtonModule';

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
    <div className='width-16rem'>
      <ToggleButtonModule
        handleClick={handleDelete}
        topButton='Delete Friend'
        isLoading={isLoading}
        isStandalone={true}
      >
        <span className='alert lr-border'>
          Are you sure you want to delete this competition? Deletions cannot be
          undone.
        </span>
      </ToggleButtonModule>
    </div>
  );
};

export default DeleteFriendModule;
