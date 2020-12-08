import React, { useEffect, useState } from 'react';
import GoalAndCompetitionContainer from '../../sharedComponents/userDashboard/GoalAndCompetitionContainer';
import FriendAndNotificationContainer from '../../sharedComponents/userDashboard/FriendAndNotificationContainer';
import { useDispatch } from 'react-redux';
import { GetUserGoals, ClearSelectedGoal } from '../../redux/goal/actions';
import { GetCompetitionGoals } from '../../redux/competition/actions';
import { GetReceivedFriendRequests } from '../../redux/friendRequest/actions';
import { GetFriends, ClearFriend } from '../../redux/friend/actions';
import { SplitGrid } from '../../sharedComponents/styledComponents/Misc';

const HomePage = () => {
  //prevents flash of old data
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  //reset state
  useEffect(() => {
    dispatch(ClearSelectedGoal());
    dispatch(ClearFriend());
    dispatch(GetUserGoals());
    dispatch(GetCompetitionGoals());
    dispatch(GetReceivedFriendRequests());
    dispatch(GetFriends());
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
