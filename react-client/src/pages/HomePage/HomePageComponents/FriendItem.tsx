import React from 'react';
import { Link } from 'react-router-dom';
import { TDifferentUser } from '../../../types';
import { GetFriend } from '../../../redux/friend/actions';
import { useDispatch } from 'react-redux';

interface IProps {
  friend: TDifferentUser;
}

const FriendItem: React.FC<IProps> = ({ friend }) => {
  const { name, email, id } = friend;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(GetFriend(id));
  };

  return (
    <li className='search-item flex'>
      <div className='search-link'>
        <div className='search-icon'>
          <Link to={'/friend/' + id}>
            {0.5 > Math.random() ? (
              //TODO - use real image
              <img
                src='https://picsum.photos/id/237/200'
                alt={name.charAt(0)}
              />
            ) : (
              <p className='bg-primary'>{name.charAt(0).toUpperCase()}</p>
            )}
          </Link>
        </div>
        <div className='search-container'>
          <Link
            to={'/friend/' + id}
            onClick={handleClick}
            className='search-name'
          >
            {name}
          </Link>
          <br />
          <span className='search-email'>{email}</span>
        </div>
      </div>
    </li>
  );
};

export default FriendItem;
