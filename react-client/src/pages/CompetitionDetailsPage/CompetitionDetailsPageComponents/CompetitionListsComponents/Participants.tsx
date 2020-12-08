import React from 'react';
import { TParticipant } from '../../../../types';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
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
  const participantList = participants.map((participant, index) => {
    let isAdmin =
      admins.findIndex((admin) => admin === participant.userId) !== -1;
    // let letter = adminLetters.find(
    //   (letter) => letter.userId === participant.userId
    // );
    return (
      <ParticipantItem
        key={index}
        participant={participant}
        isAdmin={isAdmin}
        isLast={index === participants.length - 1}
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
    </CollapsibleListContainer>
  );
};

export default Participants;
