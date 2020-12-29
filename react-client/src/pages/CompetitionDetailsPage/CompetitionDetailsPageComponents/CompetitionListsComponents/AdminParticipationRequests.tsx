import React from 'react';
import { TCompetition } from '../../../../types';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';

interface IProps {
  competition: TCompetition;
}

const AdminParticipationRequests: React.FC<IProps> = ({ competition }) => {
  var ParticipationRequests = competition.participationRequests.map(
    (pr, index) => <p key={index}>{pr.name}</p>
  );
  return (
    <CollapsibleListContainer
      title='Requests to Join'
      isCollapsible={false}
      isH3={true}
    >
      {ParticipationRequests}
      <hr />
    </CollapsibleListContainer>
  );
};

export default AdminParticipationRequests;
