import React from 'react';
import FriendItem from './FriendItem';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';

interface IProps {
  isOwner: boolean;
}

const FriendList: React.FC<IProps> = ({ isOwner }) => {
  const friendState = useSelector((state: RootStore) => state.friendState);

  const results = friendState.isFiltered
    ? friendState.filteredFriends
    : isOwner
    ? friendState.friends
    : friendState.friend!.friends;

  const message = friendState.isFiltered
    ? 'No users match your search.'
    : isOwner
    ? "You don't have any friends yet, add one below!"
    : "You are this user's only visible friend.";

  const friends =
    results.length === 0 ? (
      <span className='empty-collection'>{message}</span>
    ) : (
      results.map((friend) => (
        <FriendItem key={friend.id} friend={friend}></FriendItem>
      ))
    );

  return (
    <div>
      {friendState.loadingButton === NO_BUTTON ? (
        <LoadingSpinner hasContainer={true} />
      ) : (
        <React.Fragment>{friends}</React.Fragment>
      )}
    </div>
  );
};

export default FriendList;
