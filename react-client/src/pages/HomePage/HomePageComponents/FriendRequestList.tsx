import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/misc/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';
import { EmptyBorderedSpace } from '../../../sharedComponents/styledComponents/Misc';
import OtherUserItem from '../../../sharedComponents/misc/OtherUserItem';

const FriendRequestList = () => {
  const requestState = useSelector((state: RootStore) => state.requestState);

  const friendRequests = requestState.receivedRequests.map((req, index) => (
    <OtherUserItem
      hasMessage={true}
      key={index}
      user={req}
      buttonIds={requestState.buttonIds}
    />
  ));

  return (
    <div>
      {requestState.loadingButton === NO_BUTTON ? (
        <LoadingSpinner hasContainer={true} />
      ) : (
        <React.Fragment>
          {friendRequests.length !== 0 && <EmptyBorderedSpace />}
          {friendRequests}
        </React.Fragment>
      )}
    </div>
  );
};

export default FriendRequestList;
