import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/misc/LoadingSpinner';
import { EmptyCollection } from '../../../sharedComponents/styledComponents/Misc';
import DifferentUserItem from '../../../sharedComponents/misc/DifferentUserItem';
import { NO_BUTTON } from '../../../redux/buttonTypes';

interface IProps {
  isOwner: boolean;
}

const FriendList: React.FC<IProps> = ({ isOwner }) => {
  const friendState = useSelector((state: RootStore) => state.friendState);
  const userState = useSelector((state: RootStore) => state.userState);

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
      <EmptyCollection>{message}</EmptyCollection>
    ) : (
      results.map((friend, index) => (
        <DifferentUserItem
          key={index}
          user={friend}
          isLink={true}
          hasButton={false}
        />
      ))
    );

  return (
    <div>
      {userState.loadingButton === NO_BUTTON ? (
        <LoadingSpinner hasContainer={true} />
      ) : (
        <React.Fragment>{friends}</React.Fragment>
      )}
    </div>
  );
};

export default FriendList;
