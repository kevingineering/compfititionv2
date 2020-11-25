import React from 'react';
import { AddRequest } from '../../../redux/request/actions';
import { useDispatch } from 'react-redux';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { TDifferentUser } from '../../../types';

interface IProps {
  user: TDifferentUser;
  isLoading: boolean;
}

const SearchItem: React.FC<IProps> = ({
  user: { name, email, id },
  isLoading,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(AddRequest(id));
  };

  return (
    <li className='search-item flex'>
      <div className='search-link'>
        <div className='search-icon'>
          {0.5 > Math.random() ? (
            //TODO - use real image
            <img src='https://picsum.photos/id/237/200' alt={name.charAt(0)} />
          ) : (
            <p className='bg-primary'>{name.charAt(0).toUpperCase()}</p>
          )}
        </div>
        <div className='search-container'>
          <span className='search-name'>{name}</span>
          <br />
          <span className='search-email'>{email}</span>
        </div>
        <div className='right margin-right-05'>
          <LoadingButton
            className={`search-btn btn-primary block`}
            handleClick={handleClick}
            isLoading={isLoading}
            message='Add'
            isInput={false}
          />
        </div>
      </div>
    </li>
  );
};

export default SearchItem;
