import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import GoalCompInputs from '../../sharedComponents/GoalCompInputs';
import { ADD_COMPETITION_BUTTON } from '../../redux/buttonTypes';
import { TGoalDTO } from '../../redux/DTOs';
import { AddCompetition } from '../../redux/competition/actions';

const AddCompetitionPage = () => {
  const dispatch = useDispatch();
  const competitionState = useSelector(
    (state: RootStore) => state.competitionState
  );
  let history = useHistory();

  const dispatchAction = (competition: TGoalDTO) => {
    dispatch(AddCompetition(competition));
  };

  //redirects to competition page after successful submission
  useEffect(() => {
    if (competitionState.selectedCompetition !== undefined) {
      history.push('/competition/' + competitionState.selectedCompetition!.id);
    }
  }, [competitionState.selectedCompetition, history]);

  return (
    <GoalCompInputs
      isGoal={false}
      isUpdate={false}
      dispatchAction={dispatchAction}
      isLoading={competitionState.loadingButton === ADD_COMPETITION_BUTTON}
    />
  );
};

export default AddCompetitionPage;
