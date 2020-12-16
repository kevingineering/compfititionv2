import React from 'react';
import moment from 'moment';
import { getGoalScore } from '../../util/goalFunctions';
import { getGoalTime, cleanNumber } from '../../util/dateFunctions';
import { TGoal, EGoalCategory } from '../../types';
import { TableInfo, WhiteSpaceSpan } from '../styledComponents/Misc';

interface IProps {
  goal: TGoal;
  time: number;
  record: (number | null)[];
  isFinished: boolean;
}

//messaging to describe goal - varies greatly depending on category and time status
const GoalInfo: React.FC<IProps> = ({ goal, time, record, isFinished }) => {
  const {
    duration,
    startTime,
    description,
    units,
    target,
    daysPerWeek,
    category,
    initialValue,
  } = goal;
  const { isStarted } = getGoalTime(startTime, duration);
  const formattedDate = moment.utc(startTime).format('MMMM Do, YYYY');
  const formattedDateTime = moment
    .utc(startTime)
    .format('MMMM Do, YYYY, h:mm a');
  const score = cleanNumber(getGoalScore(category, record, initialValue));

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
    if (category === EGoalCategory.passfail) {
      middleLeftTag = 'Success Total: ';
      middleLeftMsg = `${score} / ${
        (duration * daysPerWeek!) / 7
      } (${Math.round((score / ((duration * daysPerWeek!) / 7)) * 100)}%)`;
    } else if (category === EGoalCategory.cumulative) {
      topRightTag = 'Duration: ';
      topRightMsg = `${duration} days`;
      middleLeftTag = 'Total: ';
      middleLeftMsg = `${score} / ${target} ${units}`;
      middleRightTag = 'Goal Completion: ';
      middleRightMsg = `${Math.round((score / target!) * 100)}%`;
    } else if (category === EGoalCategory.difference) {
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
    // TEST
  } else if (isStarted) {
    topLeftTag = 'Start Date: ';
    topLeftMsg = formattedDate;
    if (category === EGoalCategory.passfail) {
      middleLeftTag = 'Success To Date: ';
      middleLeftMsg = `${score} / ${time + 1} (${Math.round(
        (score / (time + 1)) * 100
      )}%)`;
      bottomLeftTag = 'Success Total: ';
      bottomLeftMsg = `${score} / ${
        (duration * daysPerWeek!) / 7
      } (${Math.round((score / ((duration * daysPerWeek!) / 7)) * 100)}%)`;
    } else if (category === EGoalCategory.cumulative) {
      topRightTag = 'Day: ';
      topRightMsg = `${time + 1} / ${duration}`;
      middleLeftTag = 'Total: ';
      middleLeftMsg = `${score} / ${target} ${units}`;
      middleRightTag = 'Goal Completion: ';
      middleRightMsg = `${Math.round((score / target!) * 100)}%`;
    } else if (category === EGoalCategory.difference) {
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
    topLeftMsg = formattedDateTime;
    topRightTag = 'Duration: ';
    topRightMsg = `${duration} days`;
    if (category === EGoalCategory.passfail) {
    } else if (category === EGoalCategory.cumulative) {
      middleLeftTag = 'Goal: ';
      middleLeftMsg = `${target} ${units}`;
    } else if (category === EGoalCategory.difference) {
      middleLeftTag = 'Start: ';
      middleLeftMsg = `${initialValue!} ${units}`;
      middleRightTag = 'Goal: ';
      middleRightMsg = `${target} ${units}`;
    }
  }

  return (
    <React.Fragment>
      {description && (
        <TableInfo>
          <p>
            <strong>Description: </strong>
            <WhiteSpaceSpan>{description}</WhiteSpaceSpan>
          </p>
        </TableInfo>
      )}
      <TableInfo>
        <div>
          <span>
            <strong>{topLeftTag}</strong>
            {topLeftMsg}
          </span>
          <span>
            <strong>{topRightTag}</strong>
            {topRightMsg}
          </span>
        </div>
      </TableInfo>
      {middleLeftTag === '' ? null : (
        <TableInfo>
          <div>
            <span>
              <strong>{middleLeftTag}</strong>
              {middleLeftMsg}
            </span>
            <span>
              <strong>{middleRightTag}</strong>
              {middleRightMsg}
            </span>
          </div>
        </TableInfo>
      )}
      {bottomLeftTag === '' ? null : (
        <TableInfo>
          <div>
            <span>
              <strong>{bottomLeftTag}</strong>
              {bottomLeftMsg}
            </span>
            <span>
              <strong>{bottomRightTag}</strong>
              {bottomRightMsg}
            </span>
          </div>
        </TableInfo>
      )}
    </React.Fragment>
  );
};

export default GoalInfo;
