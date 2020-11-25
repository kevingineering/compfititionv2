import React, { useEffect } from 'react';
import CollapsibleListContainer from '../../../sharedComponents/CollapsibleListContainer';
import Searchbar from '../../FriendRequestsPage/FriendRequestsPageComponents/SearchBar';
import FriendList from './FriendList';
import FriendRequestList from './FriendRequestList';
import Notifications from './Notifications';
import { useDispatch } from 'react-redux';
import {
  FilterFriends,
  FriendFilterFriends,
  ClearFilteredFriends,
} from '../../../redux/friend/actions';

interface IProps {
  isOwner: boolean;
}

const FriendContainer: React.FC<IProps> = ({ isOwner }) => {
  const dispatch = useDispatch();

  //cleanup
  useEffect(() => {
    return () => {
      dispatch(ClearFilteredFriends());
    };
  }, [dispatch]);

  const handleClear = () => {
    dispatch(ClearFilteredFriends());
  };

  const handleFilter = (text: string) => {
    dispatch(isOwner ? FilterFriends(text) : FriendFilterFriends(text));
  };

  return (
    <div>
      {isOwner && (
        <CollapsibleListContainer title='Notifications' isCollapsible={false}>
          <Notifications></Notifications>
        </CollapsibleListContainer>
      )}
      <CollapsibleListContainer
        title='Friends'
        hasLink={isOwner}
        linkTo='/friendrequests'
        linkMessage='Add Friend'
      >
        {isOwner && <FriendRequestList></FriendRequestList>}
        <Searchbar clear={handleClear} filter={handleFilter}></Searchbar>
        <FriendList isOwner={isOwner}></FriendList>
      </CollapsibleListContainer>
    </div>
  );
};

export default FriendContainer;
