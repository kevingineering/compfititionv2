import React from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import { Link } from 'react-router-dom';

interface IProps {
  item: TCompetitionParticipantInfo;
  place: number;
  isStarted: boolean;
}

const LeaderboardItem: React.FC<IProps> = ({ item, place, isStarted }) => {
  return (
    <div className='leaderboard-item lr-border'>
      <span>
        {isStarted && `${place}. `}
        <Link to={`/friend/${item.userId}`} className='bold'>
          {item.name}
        </Link>
      </span>
      {isStarted && <span>{item.score}</span>}
    </div>
  );
};

export default LeaderboardItem;
