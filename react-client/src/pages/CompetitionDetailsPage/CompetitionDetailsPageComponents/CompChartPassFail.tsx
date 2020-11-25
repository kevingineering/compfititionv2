import React from 'react';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';
import CompPassFailButtons from './CompPassFailButtons';
import CompPassFailButtonsUser from './CompPassFailButtonsUser';
import { TCompetition } from '../../../types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/Store';

interface IProps {
  time: number;
  record: (number | null)[];
  setRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  competitionArray: TCompetitionParticipantInfo[];
  competition: TCompetition;
}

const CompChartPassFail: React.FC<IProps> = ({
  competitionArray,
  competition,
  record,
  setRecord,
  time,
}) => {
  const userId = useSelector((state: RootStore) => state.userState.user!.id);

  //week items
  let weekItems: JSX.Element[] = [];
  for (let i = 0; i < competition.duration / 7; i++) {
    weekItems.push(
      <span
        className={`table-pf-week ${i === 0 ? 'no-left-border' : ''}`}
        key={i}
        style={{ width: 1.6 * competition.frequency! + 'rem' }}
      >
        {competition.frequency! > 2 ? `Week ${i + 1}` : `W${i + 1}`}
      </span>
    );
  }

  //participant names
  let leftItems: JSX.Element[] = [
    <p className='filled' key={-1}>
      .
    </p>,
  ];
  competitionArray.forEach((item, index) =>
    leftItems.push(
      <p key={index} className='table-pf-name'>
        {item.name}
      </p>
    )
  );

  let days = (competition.duration / 7) * competition.frequency!;

  //record for each participant
  let participantButtons = competitionArray.map((participant, index) => {
    let isParticipant = participant.userId === userId;
    if (isParticipant) {
      return (
        <CompPassFailButtonsUser
          participant={participant}
          key={index}
          days={days}
          record={record}
          setRecord={setRecord}
          time={time}
        />
      );
    } else {
      return (
        <CompPassFailButtons
          participant={participant}
          key={index}
          days={days}
        />
      );
    }
  });

  return (
    <div className='flex'>
      <span className='table-pf-left'>{leftItems}</span>
      <span className='table-pf-right'>
        <li>{weekItems}</li>
        {participantButtons}
      </span>
    </div>
  );
};

export default CompChartPassFail;
