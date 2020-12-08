import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/misc/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';
import { EmptyCollection } from '../../../sharedComponents/styledComponents/Misc';
import OtherUserItem from '../../../sharedComponents/misc/OtherUserItem';

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
    ? 'Yo yet, add one below!'
    : "You are this user's only visible friend.";

  const friends =
    results.length === 0 ? (
      <EmptyCollection>{message}</EmptyCollection>
    ) : (
      results.map((friend, index) => (
        <OtherUserItem
          key={index}
          user={friend}
          isLink={true}
          hasButton={false}
        />
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
