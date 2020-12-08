import React from 'react';
import { TCompetition, EGoalType } from '../../../../types';
import { cleanNumber } from '../../../../util/dateFunctions';
import moment from 'moment';
import { getGoalScore } from '../../../../util/goalFunctions';
import {
  TableInfo,
  WhiteSpaceSpan,
} from '../../../../sharedComponents/styledComponents/Misc';

interface IProps {
  competition: TCompetition;
  time: number;
  record: (number | null)[];
  initialValue?: number;
  target?: number;
  isStarted: boolean;
  isFinished: boolean;
}

//TODO

const CompInfo: React.FC<IProps> = ({
  competition,
  time,
  record,
  initialValue,
  target,
  isStarted,
  isFinished,
}) => {
  const {
    duration,
    startTime,
    description,
    units,
    type,
    frequency,
  } = competition;
  const formattedDate = moment.utc(startTime).format('MMMM Do, YYYY');
  const formattedDateTime = moment
    .utc(startTime)
    .format('MMMM Do, YYYY, h:mm a');
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
      middleLeftTag = 'Success Total: ';
      middleLeftMsg = `${score} / ${(duration * frequency!) / 7} (${Math.round(
        (score / ((duration * frequency!) / 7)) * 100
      )}%)`;
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
    //TEST
  } else if (isStarted) {
    topLeftTag = 'Start Date: ';
    topLeftMsg = formattedDate;
    if (type === EGoalType.passfail) {
      middleLeftTag = 'Success To Date: ';
      middleLeftMsg = `${score} / ${time + 1} (${Math.round(
        (score / (time + 1)) * 100
      )}%)`;
      bottomLeftTag = 'Success Total: ';
      bottomLeftMsg = `${score} / ${(duration * frequency!) / 7} (${Math.round(
        (score / ((duration * frequency!) / 7)) * 100
      )}%)`;
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
    topLeftMsg = formattedDateTime;
    topRightTag = 'Duration: ';
    topRightMsg = `${duration} days`;
    if (type === EGoalType.passfail) {
    } else if (type === EGoalType.cumulative && isParticipant) {
      middleLeftTag = 'My Goal: ';
      middleLeftMsg = `${target!} ${units}`;
    } else if (type === EGoalType.difference && isParticipant) {
      middleLeftTag = 'My Start: ';
      middleLeftMsg = initialValue ? `${initialValue!} ${units}` : 'Set below!';
      middleRightTag = 'My Goal: ';
      middleRightMsg = `${target!} ${units}`;
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

export default CompInfo;
