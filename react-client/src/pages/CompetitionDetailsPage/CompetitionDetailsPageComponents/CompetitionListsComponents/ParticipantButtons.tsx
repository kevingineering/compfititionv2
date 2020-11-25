import React, { useState } from 'react';

interface IProps {
  // compId: string;
  setUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParticipantButtons: React.FC<IProps> = ({ setUserToggle }) => {
  const [deleteToggle, setDeleteToggle] = useState(false);

  // const { kickUserFromCompetition } = useContext(CompetitionContext)

  // const { addLetter, deleteLetter } = useContext(LetterContext)

  const handleDeleteLetter = () => {
    // setUserToggle(false)
    // deleteLetter(letter._id)
  };

  const handleSendLetter = () => {
    // setUserToggle(false)
    // const fields = {
    //   type: 'LetterAdmin',
    //   compId: compId,
    //   compName: compName,
    //   userId: userId,
    // }
    // addLetter(fields)
  };

  //TODO
  let letter = false;

  let buttons = letter ? (
    <React.Fragment>
      <button
        className='btn btn-split btn-primary height-4rem'
        onClick={handleDeleteLetter}
      >
        Delete Admin Request
      </button>
      <button
        className='btn btn-split btn-danger height-4rem'
        onClick={() => setDeleteToggle(true)}
      >
        Kick User
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <button className='btn btn-split btn-primary' onClick={handleSendLetter}>
        Make Admin
      </button>
      <button
        className='btn btn-split btn-danger'
        onClick={() => setDeleteToggle(true)}
      >
        Kick User
      </button>
    </React.Fragment>
  );

  if (deleteToggle) {
    buttons = (
      <div className='lr-border'>
        <span className='participant-row block'>
          Are you sure you want to kick this user? This action cannot be undone.
        </span>
        <button
          className='btn btn-primary btn-split margin-0'
          onClick={() => setDeleteToggle(false)}
        >
          No
        </button>
        <button
          className='btn btn-danger btn-split margin-0'
          onClick={() => {
            setDeleteToggle(false);
            // kickUserFromCompetition(compId, userId)
          }}
        >
          Yes
        </button>
      </div>
    );
  }

  return <React.Fragment>{buttons}</React.Fragment>;
};

export default ParticipantButtons;
