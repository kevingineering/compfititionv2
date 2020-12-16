import React from 'react';
import { TParticipant } from '../../../../types';
import AdminItem from './AdminItem';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';

interface IProps {
  participants: TParticipant[];
  admins: string[];
}

const Admins: React.FC<IProps> = ({ participants, admins }) => {
  const adminList = admins.map((admin, index) => {
    let loc = participants.findIndex(
      (participant) => participant.userId === admin
    );
    return (
      <AdminItem key={index} name={participants[loc].name} userId={admin} />
    );
  });

  return (
    <CollapsibleListContainer title='Admins' isCollapsible={false} isH3={true}>
      {adminList}
      <hr />
    </CollapsibleListContainer>
  );
};

export default Admins;
