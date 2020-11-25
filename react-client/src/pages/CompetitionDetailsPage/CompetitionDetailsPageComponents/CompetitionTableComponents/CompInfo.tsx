import React from 'react';
import { TCompetition, EGoalType } from '../../../../types';
import { cleanNumber } from '../../../../util/dateFunctions';
import moment from 'moment';
import { getGoalScore } from '../../../../util/goalFunctions';

interface IProps {
  competition: TCompetition;
  time: number;
  record: (number | null)[];
  initialValue?: number;
  target?: number;
  isStarted: boolean;
}

//TODO

const CompInfo: React.FC<IProps> = ({
  competition,
  time,
  record,
  initialValue,
  target,
  isStarted,
}) => {
  const { duration, startDate, description, units, type } = competition;
  const isFinished = time === duration;
  const formattedDate = moment.utc(startDate).format('MMMM Do, YYYY');
  const score = cleanNumber(getGoalScore(type, record, initialValue));

  //for clarity - if target exists, user is participant
  const isParticipant = target;

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
    } else if (type === EGoalType.cumulative) {
      topRightTag = 'Duration: ';
      if (isParticipant) {
        topRightMsg = `${duration} days`;
        middleLeftTag = 'My Goal: ';
        middleLeftMsg = `${score} / ${target} ${units}`;
        middleRightTag = 'Goal Completion: ';
        middleRightMsg = `${Math.round((score / target!) * 100)}%`;
      }
    } else if (type === EGoalType.difference) {
      topRightTag = 'Duration: ';
      topRightMsg = `${duration} days`;
      if (isParticipant) {
        middleLeftTag = 'My Start: ';
        middleLeftMsg = `${initialValue!} ${units}`;
        middleRightTag = 'My Goal: ';
        middleRightMsg = `${target!} ${units}`;
        bottomLeftTag = 'My Final: ';
        bottomLeftMsg = `${initialValue! + score} ${units}`;
        bottomRightTag = 'My Change: ';
        bottomRightMsg = `${score > 0 ? '+' : ''}${score} ${units}`;
      }
    }
  } else if (isStarted) {
    topLeftTag = 'Start Date: ';
    topLeftMsg = formattedDate;
    if (type === EGoalType.passfail) {
    } else if (type === EGoalType.cumulative) {
      topRightTag = 'Day: ';
      topRightMsg = `${time + 1} / ${duration}`;
      if (isParticipant) {
        middleLeftTag = 'My Goal: ';
        middleLeftMsg = `${score} / ${target!} ${units}`;
        middleRightTag = 'Goal Completion: ';
        middleRightMsg = `${Math.round((score / target!) * 100)}%`;
      }
    } else if (type === EGoalType.difference) {
      topRightTag = 'Day: ';
      topRightMsg = `${time + 1} / ${duration}`;
      if (isParticipant) {
        middleLeftTag = 'My Start: ';
        middleLeftMsg = `${initialValue!} ${units}`;
        middleRightTag = 'My Goal: ';
        middleRightMsg = `${target!} ${units}`;
        bottomLeftTag = 'My Current: ';
        bottomLeftMsg = `${initialValue! + score} ${units}`;
        bottomRightTag = 'My Change: ';
        bottomRightMsg = `${score > 0 ? '+' : ''}${score} ${units}`;
      }
    }
  } else {
    topLeftTag = 'Begins: ';
    topLeftMsg = formattedDate;
    topRightTag = 'Duration: ';
    topRightMsg = `${duration} days`;
    if (type === EGoalType.passfail) {
    } else if (type === EGoalType.cumulative && isParticipant) {
      middleLeftTag = 'My Goal: ';
      middleLeftMsg = `${target!} ${units}`;
    } else if (type === EGoalType.difference && isParticipant) {
      middleLeftTag = 'My Start: ';
      middleLeftMsg = `${initialValue!} ${units}`;
      middleRightTag = 'My Goal: ';
      middleRightMsg = `${target!} ${units}`;
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

export default CompInfo;
