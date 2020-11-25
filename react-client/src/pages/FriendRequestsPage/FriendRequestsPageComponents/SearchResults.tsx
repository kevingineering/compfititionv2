import React from 'react';
import SearchItem from './SearchItem';
import { ADD_REQUEST_BUTTON } from '../../../redux/buttonTypes';
import { TDifferentUser } from '../../../types';
// import { RootStore } from '../../../redux/Store';
// import { useSelector } from 'react-redux';

interface IProps {
  results: TDifferentUser[];
  buttonIds: string[];
}

const SearchResults: React.FC<IProps> = ({ results, buttonIds }) => {
  let users =
    results.length === 0 ? (
      <span className='empty-collection'>No users match your search.</span>
    ) : (
      results.map((user) => (
        <SearchItem
          user={user}
          key={user.id}
          isLoading={buttonIds.indexOf(ADD_REQUEST_BUTTON + user.id) !== -1}
        />
      ))
    );

  return <div>{users}</div>;
};

export default SearchResults;
