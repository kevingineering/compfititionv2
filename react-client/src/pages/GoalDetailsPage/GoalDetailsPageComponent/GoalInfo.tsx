import React from 'react';
import moment from 'moment';
import { getGoalScore } from '../../../util/goalFunctions';
import { getGoalTime, cleanNumber } from '../../../util/dateFunctions';
import { TGoal, EGoalType } from '../../../types';

interface IProps {
  goal: TGoal;
  time: number;
  record: (number | null)[];
}

//messaging to describe goal - varies greatly depending on type and time status
const GoalInfo: React.FC<IProps> = ({ goal, time, record }) => {
  const {
    duration,
    startDate,
    description,
    units,
    target,
    type,
    initialValue,
  } = goal;
  const { isStarted } = getGoalTime(startDate, duration);
  const isFinished = time === duration;
  const formattedDate = moment.utc(startDate).format('MMMM Do, YYYY');
  const score = cleanNumber(getGoalScore(type, record, initialValue));

  let topLeftTag = '';
  let topLeftMsg = '';
  let topRightTag = '';
  let topRightMsg = '';
  let middleLeftTag = '';
  let middleLeftMsg = '';
  let middleRightTag = '';
  let middleRightMsg = '';
  let bottomLeftTag = '';
  let bottomLeftMsg = '';
  let bottomRightTag = '';
  let bottomRightMsg = '';

  if (isFinished) {
    topLeftTag = 'Start Date: ';
    topLeftMsg = formattedDate;
    if (type === EGoalType.passfail) {
      middleLeftTag = 'Success Total: ';
      middleLeftMsg = `${score} / ${(duration * target) / 7} (${Math.round(
        (score / ((duration * target) / 7)) * 100
      )}%)`;
    } else if (type === EGoalType.cumulative) {
      topRightTag = 'Duration: ';
      topRightMsg = `${duration} days`;
      middleLeftTag = 'Total: ';
      middleLeftMsg = `${score} / ${target} ${units}`;
      middleRightTag = 'Goal Completion: ';
      middleRightMsg = `${Math.round((score / target) * 100)}%`;
    } else if (type === EGoalType.difference) {
      topRightTag = 'Duration: ';
      topRightMsg = `${duration} days`;
      middleLeftTag = 'Start: ';
      middleLeftMsg = `${initialValue!} ${units}`;
      middleRightTag = 'Goal: ';
      middleRightMsg = `${target} ${units}`;
      bottomLeftTag = 'Final: ';
      bottomLeftMsg = `${initialValue! + score} ${units}`;
      bottomRightTag = 'Change: ';
      bottomRightMsg = `${score > 0 ? '+' : ''}${score} ${units}`;
    }
  } else if (isStarted) {
    topLeftTag = 'Start Date: ';
    topLeftMsg = formattedDate;
    if (type === EGoalType.passfail) {
      middleLeftTag = 'Success To Date: ';
      middleLeftMsg = `${score} / ${time + 1} (${Math.round(
        (score / (time + 1)) * 100
      )}%)`;
      bottomLeftTag = 'Success Total: ';
      bottomLeftMsg = `${score} / ${(duration * target) / 7} (${Math.round(
        (score / ((duration * target) / 7)) * 100
      )}%)`;
    } else if (type === EGoalType.cumulative) {
      topRightTag = 'Day: ';
      topRightMsg = `${time + 1} / ${duration}`;
      middleLeftTag = 'Total: ';
      middleLeftMsg = `${score} / ${target} ${units}`;
      middleRightTag = 'Goal Completion: ';
      middleRightMsg = `${Math.round((score / target) * 100)}%`;
    } else if (type === EGoalType.difference) {
      topRightTag = 'Day: ';
      topRightMsg = `${time + 1} / ${duration}`;
      middleLeftTag = 'Start: ';
      middleLeftMsg = `${initialValue!} ${units}`;
      middleRightTag = 'Goal: ';
      middleRightMsg = `${target} ${units}`;
      bottomLeftTag = 'Current: ';
      bottomLeftMsg = `${initialValue! + score} ${units}`;
      bottomRightTag = 'Change: ';
      bottomRightMsg = `${score > 0 ? '+' : ''}${score} ${units}`;
    }
  } else {
    topLeftTag = 'Begins: ';
    topLeftMsg = formattedDate;
    topRightTag = 'Duration: ';
    topRightMsg = `${duration} days`;
    if (type === EGoalType.passfail) {
    } else if (type === EGoalType.cumulative) {
      middleLeftTag = 'Goal: ';
      middleLeftMsg = `${target} ${units}`;
    } else if (type === EGoalType.difference) {
      middleLeftTag = 'Start: ';
      middleLeftMsg = `${initialValue!} ${units}`;
      middleRightTag = 'Goal: ';
      middleRightMsg = `${target} ${units}`;
    }
  }

  return (
    <React.Fragment>
      {description && (
        <React.Fragment>
          <li className='table-info lr-border'>
            <span className='block'>
              <strong>Description: </strong>
              {description}
            </span>
          </li>
        </React.Fragment>
      )}
      <li className='table-info lr-border'>
        <div className='space-between'>
          <span>
            <strong>{topLeftTag}</strong>
            {topLeftMsg}
          </span>
          <span className='right'>
            <strong>{topRightTag}</strong>
            {topRightMsg}
          </span>
        </div>
      </li>
      {middleLeftTag === '' ? null : (
        <li className='table-info lr-border'>
          <div className='space-between'>
            <span>
              <strong>{middleLeftTag}</strong>
              {middleLeftMsg}
            </span>
            <span className='right'>
              <strong>{middleRightTag}</strong>
              {middleRightMsg}
            </span>
          </div>
        </li>
      )}
      {bottomLeftTag === '' ? null : (
        <li className='table-info lr-border'>
          <div className='space-between'>
            <span>
              <strong>{bottomLeftTag}</strong>
              {bottomLeftMsg}
            </span>
            <span className='right'>
              <strong>{bottomRightTag}</strong>
              {bottomRightMsg}
            </span>
          </div>
        </li>
      )}
    </React.Fragment>
  );
};

export default GoalInfo;
