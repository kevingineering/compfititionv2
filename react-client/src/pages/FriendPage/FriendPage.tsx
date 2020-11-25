import React, { useEffect, useState } from 'react';
import GoalAndCompetitionContainer from '../HomePage/HomePageComponents/GoalAndCompetitionContainer';
import FriendAndNotificationContainer from '../HomePage/HomePageComponents/FriendAndNotificationContainer';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useParams, useHistory } from 'react-router-dom';
import { GetFriend } from '../../redux/friend/actions';
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';
import DeleteFriendModule from './DeleteFriendModule';
import {
  AddRequest,
  DeleteRequest,
  AcceptRequest,
  GetRequestsAndSearchableUsers,
  RejectRequest,
} from '../../redux/request/actions';
import {
  DELETE_FRIEND_BUTTON,
  ADD_REQUEST_BUTTON,
  REJECT_REQUEST_BUTTON,
  ACCEPT_REQUEST_BUTTON,
  DELETE_REQUEST_BUTTON,
  NO_BUTTON,
  NOT_LOADING,
} from '../../redux/buttonTypes';
import LoadingButton from '../../sharedComponents/forms/LoadingButton';

interface IParams {
  friendId: string;
}

enum RequestStatus {
  SENT,
  RECEIVED,
  NONE,
  INITIAL,
}

const FriendPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const friendState = useSelector((state: RootStore) => state.friendState);
  const requestState = useSelector((state: RootStore) => state.requestState);
  const { friendId } = useParams<IParams>();
  const [status, setStatus] = useState(RequestStatus.NONE);
  const [isLoaded, setIsLoaded] = useState(false);

  //runs on page load
  useEffect(() => {
    dispatch(GetRequestsAndSearchableUsers());
    dispatch(GetFriend(friendId));
    setIsLoaded(true);
  }, [dispatch, friendId]);

  //redirects when user is not found
  useEffect(() => {
    if (
      friendState.friend === undefined &&
      friendState.loadingButton === NOT_LOADING &&
      isLoaded
    ) {
      console.log('redirect from friend page');
      history.push('/');
    }
  }, [history, friendState.friend, isLoaded, friendState.loadingButton]);

  //runs when user accepts request
  useEffect(() => {
    if (friendState.friends.length !== 0 && isLoaded) {
      dispatch(GetFriend(friendId));
    }
    //eslint-disable-next-line
  }, [friendState.friends.length]);

  //runs on page load, when GetRequestsAndSearchableUsers dispatch is resolved, and when user clicks any request button
  useEffect(() => {
    if (requestState.sentRequests.findIndex((x) => x.id === friendId) !== -1) {
      setStatus(RequestStatus.SENT);
    } else if (
      requestState.receivedRequests.findIndex((x) => x.id === friendId) !== -1
    ) {
      setStatus(RequestStatus.RECEIVED);
    } else {
      setStatus(RequestStatus.NONE);
    }
  }, [
    requestState.sentRequests,
    requestState.receivedRequests,
    friendId,
    dispatch,
    friendState.friends,
  ]);

  //content dependent on request status
  let jsx;
  if (status === RequestStatus.SENT) {
    jsx = (
      <div className='form-container'>
        <p className='center margin-1rem margin-top-0'>
          You sent this user a friend request. To see their page they first must
          accept your request.
        </p>
        {/* TODO - LOADING SPINNER */}
        <LoadingButton
          className='btn btn-block btn-primary'
          handleClick={() => dispatch(DeleteRequest(friendId))}
          message={'Delete Request'}
          isLoading={
            requestState.buttonIds.indexOf(DELETE_REQUEST_BUTTON + friendId) !==
            -1
          }
        />
      </div>
    );
  } else if (status === RequestStatus.RECEIVED) {
    jsx = (
      <div className='form-container'>
        <p className='center margin-1rem margin-top-0'>
          You are not friends with this user, but they sent you a friend
          request! Accept it below to see their page.
        </p>
        {/* TODO - LOADING SPINNER */}
        <LoadingButton
          className='btn btn-block btn-primary'
          handleClick={() => dispatch(AcceptRequest(friendId))}
          message={'Accept Request'}
          isLoading={
            requestState.buttonIds.indexOf(ACCEPT_REQUEST_BUTTON + friendId) !==
            -1
          }
          isDisabled={
            requestState.buttonIds.indexOf(REJECT_REQUEST_BUTTON + friendId) !==
            -1
          }
        />
        <p className='margin-1rem margin-top-0'></p>
        {/* TODO - LOADING SPINNER */}
        <LoadingButton
          className='btn btn-block btn-primary'
          handleClick={() => dispatch(RejectRequest(friendId))}
          message={'Reject Request'}
          isLoading={
            requestState.buttonIds.indexOf(REJECT_REQUEST_BUTTON + friendId) !==
            -1
          }
          isDisabled={
            requestState.buttonIds.indexOf(ACCEPT_REQUEST_BUTTON + friendId) !==
            -1
          }
        />
      </div>
    );
  } else {
    jsx = (
      <div className='form-container'>
        <p className='center margin-1rem margin-top-0'>
          You are not friends with this user. If you would to see their page,
          send a friend request!
        </p>
        <LoadingButton
          className='btn btn-block btn-primary'
          handleClick={() => dispatch(AddRequest(friendId))}
          message={'Send Request'}
          isLoading={
            requestState.buttonIds.indexOf(ADD_REQUEST_BUTTON + friendId) !== -1
          }
        />
      </div>
    );
  }

  return friendState.friend === undefined ||
    friendState.loadingButton === NO_BUTTON ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <h1 className='center margin-bottom-1rem'>
        {friendState.friend!.name}'s Page
      </h1>
      {friendState.friend!.isFriend ? (
        <React.Fragment>
          <div className='grid-2'>
            <GoalAndCompetitionContainer isOwner={false} />
            <FriendAndNotificationContainer isOwner={false} />
          </div>
          <DeleteFriendModule
            friendId={friendId}
            isLoading={friendState.loadingButton === DELETE_FRIEND_BUTTON}
          />
        </React.Fragment>
      ) : (
        <div className='form-container'>{jsx}</div>
      )}
    </React.Fragment>
  );
};

export default FriendPage;
