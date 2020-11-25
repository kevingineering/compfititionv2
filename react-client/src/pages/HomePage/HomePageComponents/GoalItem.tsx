import React from 'react';
import { getGoalTime, cleanNumber } from '../../../util/dateFunctions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getGoalScore, getGoalRecord } from '../../../util/goalFunctions';
import { EGoalType, TGoal } from '../../../types';

interface IProps {
  goal: TGoal;
  isOwner: boolean;
  isComp: boolean;
}

const GoalItem: React.FC<IProps> = ({ goal, isOwner, isComp }) => {
  const { startDate, duration, type, units, id, name } = goal;
  const { isStarted, time, isComplete } = getGoalTime(startDate, duration);

  //calc progress
  let progressTag = '';
  let progressMessage = '';

  const record = getGoalRecord(goal);

  const score = cleanNumber(getGoalScore(goal.type, record, goal.initialValue));

  if (type === EGoalType.passfail) {
    progressTag = 'Success: ';
    progressMessage = `${score} / ${isComplete ? record.length : time + 1}`;
  } else if (type === EGoalType.cumulative) {
    progressTag = 'Total: ';
    progressMessage = `${score} ${units}`;
  } else {
    progressTag = 'Change: ';
    progressMessage = `${score > 0 ? '+' : ''}${score} ${units}`;
  }

  return (
    <li className='collection-item'>
      <div className='flex'>
        <h3 className='vertical-center'>
          <Link
            to={
              isComp
                ? '/competition/' + id
                : isOwner
                ? '/goal/' + id
                : '/friend/goal/' + id
            }
          >
            {name}
          </Link>
        </h3>
      </div>
      {!isComplete ? (
        <div className='hide-sm'>
          {isStarted ? (
            <React.Fragment>
              <span className='right'>
                <strong>Day: </strong>
                {time + 1} / {duration}
              </span>
              <br />
              <span className='right'>
                <strong>{progressTag}</strong>
                {progressMessage}
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='right'>Begins </span>
              <br />
              <span className='right'>
                {moment.utc(startDate).format('MMM Do')}
              </span>
            </React.Fragment>
          )}
        </div>
      ) : (
        <span className='right hide-sm'>
          <strong>Final {progressTag}</strong>
          {progressMessage}
        </span>
      )}
    </li>
  );
};

export default GoalItem;
