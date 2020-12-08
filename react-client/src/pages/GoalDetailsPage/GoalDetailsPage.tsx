import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useParams, RouteComponentProps, useHistory } from 'react-router-dom';
import {
  SetSelectedGoal,
  GetGoal,
  DeleteGoal,
  UpdateGoalLedger,
} from '../../redux/goal/actions';
import GoalButtons from './GoalDetailsPageComponent/GoalButtons';
import { getGoalTime } from '../../util/dateFunctions';
import { getGoalRecord } from '../../util/goalFunctions';
import { timeIsInPast } from '../../util/dateFunctions';
import { NOT_LOADING } from '../../redux/buttonTypes';
import { EGoalType } from '../../types';
import LoadingSpinner from '../../sharedComponents/misc/LoadingSpinner';
import {
  StandardContainer,
  CollectionHeader,
} from '../../sharedComponents/styledComponents/Misc';
import GCChart from '../../sharedComponents/goalCompPage/goalcompCharts/GCChart';
import GCProgress from '../../sharedComponents/goalCompPage/GCProgress';
import GoalInfo from '../../sharedComponents/goalCompPage/GoalInfo';

interface IParams {
  goalId: string;
}

interface IProps extends RouteComponentProps<IParams> {}

const GoalDetailsPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const goalState = useSelector((state: RootStore) => state.goalState);
  let { goalId } = useParams<IParams>();
  const [record, setRecord] = useState<(number | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //page load / redirect
  useEffect(() => {
    if (goalState.selectedGoal === undefined) {
      if (!isLoaded) {
        if (
          goalState.activeGoals.length === 0 &&
          goalState.pastGoals.length === 0
        ) {
          //page loaded directly
          dispatch(GetGoal(goalId));
        } else {
          //clicked on from home page
          dispatch(SetSelectedGoal(goalId));
        }
      } else if (goalState.loadingButton === NOT_LOADING) {
        //redirect if goal deleted or not found
        console.log('redirect from goal details');
        history.push('/');
      }
    }
    setIsLoaded(true);
    // eslint-disable-next-line
  }, [goalState.selectedGoal, goalState.loadingButton]);

  //set record
  useEffect(() => {
    if (goalState.selectedGoal !== undefined) {
      let temp = getGoalRecord(goalState.selectedGoal);
      setRecord(temp);
    }
  }, [goalState.selectedGoal]);

  if (
    goalState.selectedGoal === undefined ||
    (record.length === 0 &&
      timeIsInPast(goalState.selectedGoal.startTime.toString()))
  ) {
    return (
      //TODO
      <LoadingSpinner />
    );
  }

  const { name, duration, startTime, units, type, id } = goalState.selectedGoal;
  const { isStarted, time, isFinished } = getGoalTime(startTime, duration);

  const deleteGoal = () => {
    dispatch(DeleteGoal(goalId));
  };

  const handleSave = () => {
    dispatch(UpdateGoalLedger({ id: id, ledger: record }));
  };

  return (
    <StandardContainer>
      <CollectionHeader>{name}</CollectionHeader>
      <ul>
        {/* TEST */}
        {(isStarted || goalState.selectedGoal.type === EGoalType.passfail) && (
          <GCChart
            goal={goalState.selectedGoal}
            record={record}
            setRecord={setRecord}
            time={time}
            isClickable={!isFinished}
          />
        )}
        {isStarted &&
          time !== duration &&
          type !== EGoalType.passfail &&
          record.length !== 0 && (
            <GCProgress
              record={record}
              time={time}
              units={units}
              type={type}
              setRecord={setRecord}
            />
          )}
        <GoalInfo
          goal={goalState.selectedGoal}
          time={time}
          record={record}
          isFinished={isFinished}
        />
      </ul>
      <GoalButtons
        isStarted={isStarted}
        isOwner={true}
        isActive={!isFinished}
        deleteGoal={deleteGoal}
        handleSave={handleSave}
        loadingButton={goalState.loadingButton}
      />
    </StandardContainer>
  );
};

export default GoalDetailsPage;
