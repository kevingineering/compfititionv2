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
import ParticipantRequest from './ParticipantRequest';
import { ListContainer } from '../CompetitionDetailsPageStyledComponents';
import {
  StandardContainer,
  MessageInBorderedSpace,
} from '../../../sharedComponents/styledComponents/Misc';
import { Button } from '../../../sharedComponents/styledComponents/Button';
import styled from 'styled-components';
import Admins from './CompetitionListsComponents/Admins';
import AdminParticipantRequests from './CompetitionListsComponents/AdminParticipantRequests';
import AdminRequestMenu from './CompetitionListsComponents/AdminRequestMenu';

//TODO - IProps
interface IProps {
  isAdmin: boolean;
  isAdminView: boolean;
  setIsAdminView: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  competition: TCompetition;
  competitionArray: TCompetitionParticipantInfo[];
  participantId?: string;
  loadingButton: string;
  buttonIds: string[];
  userId: string;
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
  buttonIds,
  userId,
}) => {
  const dispatch = useDispatch();
  const handleRelinquish = () => {
    dispatch(RelinquishAdmin(competition.competitionId));
  };

  return (
    <StandardContainer>
      {/* Allows user to send or delete request to join competition */}
      {participantId === undefined && (
        <ParticipantRequest
          loadingButton={loadingButton}
          competitionId={competition.competitionId}
          userId={userId}
          hasRequest={
            competition.participantRequests.findIndex((x) => x === userId) !==
            -1
          }
          hasInvite={competition.invites.findIndex((x) => x === userId) !== -1}
        />
      )}
      {/* Shows participants menu if they have been asked to be an admin */}
      {competition.adminRequests.findIndex((x) => x === userId) !== -1 && (
        <AdminRequestMenu
          userId={userId}
          competitionId={competition.competitionId}
          loadingButton={loadingButton}
        />
      )}
      {/* Shows admin users who have requested to join competition */}
      {isAdmin && competition.participantRequests.length !== 0 && (
        <AdminParticipantRequests competition={competition} />
      )}
      {/* Shows admin button that allows them to toggle between admin view and user view */}
      {isAdmin && (
        <ListContainer>
          <CompetitionListButton
            onClick={() => setIsAdminView((prevState) => !prevState)}
          >
            <h3>{isAdminView ? 'View as User' : 'View as Admin'}</h3>
          </CompetitionListButton>
        </ListContainer>
      )}
      {/* Shows users leaderboard and admins*/}
      {!isAdminView && (
        <React.Fragment>
          <Leaderboard
            competitionArray={competitionArray}
            isStarted={isStarted}
            isHighestScoreWins={competition.isHighestScoreWins}
          />
          <Admins
            participants={competition.participants}
            admins={competition.admins}
          />
        </React.Fragment>
      )}
      {/* Shows admin participants they can promote or remove */}
      {isAdminView && (
        <Participants competition={competition} buttonIds={buttonIds} />
      )}
      {/* Shows admin users they can or already have invited */}
      {isAdminView && !isStarted && (
        <Invites competition={competition} buttonIds={buttonIds} />
      )}
      {/* Button to allow admins to stop being an admin */}
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
