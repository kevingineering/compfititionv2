import React from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import CollapsibleListContainer from '../../../../sharedComponents/CollapsibleListContainer';
import LeaderboardItem from './LeaderboardItem';

//TODO
interface IProps {
  competitionArray: TCompetitionParticipantInfo[];
  isStarted: boolean;
}

const Leaderboard: React.FC<IProps> = ({ competitionArray, isStarted }) => {
  let items = competitionArray.map((item, index) => (
    <LeaderboardItem
      item={item}
      key={index}
      place={index + 1}
      isStarted={isStarted}
    />
  ));

  return (
    <CollapsibleListContainer
      title={isStarted ? 'Leaderboard' : 'Participants'}
      isCollapsible={false}
      isH3={true}
    >
      {items}
      <hr />
    </CollapsibleListContainer>
  );
};

export default Leaderboard;
