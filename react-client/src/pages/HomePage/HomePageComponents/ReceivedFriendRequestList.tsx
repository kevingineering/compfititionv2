import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/misc/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';
import OtherUserItem from '../../../sharedComponents/misc/OtherUserItem';
import { EmptyBorderedSpace } from '../../../sharedComponents/styledComponents/Misc';

const ReceivedFriendRequestList = () => {
  const requestState = useSelector((state: RootStore) => state.requestState);

  const friendRequestsList = requestState.usersWhoSentFriendRequest.map(
    (req, index) => (
      <OtherUserItem
        hasMessage={true}
        key={index}
        user={req}
        buttonIds={requestState.buttonIds}
      />
    )
  );

  return requestState.loadingButton === NO_BUTTON ? (
    <LoadingSpinner hasContainer={true} />
  ) : requestState.usersWhoSentFriendRequest.length !== 0 ? (
    <div>
      <EmptyBorderedSpace />
      {friendRequestsList}
    </div>
  ) : null;
};

export default ReceivedFriendRequestList;
