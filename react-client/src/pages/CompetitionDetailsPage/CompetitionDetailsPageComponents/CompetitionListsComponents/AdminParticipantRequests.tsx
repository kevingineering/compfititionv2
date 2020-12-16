import React from 'react';
import { TCompetition } from '../../../../types';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';

interface IProps {
  competition: TCompetition;
}

const AdminParticipantRequests: React.FC<IProps> = ({ competition }) => {
  var participantRequests = competition.participantRequests.map((pr, index) => (
    //TODO - username
    <p key={index}>{pr.substr(0, 6)}</p>
  ));
  return (
    <CollapsibleListContainer
      title='Requests to Join'
      isCollapsible={false}
      isH3={true}
    >
      {participantRequests}
      <hr />
    </CollapsibleListContainer>
  );
};

export default AdminParticipantRequests;
