import React from 'react';
import { TCompetition } from '../../../../types';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
import ParticipantItem from './ParticipantItem';

interface IProps {
  competition: TCompetition;
  buttonIds: string[];
}

const Participants: React.FC<IProps> = ({ competition, buttonIds }) => {
  const participantList = competition.participants.map((participant, index) => {
    let isAdmin =
      competition.admins.findIndex((admin) => admin === participant.userId) !==
      -1;
    let hasAdminRequest =
      competition.adminRequests.findIndex(
        (request) => request === participant.userId
      ) !== -1;

    return (
      <ParticipantItem
        key={index}
        participant={participant}
        isAdmin={isAdmin}
        isLast={index === competition.participants.length - 1}
        hasAdminRequest={hasAdminRequest}
        competitionId={competition.competitionId}
        buttonIds={buttonIds}
      />
    );
  });

  return (
    <CollapsibleListContainer
      title='Manage Participants'
      isCollapsible={false}
      isH3={true}
    >
      {participantList}
      <hr />
    </CollapsibleListContainer>
  );
};

export default Participants;
