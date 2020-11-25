import React, { useState } from 'react';
import { TParticipant } from '../../../../types';
import ParticipantButtons from './ParticipantButtons';

interface IProps {
  participant: TParticipant;
  isAdmin: boolean;
  // compId: string;
}

//TODO - buttons for kick / admin, annotation for admin

const ParticipantItem: React.FC<IProps> = ({ participant, isAdmin }) => {
  const [userToggle, setUserToggle] = useState(false);
  let name = participant.name || 'TODO';
  let isAdminPending = false;

  let row = isAdmin ? (
    <React.Fragment>{name + ' (admin)'}</React.Fragment>
  ) : isAdminPending ? (
    <React.Fragment>{name + ' (admin pending)'} </React.Fragment>
  ) : (
    <React.Fragment>
      {name}
      <button
        className='btn-participants btn-primary'
        onClick={() => {
          setUserToggle((prevState) => !prevState);
        }}
      >
        <i className={userToggle ? 'fas fa-times' : 'fas fa-plus'} />
      </button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className='participant-row space-between lr-border'>{row}</div>
      {userToggle && (
        <ParticipantButtons
          // letter={letter}
          setUserToggle={setUserToggle}
        />
      )}
    </React.Fragment>
  );
};

export default ParticipantItem;
