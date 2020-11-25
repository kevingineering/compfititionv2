import React, { useEffect, useState } from 'react';
import GoalAndCompetitionContainer from './HomePageComponents/GoalAndCompetitionContainer';
import FriendAndNotificationContainer from './HomePageComponents/FriendAndNotificationContainer';
import { useDispatch } from 'react-redux';
import { GetUserGoals, ClearSelectedGoal } from '../../redux/goal/actions';
import { GetCompetitionGoals } from '../../redux/competition/actions';
import { GetRequestsAndSearchableUsers } from '../../redux/request/actions';
import { GetFriends, ClearFriend } from '../../redux/friend/actions';

const HomePage = () => {
  //prevents flash of old data
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useDispatch();

  //reset state
  useEffect(() => {
    dispatch(ClearSelectedGoal());
    dispatch(ClearFriend());
    dispatch(GetUserGoals());
    dispatch(GetCompetitionGoals());
    dispatch(GetRequestsAndSearchableUsers());
    dispatch(GetFriends());
    setIsLoaded(false);
  }, [dispatch]);

  return isLoaded ? null : (
    <div className='grid-2'>
      <GoalAndCompetitionContainer isOwner={true} />
      <FriendAndNotificationContainer isOwner={true} />
    </div>
  );
};

export default HomePage;
