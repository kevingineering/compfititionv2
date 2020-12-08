import React from 'react';
import { TDifferentUser } from '../../../types';
import { EmptyCollection } from '../../../sharedComponents/styledComponents/Misc';
import OtherUserItem from '../../../sharedComponents/misc/OtherUserItem';

interface IProps {
  results: TDifferentUser[];
  buttonIds: string[];
}

const SearchResults: React.FC<IProps> = ({ results, buttonIds }) => {
  let users =
    results.length === 0 ? (
      <EmptyCollection>No users match your search.</EmptyCollection>
    ) : (
      results.map((user, index) => (
        <OtherUserItem
          key={index}
          user={user}
          hasButton={true}
          isAdd={true}
          buttonIds={buttonIds}
        />
      ))
    );

  return <div>{users}</div>;
};

export default SearchResults;
