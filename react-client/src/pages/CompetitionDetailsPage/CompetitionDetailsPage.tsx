import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootStore } from '../../redux/Store';
import {
  GetCompetition,
  ClearCurrentCompetition,
} from '../../redux/aggregateCompetition/competition/actions';
import { NOT_LOADING } from '../../redux/buttonTypes';
import { getGoalTime } from '../../util/dateFunctions';
import LoadingSpinner from '../../sharedComponents/misc/LoadingSpinner';
import CompetitionTable from './CompetitionDetailsPageComponents/CompetitionTable';
import CompetitionLists from './CompetitionDetailsPageComponents/CompetitionLists';
import {
  getCompetitionArray,
  TCompetitionParticipantInfo,
  getCompRecord,
} from '../../util/competitionFunctions';
import { TParticipant } from '../../types';
import styled from 'styled-components';

interface IParams {
  competitionId: string;
}

const CompetitionDetailsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { competitionId } = useParams<IParams>();
  const competitionState = useSelector(
    (state: RootStore) => state.competitionState
  );
  const userState = useSelector((state: RootStore) => state.userState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [competitionArray, setCompetitionArray] = useState<
    TCompetitionParticipantInfo[]
  >([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [participant, setParticipant] = useState<TParticipant>();
  const [userRecord, setUserRecord] = useState<(number | null)[]>([]);

  useEffect(() => {
    //get competition on page load
    if (!isLoaded) {
      dispatch(GetCompetition(competitionId));
      setIsLoaded(true);
    }
    if (isLoaded && competitionState.selectedCompetition) {
      //determine if user is participant and/or admin
      let x = competitionState.selectedCompetition.participants.findIndex(
        (x) => x.userId === userState.user!.userId
      );
      if (x === -1) {
        //set without user
        setCompetitionArray(
          getCompetitionArray(competitionState.selectedCompetition)
        );
      } else {
        setParticipant(competitionState.selectedCompetition.participants[x]);
        setUserRecord(
          getCompRecord(
            competitionState.selectedCompetition,
            competitionState.selectedCompetition.participants[x].ledger
          )
        );
        if (
          competitionState.selectedCompetition.admins.findIndex(
            (x) => x === userState.user!.userId
          ) !== -1
        ) {
          setIsAdmin(true);
        }
      }
    }

    //redirect
    if (
      isLoaded &&
      competitionState.loadingButton === NOT_LOADING &&
      competitionState.selectedCompetition === undefined
    ) {
      console.log('redirect from comp details');
      history.push('/');
    }
    //using competitionId prevents record/array from rerunning on same page
    //eslint-disable-next-line
  }, [competitionState.selectedCompetition?.competitionId]);

  //determine if user is participant
  useEffect(() => {
    if (isLoaded && competitionState.selectedCompetition) {
      //determine if user is participant
      let x = competitionState.selectedCompetition.participants.findIndex(
        (x) => x.userId === userState.user!.userId
      );
      if (x === -1) {
        //set without user
        setCompetitionArray(
          getCompetitionArray(competitionState.selectedCompetition)
        );
      } else {
        //set with user
        setParticipant(competitionState.selectedCompetition.participants[x]);
        setUserRecord(
          getCompRecord(
            competitionState.selectedCompetition,
            competitionState.selectedCompetition.participants[x].ledger
          )
        );
      }
    }
    //eslint-disable-next-line
  }, [competitionState.selectedCompetition?.participants]);

  //determine if user is admin
  useEffect(
    () => {
      if (isLoaded && competitionState.selectedCompetition) {
        //determine if user is admin
        if (
          competitionState.selectedCompetition.admins.findIndex(
            (x) => x === userState.user!.userId
          ) !== -1
        ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setIsAdminView(false);
        }
      }
    },
    //eslint-disable-next-line
    [competitionState.selectedCompetition?.admins]
  );

  //clear state when leaving page - prevents error
  useEffect(() => {
    return () => {
      dispatch(ClearCurrentCompetition());
    };
  }, [dispatch]);

  //TODO - optimize so only user array updates
  useEffect(() => {
    if (participant) {
      setCompetitionArray(
        getCompetitionArray(
          competitionState.selectedCompetition!,
          userRecord,
          participant.userId
        )
      );
    }
    //eslint-disable-next-line
  }, [userRecord]);

  if (competitionState.selectedCompetition === undefined) {
    return <LoadingSpinner />;
  }

  const { startTime, duration } = competitionState.selectedCompetition;

  const { time, isStarted, isFinished } = getGoalTime(startTime, duration);

  return (
    <CompetitionDetailsPageContainer>
      <CompetitionTable
        competition={competitionState.selectedCompetition}
        competitionArray={competitionArray}
        participant={participant}
        loadingButton={competitionState.loadingButton}
        isAdminView={isAdminView}
        userRecord={userRecord}
        setUserRecord={setUserRecord}
        time={time}
        isStarted={isStarted}
        isFinished={isFinished}
      />
      <CompetitionLists
        userId={userState.user!.userId!}
        isAdmin={isAdmin}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        isStarted={isStarted}
        competition={competitionState.selectedCompetition}
        competitionArray={competitionArray}
        participantId={participant?.userId}
        loadingButton={competitionState.loadingButton}
        buttonIds={competitionState.buttonIds}
      />
    </CompetitionDetailsPageContainer>
  );
};

export default CompetitionDetailsPage;

const CompetitionDetailsPageContainer = styled.div`
  max-width: 60rem;
  margin: auto;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 18rem;
  column-gap: 3rem;
  row-gap: 2rem;
  @media (max-width: 54rem) {
    grid-template-columns: 1fr;
    margin: auto;
  }
`;
