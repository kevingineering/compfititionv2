import React from 'react';
import { TParticipant } from '../../../../types';
import CollapsibleListContainer from '../../../../sharedComponents/CollapsibleListContainer';
import ParticipantItem from './ParticipantItem';

interface IProps {
  participants: TParticipant[];
  admins: string[];
  // adminLetters: string[];
}

const Participants: React.FC<IProps> = ({
  participants,
  admins,
  // adminLetters,
}) => {
  const participantList = participants.map((participant) => {
    let isAdmin = admins.findIndex((x) => x === participant.userId) !== -1;
    // let letter = adminLetters.find(
    //   (letter) => letter.userId === participant.userId
    // );
    return (
      <ParticipantItem
        key={participant.userId}
        participant={participant}
        isAdmin={isAdmin}
        // letter={letter}
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
