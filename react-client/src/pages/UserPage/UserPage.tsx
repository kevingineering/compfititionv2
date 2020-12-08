import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import UserInfo from './UserPageComponents/UserInfo';
import EditModule from './UserPageComponents/EditModule';
import DeleteModule from './UserPageComponents/DeleteModule';
import PasswordModule from './UserPageComponents/PasswordModule';
import {
  DELETE_USER_BUTTON,
  CHANGE_PASSWORD_BUTTON,
} from '../../redux/buttonTypes';
import {
  StandardContainer,
  PageTitle,
} from '../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

//page where user can edit their information, change password, and delete account
const UserPage = () => {
  const userState = useSelector((state: RootStore) => state.userState);

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    //close modules when user is updated
    if (userState.isModified) {
      setEditToggle(false);
      setPasswordToggle(false);
      setDeleteToggle(false);
    }
  }, [userState.isModified]);

  return (
    <AuthContainer>
      <PageTitle>User Profile</PageTitle>
      {editToggle && (
        <EditModule
          userState={userState}
          closeEdit={() => setEditToggle(false)}
        />
      )}
      {passwordToggle && (
        <PasswordModule
          closePassword={() => setPasswordToggle(false)}
          isLoading={userState.loadingButton === CHANGE_PASSWORD_BUTTON}
        />
      )}
      {deleteToggle && (
        <DeleteModule
          closeDelete={() => setDeleteToggle(false)}
          isLoading={userState.loadingButton === DELETE_USER_BUTTON}
        />
      )}
      {!editToggle && !passwordToggle && !deleteToggle && (
        <UserInfo
          user={userState.user!}
          setEditToggle={setEditToggle}
          setPasswordToggle={setPasswordToggle}
          setDeleteToggle={setDeleteToggle}
        />
      )}
    </AuthContainer>
  );
};

export default UserPage;

const AuthContainer = styled(StandardContainer)`
  max-width: 25rem;
`;
