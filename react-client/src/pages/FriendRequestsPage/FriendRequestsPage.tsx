import React, { useEffect } from 'react';
import SearchBar from './FriendRequestsPageComponents/SearchBar';
import SearchResults from './FriendRequestsPageComponents/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import CollapsibleListContainer from '../../sharedComponents/CollapsibleListContainer';
import {
  FilterSearchableUsers,
  ClearFilteredSearchableUsers,
  GetRequestsAndSearchableUsers,
} from '../../redux/request/actions';
import FriendRequestItem from '../HomePage/HomePageComponents/FriendRequestItem';
import { NO_BUTTON } from '../../redux/buttonTypes';
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';

//shows requests and other users to whom a user can send requests
const FriendRequestsPage = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((state: RootStore) => state.requestState);

  useEffect(() => {
    dispatch(GetRequestsAndSearchableUsers());
    return () => {
      dispatch(ClearFilteredSearchableUsers());
    };
  }, [dispatch]);

  //isFiltered is true when text is in searchbar
  const results = requestState.isFiltered
    ? requestState.filteredSearchableUsers
    : requestState.searchableUsers;

  const receivedFriendRequests = requestState.receivedRequests.map((req) => (
    <FriendRequestItem
      key={req.id}
      targetUser={req}
      isHome={false}
      buttonIds={requestState.buttonIds}
    ></FriendRequestItem>
  ));

  const sentFriendRequests = requestState.sentRequests.map((req) => (
    <FriendRequestItem
      key={req.id}
      targetUser={req}
      isHome={false}
      isSent={true}
      buttonIds={requestState.buttonIds}
    ></FriendRequestItem>
  ));

  const searchJsx = (
    <CollapsibleListContainer title='Users' isCollapsible={false}>
      {requestState.loadingButton === NO_BUTTON ? (
        <LoadingSpinner hasContainer={true} />
      ) : (
        <React.Fragment>
          <SearchBar
            filter={(text: string) => dispatch(FilterSearchableUsers(text))}
            clear={() => dispatch(ClearFilteredSearchableUsers())}
          />
          <SearchResults results={results} buttonIds={requestState.buttonIds} />
        </React.Fragment>
      )}
    </CollapsibleListContainer>
  );

  return (
    <div className='grid-2'>
      <div>
        <CollapsibleListContainer title='Received Requests'>
          {requestState.loadingButton === NO_BUTTON ? (
            <LoadingSpinner hasContainer={true} />
          ) : requestState.receivedRequests.length !== 0 ? (
            receivedFriendRequests
          ) : (
            <span className='empty-collection'>
              You have no received requests.
            </span>
          )}
        </CollapsibleListContainer>
        <CollapsibleListContainer title='Sent Requests'>
          {requestState.loadingButton === NO_BUTTON ? (
            <LoadingSpinner hasContainer={true} />
          ) : requestState.sentRequests.length !== 0 ? (
            sentFriendRequests
          ) : (
            <span className='empty-collection'>You have no sent requests.</span>
          )}
        </CollapsibleListContainer>
      </div>
      {searchJsx}
    </div>
  );
};

export default FriendRequestsPage;
