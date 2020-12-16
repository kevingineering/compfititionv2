import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../../redux/Store';

interface IProps {
  name: string;
  score: number;
  userId: string;
  place: number;
  isStarted: boolean;
}

const LeaderboardItem: React.FC<IProps> = ({
  name,
  score,
  userId,
  place,
  isStarted,
}) => {
  const userState = useSelector((state: RootStore) => state.userState);
  return (
    <LeaderboardItemContainer>
      <span>
        {isStarted && `${place}. `}
        {userId === userState.user!.userId! ? (
          <strong>{name}</strong>
        ) : (
          <Link to={`/friend/${userId}`}>
            <strong>{name}</strong>
          </Link>
        )}
      </span>
      {isStarted && <span>{score}</span>}
    </LeaderboardItemContainer>
  );
};

export default LeaderboardItem;

const LeaderboardItemContainer = styled.div`
  padding: 0.1rem 0.5rem;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  margin: 0;
  min-height: 0.5rem;
`;
