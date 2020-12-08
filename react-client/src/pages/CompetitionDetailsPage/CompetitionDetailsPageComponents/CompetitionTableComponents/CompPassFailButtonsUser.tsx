import React, { useRef, useEffect } from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import { useDispatch } from 'react-redux';
import { ClearAlert, SetAlert } from '../../../../redux/alert/actions';
import { CompTablePFButtons } from '../../CompetitionDetailsPageStyledComponents';
import { PFButton } from '../../../../sharedComponents/styledComponents/Misc';

interface IProps {
  participant: TCompetitionParticipantInfo;
  days: number;
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  record: (number | null)[];
  time: number;
  isFinished: boolean;
}

const CompPassFailButtonsUser: React.FC<IProps> = ({
  participant,
  days,
  time,
  setRecord,
  record,
  isFinished,
}) => {
  const dispatch = useDispatch();
  const todayRef = useRef<HTMLButtonElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isFinished || time < 0) {
      return;
    }
    let clickLoc = parseInt(event.currentTarget.name);
    if (time === clickLoc || time === clickLoc + 1) {
      dispatch(ClearAlert());
      setRecord(
        record.map((value, index) => {
          if (index === clickLoc) {
            if (value === 0) {
              value = 1;
            } else value = 0;
          }
          return value;
        })
      );
    } else {
      dispatch(SetAlert('You can only record data for today and yesterday.'));
    }
  };

  const buttons: JSX.Element[] = [];
  for (let i = 0; i < days; i++) {
    buttons.push(
      <CompTablePFButtons
        isFirst={i === 0}
        isToday={time === i}
        isYesterday={time === i + 1}
        ref={time === i ? todayRef : null}
        onClick={handleClick}
        name={i.toString()}
        key={i}
      >
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

  //makes current day visible in scroll area
  useEffect(() => {
    if (todayRef.current) {
      //block end makes pushes day down veritically
      //inline center centers in scroll area
      todayRef.current.scrollIntoView({ block: 'end', inline: 'center' });
    }
  }, [todayRef]);

  return (
    <li key={participant.userId}>
      <span>
        <span>{buttons}</span>
      </span>
    </li>
  );
};

export default CompPassFailButtonsUser;
