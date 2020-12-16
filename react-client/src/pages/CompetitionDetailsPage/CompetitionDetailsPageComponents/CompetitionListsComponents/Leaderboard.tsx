import React from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
import LeaderboardItem from './LeaderboardItem';

interface IProps {
  competitionArray: TCompetitionParticipantInfo[];
  isStarted: boolean;
  isHighestScoreWins: boolean;
}

const Leaderboard: React.FC<IProps> = ({
  competitionArray,
  isStarted,
  isHighestScoreWins,
}) => {
  //don't sort competition array directly because passed by reference
  let newCompetitionArray = competitionArray.map((x) => {
    return { name: x.name, score: x.score, userId: x.userId };
  });

  if (isHighestScoreWins) {
    newCompetitionArray.sort((a, b) => b.score - a.score);
  } else {
    newCompetitionArray.sort((a, b) => a.score - b.score);
  }

  let items = newCompetitionArray.map((item, index) => (
    <LeaderboardItem
      name={item.name}
      score={item.score}
      userId={item.userId}
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
