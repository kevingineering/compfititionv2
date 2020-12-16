import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AcceptFriendRequest,
  RejectFriendRequest,
  DeleteFriendRequest,
  AddFriendRequest,
} from '../../redux/friendRequest/actions';
import LoadingButton from '../forms/LoadingButton';
import {
  DELETE_FRIEND_REQUEST_BUTTON,
  ACCEPT_FRIEND_REQUEST_BUTTON,
  REJECT_FRIEND_REQUEST_BUTTON,
  ADD_FRIEND_REQUEST_BUTTON,
} from '../../redux/buttonTypes';
import { TDifferentUser } from '../../types';
import { Link } from 'react-router-dom';
import { ButtonUser } from '../styledComponents/Button';
import styled from 'styled-components';

interface IProps {
  user: TDifferentUser;
  //if received request on home page or friend request page
  hasMessage?: boolean;
  //if friends with user
  isLink?: boolean;
  //no button when friends
  hasButton?: boolean;
  //no request
  isAdd?: boolean;
  //request sent/received
  isSent?: boolean;
  //required if has button
  buttonIds?: string[];
}

interface ILinkProps {
  children: JSX.Element;
  userId: string;
}

//conditional wrapper
const UserLink: React.FC<ILinkProps> = ({ children, userId }) => {
  return <Link to={'/friend/' + userId}>{children}</Link>;
};

const OtherUserItem: React.FC<IProps> = ({
  user,
  hasMessage = false,
  isLink = false,
  hasButton = true,
  isAdd = false,
  isSent = false,
  buttonIds = [],
}) => {
  const { userId, name, email } = user;

  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(AcceptFriendRequest(userId));
  };

  const handleReject = () => {
    dispatch(RejectFriendRequest(userId));
  };

  const handleDelete = () => {
    dispatch(DeleteFriendRequest(userId));
  };

  const handleAdd = () => {
    dispatch(AddFriendRequest(userId));
  };

  //TODO - use real image
  const imageContents =
    0.5 > Math.random() ? (
      <UserImage
        src={'https://picsum.photos/id/237/200'}
        alt={name.charAt(0).toUpperCase()}
      />
    ) : (
      <UserNoImage>{name.charAt(0).toUpperCase()}</UserNoImage>
    );

  const image = isLink ? (
    UserLink({ children: imageContents, userId })
  ) : (
    <div>{imageContents}</div>
  );

  const nameContents = <UserName>{name}</UserName>;

  const username = isLink
    ? UserLink({ children: nameContents, userId })
    : nameContents;

  return (
    <UserItem>
      {hasMessage && (
        <ItemMessage>{name} sent you a friend request!</ItemMessage>
      )}
      <UserItemContainer>
        {image}
        <UserInfo>
          {username}
          <br />
          <span>{email}</span>
        </UserInfo>
        {hasButton && (
          <ButtonContainer>
            {isAdd ? (
              <LoadingButton
                styles={ButtonUser}
                handleClick={handleAdd}
                message='Add'
                isLoading={
                  buttonIds.indexOf(ADD_FRIEND_REQUEST_BUTTON + user.userId) !==
                  -1
                }
              />
            ) : isSent ? (
              <LoadingButton
                styles={ButtonUser}
                handleClick={handleDelete}
                message='Delete'
                isLoading={
                  buttonIds.indexOf(DELETE_FRIEND_REQUEST_BUTTON + userId) !==
                  -1
                }
              />
            ) : (
              <React.Fragment>
                <LoadingButton
                  styles={ButtonUser}
                  handleClick={handleAccept}
                  message='Accept'
                  isLoading={
                    buttonIds.indexOf(ACCEPT_FRIEND_REQUEST_BUTTON + userId) !==
                    -1
                  }
                  isDisabled={
                    buttonIds.indexOf(REJECT_FRIEND_REQUEST_BUTTON + userId) !==
                    -1
                  }
                />
                <LoadingButton
                  styles={ButtonUser}
                  handleClick={handleReject}
                  message='Reject'
                  isLoading={
                    buttonIds.indexOf(REJECT_FRIEND_REQUEST_BUTTON + userId) !==
                    -1
                  }
                  isDisabled={
                    buttonIds.indexOf(ACCEPT_FRIEND_REQUEST_BUTTON + userId) !==
                    -1
                  }
                />
              </React.Fragment>
            )}
          </ButtonContainer>
        )}
      </UserItemContainer>
    </UserItem>
  );
};

export default OtherUserItem;

const UserItem = styled.li`
  border: 0.125rem solid var(--primary-color);
  border-top: none;
  width: 100%;
  justify-content: flex-start;
`;

const UserItemContainer = styled.div`
  display: flex;
  height: 5rem;
`;

const UserInfo = styled.div`
  margin: auto 0;
  width: 100%;
  border-left: 0.125rem solid var(--primary-color);
  padding-left: 0.5rem;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: inline-block;
`;

const UserImage = styled.img`
  width: 4rem;
  height: 4rem;
  margin: 0.5rem;
  border-radius: 50%;
`;

const UserNoImage = styled.p`
  width: 4rem;
  height: 4rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 2rem;
  background: var(--primary-color);
  color: var(--secondary-color);
`;

const ButtonContainer = styled.div`
  float: right;
  white-space: nowrap;
  margin: auto 0;
  vertical-align: middle;
  line-height: normal;
`;

const ItemMessage = styled.p`
  text-align: center;
  background: var(--primary-color);
  color: var(--secondary-color);
`;
