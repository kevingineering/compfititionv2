import React, { useEffect, useState } from 'react';
import GoalAndCompetitionContainer from '../../sharedComponents/userDashboard/GoalAndCompetitionContainer';
import FriendAndNotificationContainer from '../../sharedComponents/userDashboard/FriendAndNotificationContainer';
import { useDispatch } from 'react-redux';
import { ClearSelectedGoal } from '../../redux/goal/actions';
import { ClearFriend } from '../../redux/friendship/actions';
import { SplitGrid } from '../../sharedComponents/styledComponents/Misc';
import { GetUserInfo } from '../../redux/user/actions';

const HomePage = () => {
  //prevents flash of old data
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  //reset state
  useEffect(() => {
    dispatch(ClearSelectedGoal());
    dispatch(ClearFriend());
    dispatch(GetUserInfo());
    setIsLoaded(true);
  }, [dispatch]);

  return !isLoaded ? null : (
    <SplitGrid>
      <GoalAndCompetitionContainer isOwner={true} />
      <FriendAndNotificationContainer isOwner={true} />
    </SplitGrid>
  );
};

export default HomePage;
