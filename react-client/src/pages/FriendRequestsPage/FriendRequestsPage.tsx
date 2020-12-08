import React, { useEffect } from 'react';
import SearchResults from './FriendRequestsPageComponents/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import {
  FilterSearchableUsers,
  ClearFilteredSearchableUsers,
  GetRequestsAndSearchableUsers,
} from '../../redux/friendRequest/actions';
import { NO_BUTTON } from '../../redux/buttonTypes';
import OtherUserItem from '../../sharedComponents/misc/OtherUserItem';
import CollapsibleListContainer from '../../sharedComponents/misc/CollapsibleListContainer';
import LoadingSpinner from '../../sharedComponents/misc/LoadingSpinner';
import SearchBar from '../../sharedComponents/misc/SearchBar';
import {
  SplitGrid,
  EmptyCollection,
} from '../../sharedComponents/styledComponents/Misc';

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

  const receivedFriendRequests = requestState.receivedRequests.map(
    (req, index) => (
      <OtherUserItem
        key={index}
        user={req}
        buttonIds={requestState.buttonIds}
      ></OtherUserItem>
    )
  );

  const sentFriendRequests = requestState.sentRequests.map((req, index) => (
    <OtherUserItem
      key={index}
      user={req}
      isSent={true}
      buttonIds={requestState.buttonIds}
    ></OtherUserItem>
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
    <SplitGrid>
      <div>
        <CollapsibleListContainer title='Received Requests'>
          {requestState.loadingButton === NO_BUTTON ? (
            <LoadingSpinner hasContainer={true} />
          ) : requestState.receivedRequests.length !== 0 ? (
            receivedFriendRequests
          ) : (
            <EmptyCollection>You have no received requests.</EmptyCollection>
          )}
        </CollapsibleListContainer>
        <CollapsibleListContainer title='Sent Requests'>
          {requestState.loadingButton === NO_BUTTON ? (
            <LoadingSpinner hasContainer={true} />
          ) : requestState.sentRequests.length !== 0 ? (
            sentFriendRequests
          ) : (
            <EmptyCollection>You have no sent requests.</EmptyCollection>
          )}
        </CollapsibleListContainer>
      </div>
      {searchJsx}
    </SplitGrid>
  );
};

export default FriendRequestsPage;
