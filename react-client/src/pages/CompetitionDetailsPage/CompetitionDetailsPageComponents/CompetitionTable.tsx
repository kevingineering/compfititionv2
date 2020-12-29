import React, { useState, useEffect } from 'react';
import CompChart from './CompetitionTableComponents/CompChart';
import CompInfo from './CompetitionTableComponents/CompInfo';
import CompButtons from './CompetitionTableComponents/CompButtons';
import { TCompetition, EGoalCategory, TParticipant } from '../../../types';
import { TCompetitionParticipantInfo } from '../../../util/competitionFunctions';
import {
  CollectionHeader,
  StandardContainer,
} from '../../../sharedComponents/styledComponents/Misc';
import GCProgress from '../../../sharedComponents/goalCompPage/GCProgress';
import styled from 'styled-components';

//TODO - IProps
interface IProps {
  isAdminView: boolean;
  isStarted: boolean;
  isFinished: boolean;
  participant?: TParticipant;
  time: number;
  competitionArray: TCompetitionParticipantInfo[];
  competition: TCompetition;
  loadingButton: string;
  userRecord: (number | null)[];
  setUserRecord: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

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
  isFinished,
}) => {
  const [target, setTarget] = useState(participant?.target?.toString() || '');

  //set target if participant was initially null
  useEffect(() => {
    setTarget(participant?.target?.toString() || '');
    //eslint-disable-next-line
  }, [participant?.userId]);

  const { name, duration, units, category } = competition;

  return (
    <CompetitionTableContainer>
      <CollectionHeader>{name}</CollectionHeader>
      <ul>
        {(isStarted || competition.category === EGoalCategory.passfail) && (
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
          category !== EGoalCategory.passfail &&
          userRecord.length !== 0 && (
            <GCProgress
              record={userRecord}
              time={time}
              units={units}
              category={category}
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
          isFinished={isFinished}
        />
      </ul>
      {participant ? (
        <CompButtons
          isStarted={isStarted}
          isAdminView={isAdminView}
          isActive={!isFinished}
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
    </CompetitionTableContainer>
  );
};

export default CompetitionTable;

const CompetitionTableContainer = styled(StandardContainer)`
  max-width: none;
`;
