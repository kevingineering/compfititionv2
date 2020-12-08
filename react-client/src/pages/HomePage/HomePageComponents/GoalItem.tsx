import React from 'react';
import { getGoalTime, cleanNumber } from '../../../util/dateFunctions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getGoalScore, getGoalRecord } from '../../../util/goalFunctions';
import { EGoalType, TGoal } from '../../../types';
import { FlexContainer } from '../../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

interface IProps {
  goal: TGoal;
  isOwner: boolean;
  isComp: boolean;
}

const GoalItem: React.FC<IProps> = ({ goal, isOwner, isComp }) => {
  const { startTime, duration, type, units, id, name } = goal;
  const { isStarted, time, isFinished } = getGoalTime(startTime, duration);

  //calc progress
  let progressTag = '';
  let progressMessage = '';

  const record = getGoalRecord(goal);

  const score = cleanNumber(getGoalScore(goal.type, record, goal.initialValue));

  if (type === EGoalType.passfail) {
    progressTag = 'Success: ';
    progressMessage = `${score} / ${isFinished ? record.length : time + 1}`;
  } else if (type === EGoalType.cumulative) {
    progressTag = 'Total: ';
    progressMessage = `${score} ${units}`;
  } else {
    progressTag = 'Change: ';
    progressMessage = `${score > 0 ? '+' : ''}${score} ${units}`;
  }

  return (
    <CollectionItem>
      <FlexContainer>
        <ItemName
          to={
            isComp
              ? '/competition/' + id
              : isOwner
              ? '/goal/' + id
              : '/friend/goal/' + id
          }
        >
          {name}
        </ItemName>
      </FlexContainer>
      {!isFinished ? (
        <RightContainer>
          {/* TEST */}
          {isStarted ? (
            <React.Fragment>
              <SpanRight>
                <strong>Day: </strong>
                {time + 1} / {duration}
              </SpanRight>
              <br />
              <SpanRight>
                <strong>{progressTag}</strong>
                {progressMessage}
              </SpanRight>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SpanRight>Begins </SpanRight>
              <br />
              <SpanRight>{moment.utc(startTime).format('MMM Do')}</SpanRight>
            </React.Fragment>
          )}
        </RightContainer>
      ) : (
        <RightContainer>
          <strong>Final {progressTag}</strong>
          <span>{progressMessage}</span>
        </RightContainer>
      )}
    </CollectionItem>
  );
};

export default GoalItem;

export const SpanRight = styled.span`
  float: right;
  white-space: nowrap;
`;

export const RightContainer = styled.div`
  margin: auto 0;
  padding-left: 0.5rem;
  text-align: right;
  span {
    white-space: nowrap;
  }
  @media (max-width: 32rem) {
    display: none;
  }
`;

const CollectionItem = styled.div`
  padding: 0.4rem 0.8rem;
  border: 0.125rem solid var(--primary-color);
  border-top: 0;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const ItemName = styled(Link)`
  margin: auto;
  font-size: 1.17em;
  font-weight: bold;
`;
