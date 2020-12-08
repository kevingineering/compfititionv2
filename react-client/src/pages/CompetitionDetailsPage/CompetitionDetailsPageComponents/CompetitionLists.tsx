import React from 'react';
import Leaderboard from './CompetitionListsComponents/Leaderboard';
import Participants from './CompetitionListsComponents/Participants';
import Invites from './CompetitionListsComponents/Invites';
import { TCompetition } from '../../../types';
import ToggleButtonModule from '../../../sharedComponents/misc/ToggleButtonModule';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';
import { RelinquishAdmin } from '../../../redux/competition/actions';
import { useDispatch } from 'react-redux';
import { RELINQUISH_ADMIN_BUTTON } from '../../../redux/buttonTypes';
import CompetitionRequests from './CompetitionRequests';
import { ListContainer } from '../CompetitionDetailsPageStyledComponents';
import {
  StandardContainer,
  MessageInBorderedSpace,
} from '../../../sharedComponents/styledComponents/Misc';
import { Button } from '../../../sharedComponents/styledComponents/Button';
import styled from 'styled-components';
import Admins from './CompetitionListsComponents/Admins';

interface IProps {
  isAdmin: boolean;
  isAdminView: boolean;
  setIsAdminView: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  competition: TCompetition;
  competitionArray: TCompetitionParticipantInfo[];
  participantId?: string;
  loadingButton: string;
}

const CompetitionLists: React.FC<IProps> = ({
  isAdmin,
  isAdminView,
  setIsAdminView,
  isStarted,
  competition,
  competitionArray,
  participantId,
  loadingButton,
}) => {
  const dispatch = useDispatch();
  const handleRelinquish = () => {
    dispatch(RelinquishAdmin(competition.id));
  };

  // Show participants leaderboard and admin list
  // Show button for admins to toggle between participant/admin views
  // In admin view, show admins requests, participants, and button to relinquish admin role

  return (
    <StandardContainer>
      {participantId === undefined && (
        <CompetitionRequests loadingButton={loadingButton} />
      )}
      {isAdmin && (
        <ListContainer>
          <CompetitionListButton
            onClick={() => setIsAdminView((prevState) => !prevState)}
          >
            <h3>{isAdminView ? 'View as User' : 'View as Admin'}</h3>
          </CompetitionListButton>
        </ListContainer>
      )}
      {!isAdminView && (
        <Leaderboard
          competitionArray={competitionArray}
          isStarted={isStarted}
          isHighestScoreWins={competition.isHighestScoreWins}
        />
      )}
      {!isAdminView && (
        <Admins
          participants={competition.participants}
          admins={competition.admins}
        />
      )}
      {isAdminView && (
        <Participants
          participants={competition.participants}
          admins={competition.admins}
        />
      )}
      {isAdminView && !isStarted && (
        <Invites
          compId={competition.id}
          participants={competition.participants}
        />
      )}
      {isAdminView && (
        <ListContainer>
          <ToggleButtonModule
            handleClick={handleRelinquish}
            isLoading={loadingButton === RELINQUISH_ADMIN_BUTTON}
            topButton='Relinquish Admin Role'
            isStandalone={true}
          >
            <MessageInBorderedSpace>
              Are you sure you want to relinquish your admin responsibilities? A
              competition must have at least one admin. If no admin exists, one
              will be appointed.
            </MessageInBorderedSpace>
          </ToggleButtonModule>
        </ListContainer>
      )}
    </StandardContainer>
  );
};

export default CompetitionLists;

export const CompetitionListButton = styled(Button)`
  background: var(--primary-color);
  color: var(--secondary-color);
  display: block;
  width: 100%;
`;
