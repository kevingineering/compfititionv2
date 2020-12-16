import React, { useEffect } from 'react';
import CollapsibleListContainer from '../misc/CollapsibleListContainer';
import Searchbar from '../misc/SearchBar';
import FriendList from '../../pages/HomePage/HomePageComponents/FriendList';
import Notifications from '../../pages/HomePage/HomePageComponents/Notifications';
import { useDispatch } from 'react-redux';
import {
  FilterFriends,
  FriendFilterFriends,
  ClearFilteredFriends,
} from '../../redux/friendship/actions';
import ReceivedFriendRequestList from '../../pages/HomePage/HomePageComponents/ReceivedFriendRequestList';

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
      {/* Notifications - User page only */}
      {isOwner && (
        <CollapsibleListContainer title='Notifications' isCollapsible={false}>
          <Notifications />
        </CollapsibleListContainer>
      )}
      {/* Friends and Received Friend Requests */}
      <CollapsibleListContainer
        title='Friends'
        hasLink={isOwner}
        linkTo='/friendrequests'
        linkMessage='Add Friend'
      >
        {isOwner && <ReceivedFriendRequestList />}
        <Searchbar clear={handleClear} filter={handleFilter} />
        <FriendList isOwner={isOwner} />
      </CollapsibleListContainer>
    </div>
  );
};

export default FriendContainer;
