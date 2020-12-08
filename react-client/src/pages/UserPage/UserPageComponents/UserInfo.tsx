import React from 'react';
import { TUser } from '../../../types';
import { FlexContainer } from '../../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

interface IProps {
  user: TUser;
  setEditToggle: (b: boolean) => void;
  setPasswordToggle: (b: boolean) => void;
  setDeleteToggle: (b: boolean) => void;
}

//shows basic user information
const UserInfo: React.FC<IProps> = ({
  user,
  setEditToggle,
  setPasswordToggle,
  setDeleteToggle,
}) => {
  let message = `Users ${
    user.isSearchable! ? 'can' : 'cannot'
  } search for me using my name and email.`;

  return (
    <React.Fragment>
      <ul>
        <li>
          <UserInfoSpan>
            <strong>Name:</strong>
          </UserInfoSpan>
          <span>{user.name!}</span>
        </li>
        <li>
          <UserInfoSpan>
            <strong>Email:</strong>
          </UserInfoSpan>
          <span>{user.email!}</span>
        </li>
        <FlexContainer>
          <UserInfoSpan>
            <strong>Privacy:</strong>
          </UserInfoSpan>
          <span>{message}</span>
        </FlexContainer>
      </ul>
      <UserInfoButton onClick={() => setEditToggle(true)}>
        Edit User
      </UserInfoButton>
      <UserInfoButton onClick={() => setPasswordToggle(true)}>
        Change Password
      </UserInfoButton>
      <UserInfoButton onClick={() => setDeleteToggle(true)}>
        Delete User
      </UserInfoButton>
    </React.Fragment>
  );
};

export default UserInfo;

const UserInfoButton = styled.button`
  display: inline-block;
  padding: 0.4rem 1.3rem;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  line-height: 1.6rem;
  display: block;
  width: 100%;
  background: var(--primary-color);
  color: var(--secondary-color);
`;

const UserInfoSpan = styled.div`
  width: 6rem;
  flex-shrink: 0;
  display: inline-block;
  text-align: left;
`;
