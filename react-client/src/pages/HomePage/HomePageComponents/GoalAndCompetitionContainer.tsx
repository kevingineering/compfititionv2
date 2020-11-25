import React from 'react';
import CollapsibleListContainer from '../../../sharedComponents/CollapsibleListContainer';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';
import GoalList from './GoalList';
import LoadingSpinner from '../../../sharedComponents/LoadingSpinner';
import { NO_BUTTON } from '../../../redux/buttonTypes';

interface IProps {
  isOwner: boolean;
}

//used for both user and friend pages
const GoalAndCompetitionContainer: React.FC<IProps> = ({ isOwner }) => {
  const goalState = useSelector((state: RootStore) => state.goalState);
  const competitionState = useSelector(
    (state: RootStore) => state.competitionState
  );
  const friendState = useSelector((state: RootStore) => state.friendState);

  //decide user or friend info
  const activeGoals = isOwner
    ? goalState.activeGoals
    : friendState.friend!.activeGoals;
  const pastGoals = isOwner
    ? goalState.pastGoals
    : friendState.friend!.pastGoals;
  const activeCompetitions = isOwner
    ? competitionState.activeCompetitionGoals
    : friendState.friend!.activeCompetitions;
  const pastCompetitions = isOwner
    ? competitionState.pastCompetitionGoals
    : friendState.friend!.pastCompetitions;

  //controls loading spinner
  const isLoading =
    goalState.loadingButton === NO_BUTTON ||
    friendState.loadingButton === NO_BUTTON ||
    competitionState.loadingButton === NO_BUTTON;

  return (
    <div>
      <CollapsibleListContainer
        title='Active Goals'
        hasLink={isOwner && true}
        linkTo='/addgoal'
        linkMessage='Add Goal'
      >
        {isLoading ? (
          <LoadingSpinner hasContainer={true} />
        ) : activeGoals.length !== 0 ? (
          <GoalList goals={activeGoals} isOwner={isOwner} isComp={false} />
        ) : (
          <span className='empty-collection'>
            {isOwner
              ? 'You have no active goals.'
              : 'This user has no active goals.'}
          </span>
        )}
      </CollapsibleListContainer>
      <CollapsibleListContainer
        title='Active Competitions'
        hasLink={isOwner && true}
        linkTo='/addcompetition'
        linkMessage='Add Competition'
      >
        {isLoading ? (
          <LoadingSpinner hasContainer={true} />
        ) : activeCompetitions.length !== 0 ? (
          <GoalList
            goals={activeCompetitions}
            isOwner={isOwner}
            isComp={true}
          />
        ) : (
          <span className='empty-collection'>
            {isOwner
              ? 'You have no active competitions.'
              : 'This user has no active competitions.'}
          </span>
        )}
      </CollapsibleListContainer>
      {!isLoading && pastGoals.length !== 0 && (
        <CollapsibleListContainer title='Past Goals' hasLink={false}>
          <GoalList goals={pastGoals} isOwner={isOwner} isComp={false} />
        </CollapsibleListContainer>
      )}
      {!isLoading && pastCompetitions.length !== 0 && (
        <CollapsibleListContainer title='Past Competitions' hasLink={false}>
          <GoalList goals={pastCompetitions} isOwner={isOwner} isComp={true} />
        </CollapsibleListContainer>
      )}
    </div>
  );
};

export default GoalAndCompetitionContainer;
