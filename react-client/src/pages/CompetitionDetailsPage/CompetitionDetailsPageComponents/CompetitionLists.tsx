import React from 'react';
import Leaderboard from './CompetitionListsComponents/Leaderboard';
import Participants from './CompetitionListsComponents/Participants';
import Invites from './CompetitionListsComponents/Invites';
import { TCompetition } from '../../../types';
import ToggleButtonModule from '../../../sharedComponents/ToggleButtonModule';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';
import { RemoveAdminFromCompetition } from '../../../redux/competition/actions';
import { useDispatch } from 'react-redux';
import { REMOVE_ADMIN_FROM_COMPETITION_BUTTON } from '../../../redux/buttonTypes';
import CompetitionRequests from './CompetitionRequests';

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

//TODO

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
    dispatch(RemoveAdminFromCompetition(competition.id, participantId!));
  };

  // Show participants leaderboard
  // Show button for admins to toggle between participant/admin views
  // In admin view, show admins requests, participants, and button to relinquish admin role

  return (
    <div className='form-container'>
      {participantId === undefined && (
        <CompetitionRequests loadingButton={loadingButton} />
      )}
      {isAdmin && (
        <div className='collection competition-lists-container'>
          <button
            className='btn btn-block btn-primary'
            onClick={() => setIsAdminView((prevState) => !prevState)}
          >
            <h3>{isAdminView ? 'View as User' : 'View as Admin'}</h3>
          </button>
        </div>
      )}
      <Leaderboard competitionArray={competitionArray} isStarted={isStarted} />
      {isAdminView && isStarted && (
        <Participants
          participants={competition.participants}
          admins={competition.admins}
        />
      )}
      {isAdminView && !isStarted && <Invites compId={competition.id} />}
      {isAdminView && (
        <div className='collection competition-lists-container'>
          <ToggleButtonModule
            handleClick={handleRelinquish}
            isLoading={loadingButton === REMOVE_ADMIN_FROM_COMPETITION_BUTTON}
            topButton='Relinquish Admin Role'
            isStandalone={true}
          >
            <span className='alert lr-border'>
              Are you sure you want to relinquish your admin responsibilities? A
              competition must have at least one admin. If no admin exists, one
              will be appointed.
            </span>
          </ToggleButtonModule>
        </div>
      )}
    </div>
  );
};

export default CompetitionLists;
