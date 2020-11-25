import React from 'react';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';

interface IProps {
  participant: TCompetitionParticipantInfo;
  days: number;
}

const CompPassFailButtons: React.FC<IProps> = ({ participant, days }) => {
  const buttons: JSX.Element[] = [];
  for (let i = 0; i < days; i++) {
    buttons.push(
      <button
        className={`table-btn-pf disabled-opaque ${
          i === 0 ? 'no-left-border' : ''
        }`}
        key={i}
      >
        {participant.dataArray[i] !== undefined && (
          <i
            className={`fas ${
              participant.dataArray[i]
                ? 'fa-check success-color'
                : 'fa-times danger-color'
            }`}
          />
        )}
      </button>
    );
  }

  return (
    <li key={participant.userId}>
      <span>
        <span>{buttons}</span>
      </span>
    </li>
  );
};

export default CompPassFailButtons;
