import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { getGoalTime, dateIsBeforeToday } from '../../util/dateFunctions';
import GoalChart from '../GoalDetailsPage/GoalDetailsPageComponent/GoalChart';
import GoalInfo from '../GoalDetailsPage/GoalDetailsPageComponent/GoalInfo';
import { SetFriendSelectedGoal } from '../../redux/friend/actions';
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';
import { getGoalRecord } from '../../util/goalFunctions';
import { EGoalType } from '../../types';

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
      dateIsBeforeToday(friendState.friend.selectedGoal.startDate.toString()))
  ) {
    return (
      <div className='form-container'>
        <LoadingSpinner />
      </div>
    );
  }
  const { name, duration, startDate } = friendState.friend.selectedGoal;
  const { isStarted, time } = getGoalTime(startDate, duration);

  return (
    <div className='form-container'>
      <h2 className='collection-header'>{name}</h2>
      <ul>
        {(isStarted ||
          friendState.friend.selectedGoal.type === EGoalType.passfail) && (
          <GoalChart
            goal={friendState.friend.selectedGoal}
            record={record}
            setRecord={() => {}}
            time={time}
            isClickable={false}
          />
        )}
        <GoalInfo
          goal={friendState.friend.selectedGoal}
          time={time}
          record={record}
        />
        <hr />
      </ul>
    </div>
  );
};

export default FriendGoalPage;
