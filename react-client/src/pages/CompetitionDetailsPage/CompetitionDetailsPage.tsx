import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootStore } from '../../redux/Store';
import {
  GetCompetition,
  ClearCurrentCompetition,
} from '../../redux/competition/actions';
import { NOT_LOADING } from '../../redux/buttonTypes';
import { getGoalTime } from '../../util/dateFunctions';
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';
import CompetitionTable from './CompetitionDetailsPageComponents/CompetitionTable';
import CompetitionLists from './CompetitionDetailsPageComponents/CompetitionLists';
import {
  getCompetitionArray,
  TCompetitionParticipantInfo,
  getCompRecord,
} from '../../util/competitionFunctions';
import { TParticipant } from '../../types';

interface IParams {
  competitionId: string;
}

//TODO

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
        (x) => x.userId === userState.user!.id
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
            (x) => x === userState.user!.id
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
    //using id prevents record/array from rerunning on same page
    //eslint-disable-next-line
  }, [competitionState.selectedCompetition?.id]);

  //determine if user is participant
  useEffect(() => {
    if (isLoaded && competitionState.selectedCompetition) {
      //determine if user is participant
      let x = competitionState.selectedCompetition.participants.findIndex(
        (x) => x.userId === userState.user!.id
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
            (x) => x === userState.user!.id
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

  const { startDate, duration } = competitionState.selectedCompetition;

  //determine if started/completed/what day
  const { time, isStarted, isComplete } = getGoalTime(startDate, duration);

  return (
    <div className='competition-container'>
      <div className='grid-2-1'>
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
          isComplete={isComplete}
        />
        <CompetitionLists
          isAdmin={isAdmin}
          isAdminView={isAdminView}
          setIsAdminView={setIsAdminView}
          isStarted={isStarted}
          competition={competitionState.selectedCompetition}
          competitionArray={competitionArray}
          participantId={participant?.userId}
          loadingButton={competitionState.loadingButton}
        />
      </div>
    </div>
  );
};

export default CompetitionDetailsPage;
