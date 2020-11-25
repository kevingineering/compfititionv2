import React from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import LoadingSpinner from '../../../sharedComponents/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';

const FriendRequestList = () => {
  const requestState = useSelector((state: RootStore) => state.requestState);

  const friendRequests = requestState.receivedRequests.map((req) => (
    <FriendRequestItem
      key={req.id}
      targetUser={req}
      buttonIds={requestState.buttonIds}
    />
  ));

  return (
    <div>
      {requestState.loadingButton === NO_BUTTON ? (
        <LoadingSpinner hasContainer={true} />
      ) : (
        <React.Fragment>
          {friendRequests.length !== 0 && <p className='lr-border' />}
          {friendRequests}
        </React.Fragment>
      )}
    </div>
  );
};

export default FriendRequestList;
