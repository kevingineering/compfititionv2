import React from 'react';
import { TUser } from '../../../types';

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
          <span className='width-6rem'>
            <strong>Name:</strong>
          </span>
          <span>{user.name!}</span>
        </li>
        <li>
          <span className='width-6rem'>
            <strong>Email:</strong>
          </span>
          <span>{user.email!}</span>
        </li>
        <li className='flex'>
          <span className='width-6rem'>
            <strong>Privacy:</strong>
          </span>
          <span>{message}</span>
        </li>
      </ul>
      <input
        type='button'
        value='Edit User'
        className='btn btn-block btn-primary'
        onClick={() => setEditToggle(true)}
      />
      <input
        type='button'
        value='Change Password'
        className='btn btn-block btn-primary'
        onClick={() => setPasswordToggle(true)}
      />
      <input
        type='button'
        value='Delete User'
        className='btn btn-block btn-primary'
        onClick={() => setDeleteToggle(true)}
      />
    </React.Fragment>
  );
};

export default UserInfo;
