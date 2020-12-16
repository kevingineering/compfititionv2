import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux/Store';
import { useHistory } from 'react-router-dom';
import { ADD_COMPETITION_BUTTON } from '../../redux/buttonTypes';
import { TCompetitionRequest } from '../../redux/Models';
import { AddCompetition } from '../../redux/competition/actions';
import GCInputs from '../../sharedComponents/goalCompPage/GCInputs';

const AddCompetitionPage = () => {
  const dispatch = useDispatch();
  const competitionState = useSelector(
    (state: RootStore) => state.competitionState
  );
  let history = useHistory();

  const dispatchAction = (competition: TCompetitionRequest) => {
    dispatch(AddCompetition(competition));
  };

  //redirects to competition page after successful submission
  useEffect(() => {
    if (competitionState.selectedCompetition !== undefined) {
      history.push(
        '/competition/' + competitionState.selectedCompetition!.competitionId
      );
    }
  }, [competitionState.selectedCompetition, history]);

  return (
    <GCInputs
      isGoal={false}
      isUpdate={false}
      dispatchAction={dispatchAction}
      isLoading={competitionState.loadingButton === ADD_COMPETITION_BUTTON}
    />
  );
};

export default AddCompetitionPage;
