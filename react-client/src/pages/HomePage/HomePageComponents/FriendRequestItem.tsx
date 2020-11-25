import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AcceptRequest,
  RejectRequest,
  DeleteRequest,
} from '../../../redux/request/actions';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import {
  DELETE_REQUEST_BUTTON,
  ACCEPT_REQUEST_BUTTON,
  REJECT_REQUEST_BUTTON,
} from '../../../redux/buttonTypes';
import { TDifferentUser } from '../../../types';

interface IProps {
  targetUser: TDifferentUser;
  //if on home page or friend request page
  isHome?: boolean;
  //whether sent or received
  isSent?: boolean;
  buttonIds: string[];
}

const FriendRequestItem: React.FC<IProps> = ({
  targetUser,
  isHome = true,
  isSent = false,
  buttonIds,
}) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(AcceptRequest(targetUser.id));
  };

  const handleReject = () => {
    dispatch(RejectRequest(targetUser.id));
  };

  const handleDelete = () => {
    dispatch(DeleteRequest(targetUser.id));
  };

  //TODO - add image
  const avatar = null;

  return (
    <div>
      <li className='search-item'>
        {isHome && (
          <p className='center btn-primary'>
            {targetUser.name} sent you a friend request!
          </p>
        )}
        <div className='search-link'>
          <div className='flex search-icon'>
            <img
              src={
                avatar !== null ? avatar : 'https://picsum.photos/id/237/200'
              }
              alt={targetUser.name.charAt(0)}
            />
          </div>
          <div className='search-container'>
            <span className='search-name'>{targetUser.name}</span>
            <br />
            <span className='search-email'>{targetUser.email}</span>
          </div>
          <div className='right margin-right-05'>
            {isSent ? (
              <React.Fragment>
                <LoadingButton
                  className='search-btn btn-primary block'
                  handleClick={handleDelete}
                  message='Delete'
                  isInput={false}
                  isLoading={
                    buttonIds.indexOf(DELETE_REQUEST_BUTTON + targetUser.id) !==
                    -1
                  }
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <LoadingButton
                  className='search-btn btn-primary block'
                  handleClick={handleAccept}
                  message='Accept'
                  isInput={false}
                  isLoading={
                    buttonIds.indexOf(ACCEPT_REQUEST_BUTTON + targetUser.id) !==
                    -1
                  }
                  isDisabled={
                    buttonIds.indexOf(REJECT_REQUEST_BUTTON + targetUser.id) !==
                    -1
                  }
                />
                <LoadingButton
                  className='search-btn btn-primary block'
                  handleClick={handleReject}
                  message='Reject'
                  isInput={false}
                  isLoading={
                    buttonIds.indexOf(REJECT_REQUEST_BUTTON + targetUser.id) !==
                    -1
                  }
                  isDisabled={
                    buttonIds.indexOf(ACCEPT_REQUEST_BUTTON + targetUser.id) !==
                    -1
                  }
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default FriendRequestItem;
