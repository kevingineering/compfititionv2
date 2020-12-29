import React from 'react';
import { TDifferentUser } from '../../../types';
import { EmptyCollection } from '../../../sharedComponents/styledComponents/Misc';
import DifferentUserItem from '../../../sharedComponents/misc/DifferentUserItem';

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
        <DifferentUserItem
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
