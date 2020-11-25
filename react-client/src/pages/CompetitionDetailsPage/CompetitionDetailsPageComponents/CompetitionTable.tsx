import React, { useState, useEffect } from 'react';
import CompChart from './CompChart';
import GoalProgress from '../../GoalDetailsPage/GoalDetailsPageComponent/GoalProgress';
import CompInfo from './CompetitionTableComponents/CompInfo';
import CompButtons from './CompetitionTableComponents/CompButtons';
import { TCompetition, EGoalType, TParticipant } from '../../../types';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';

interface IProps {
  isAdminView: boolean;
  isStarted: boolean;
  isComplete: boolean;
  participant?: TParticipant;
  time: number;
  competitionArray: TCompetitionParticipantInfo[];
  competition: TCompetition;
  loadingButton: string;
  userRecord: (number | null)[];
  setUserRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

//TODO

const CompetitionTable: React.FC<IProps> = ({
  competition,
  competitionArray,
  participant,
  loadingButton,
  isAdminView,
  userRecord,
  setUserRecord,
  time,
  isStarted,
  isComplete,
}) => {
  const [target, setTarget] = useState(participant?.target?.toString() || '');

  //set target if participant was initially null
  useEffect(() => {
    setTarget(participant?.target?.toString() || '');
    //eslint-disable-next-line
  }, [participant?.userId]);

  const { name, duration, units, type } = competition;

  return (
    <div className='form-container no-max-width'>
      <h2 className='collection-header'>{name}</h2>
      <ul>
        {isStarted && (
          <CompChart
            competition={competition}
            competitionArray={competitionArray}
            record={userRecord}
            setRecord={setUserRecord}
            time={time}
          />
        )}
        {isStarted &&
          time !== duration &&
          type !== EGoalType.passfail &&
          userRecord.length !== 0 && (
            <GoalProgress
              record={userRecord}
              time={time}
              units={units}
              type={type}
              setRecord={setUserRecord}
            />
          )}
        <CompInfo
          competition={competition}
          time={time}
          record={userRecord}
          isStarted={isStarted}
          initialValue={participant?.initialValue}
          target={participant?.target}
        />
      </ul>
      {participant ? (
        <CompButtons
          isStarted={isStarted}
          isAdminView={isAdminView}
          isActive={!isComplete}
          ledger={userRecord}
          loadingButton={loadingButton}
          target={target}
          setTarget={setTarget}
          competition={competition}
          initialValue={participant.initialValue}
        />
      ) : (
        <hr />
      )}
    </div>
  );
};

export default CompetitionTable;
