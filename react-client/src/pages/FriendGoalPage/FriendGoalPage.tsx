import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { getGoalTime, timeIsInPast } from '../../util/dateFunctions';
import GoalInfo from '../../sharedComponents/goalCompPage/GoalInfo';
import { SetFriendSelectedGoal } from '../../redux/friend/actions';
import LoadingSpinner from '../../sharedComponents/misc/LoadingSpinner';
import { getGoalRecord } from '../../util/goalFunctions';
import { EGoalType } from '../../types';
import {
  StandardContainer,
  CollectionHeader,
} from '../../sharedComponents/styledComponents/Misc';
import GCChart from '../../sharedComponents/goalCompPage/goalcompCharts/GCChart';

interface IParams {
  goalId: string;
}

//Similar to user goal page but with fewer permissions
const FriendGoalPage = () => {
  const friendState = useSelector((state: RootStore) => state.friendState);
  const history = useHistory();
  const dispatch = useDispatch();
  let { goalId } = useParams<IParams>();
  const [record, setRecord] = useState<(number | null)[]>([]);

  //redirect if friend is empty (usually on reload), otherwise set selected friend goal
  useEffect(() => {
    if (friendState.friend === undefined) {
      console.log('redirect from friend goal');
      history.push('/');
    } else {
      dispatch(SetFriendSelectedGoal(goalId));
    }
    //eslint-disable-next-line
  }, []);

  //set record
  useEffect(() => {
    if (
      friendState.friend !== undefined &&
      friendState.friend.selectedGoal !== undefined
    ) {
      setRecord(getGoalRecord(friendState.friend.selectedGoal));
    }
  }, [friendState.friend]);

  if (
    friendState.friend === undefined ||
    friendState.friend.selectedGoal === undefined ||
    (record.length === 0 &&
      timeIsInPast(friendState.friend.selectedGoal.startTime.toString()))
  ) {
    return (
      //TODO - verify this is correct
      <LoadingSpinner isFullPage={true} />
    );
  }

  const { name, duration, startTime } = friendState.friend.selectedGoal;
  const { isStarted, time, isFinished } = getGoalTime(startTime, duration);

  return (
    <StandardContainer>
      <CollectionHeader>{name}</CollectionHeader>
      <ul>
        {/* TEST */}
        {(isStarted ||
          friendState.friend.selectedGoal.type === EGoalType.passfail) && (
          <GCChart
            goal={friendState.friend.selectedGoal}
            record={record}
            setRecord={() => {}}
            time={time}
            isClickable={false}
          />
        )}
        <GoalInfo
          isFinished={isFinished}
          goal={friendState.friend.selectedGoal}
          time={time}
          record={record}
        />
        <hr />
      </ul>
    </StandardContainer>
  );
};

export default FriendGoalPage;
