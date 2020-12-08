import React from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import { CompTablePFButtons } from '../../CompetitionDetailsPageStyledComponents';
import { PFButton } from '../../../../sharedComponents/styledComponents/Misc';

interface IProps {
  participant: TCompetitionParticipantInfo;
  days: number;
}

const CompPassFailButtons: React.FC<IProps> = ({ participant, days }) => {
  const buttons: JSX.Element[] = [];
  for (let i = 0; i < days; i++) {
    buttons.push(
      <CompTablePFButtons isFirst={i === 0} key={i}>
        {participant.dataArray[i] !== undefined && (
          <PFButton
            className={`fas ${
              participant.dataArray[i] ? 'fa-check' : 'fa-times'
            }`}
            isSuccess={participant.dataArray[i]}
          />
        )}
      </CompTablePFButtons>
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
