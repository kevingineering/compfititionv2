import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/Store';
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';
import { useParams, RouteComponentProps, useHistory } from 'react-router-dom';
import {
  SetSelectedGoal,
  GetGoal,
  DeleteGoal,
  UpdateGoalLedger,
} from '../../redux/goal/actions';
import GoalChart from './GoalDetailsPageComponent/GoalChart';
import GoalProgress from './GoalDetailsPageComponent/GoalProgress';
import GoalInfo from './GoalDetailsPageComponent/GoalInfo';
import GoalButtons from './GoalDetailsPageComponent/GoalButtons';
import { getGoalTime } from '../../util/dateFunctions';
import { getGoalRecord } from '../../util/goalFunctions';
import { dateIsBeforeToday } from '../../util/dateFunctions';
import { NOT_LOADING } from '../../redux/buttonTypes';
import { EGoalType } from '../../types';

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
      dateIsBeforeToday(goalState.selectedGoal.startDate.toString()))
  ) {
    return (
      <div className='form-container'>
        <LoadingSpinner />
      </div>
    );
  }

  const { name, duration, startDate, units, type, id } = goalState.selectedGoal;
  const { isStarted, time, isComplete } = getGoalTime(startDate, duration);

  const deleteGoal = () => {
    dispatch(DeleteGoal(goalId));
  };

  const handleSave = () => {
    dispatch(UpdateGoalLedger({ id: id, ledger: record }));
  };

  return (
    <div className='form-container'>
      <h2 className='collection-header'>{name}</h2>
      <ul>
        {isStarted && (
          <GoalChart
            goal={goalState.selectedGoal}
            record={record}
            setRecord={setRecord}
            time={time}
            isClickable={!isComplete}
          />
        )}
        {isStarted &&
          time !== duration &&
          type !== EGoalType.passfail &&
          record.length !== 0 && (
            <GoalProgress
              record={record}
              time={time}
              units={units}
              type={type}
              setRecord={setRecord}
            />
          )}
        <GoalInfo goal={goalState.selectedGoal} time={time} record={record} />
      </ul>
      <GoalButtons
        isStarted={isStarted}
        isOwner={true}
        isActive={!isComplete}
        deleteGoal={deleteGoal}
        handleSave={handleSave}
        loadingButton={goalState.loadingButton}
      />
    </div>
  );
};

export default GoalDetailsPage;
