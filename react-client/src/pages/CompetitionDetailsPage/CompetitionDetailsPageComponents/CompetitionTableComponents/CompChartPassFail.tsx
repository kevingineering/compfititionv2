import React from 'react';
import { TCompetitionParticipantInfo } from '../../../../util/competitionFunctions';
import CompPassFailButtons from './CompPassFailButtons';
import CompPassFailButtonsUser from './CompPassFailButtonsUser';
import { TCompetition } from '../../../../types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../../redux/Store';
import { FlexContainer } from '../../../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

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
  const userId = useSelector(
    (state: RootStore) => state.userState.user!.userId
  );

  //week items
  let weekItems: JSX.Element[] = [];
  for (let i = 0; i < competition.duration / 7; i++) {
    weekItems.push(
      <CompPFTableWeek
        days={competition.daysPerWeek!}
        isFirst={i === 0}
        key={i}
      >
        {competition.daysPerWeek! > 2 ? `Week ${i + 1}` : `W${i + 1}`}
      </CompPFTableWeek>
    );
  }

  //participant names
  let leftItems: JSX.Element[] = [<EmptySpace key={-1}>.</EmptySpace>];
  competitionArray.forEach((item, index) =>
    leftItems.push(
      <CompPFParticipantName key={index}>{item.name}</CompPFParticipantName>
    )
  );

  let days = (competition.duration / 7) * competition.daysPerWeek!;

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
          isFinished={time === competition.duration}
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
    <FlexContainer>
      <CompPFTableLeftContainer>{leftItems}</CompPFTableLeftContainer>
      <CompPFTableRightContainer>
        <li>{weekItems}</li>
        {participantButtons}
      </CompPFTableRightContainer>
    </FlexContainer>
  );
};

export default CompChartPassFail;

const CompPFTableLeftContainer = styled.span`
  flex: 1;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
  background-color: var(--primary-color);
`;

const CompPFTableRightContainer = styled.span`
  overflow-x: auto;
  white-space: nowrap;
  line-height: 1.7rem;
  border-right: 0.125rem solid var(--primary-color);
`;

const CompPFTableWeek = styled.span<{ days: number; isFirst: boolean }>`
  border-bottom: 0.125rem solid var(--primary-color);
  line-height: 1.7rem;
  display: inline-block;
  border-left: 0.125rem solid var(--primary-color);
  text-align: center;
  width: ${(props) => props.days * 1.7}rem;
  ${(props) => props.isFirst && 'border-left: 0'}
`;

export const CompPFParticipantName = styled.p`
  border-bottom: 0.125rem solid var(--primary-color);
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1.7rem;
  background-color: var(--secondary-color);
`;

const EmptySpace = styled.p`
  background-color: var(--primary-color);
  border-bottom: 0.125rem solid var(--primary-color);
  line-height: 1.7rem;
`;
