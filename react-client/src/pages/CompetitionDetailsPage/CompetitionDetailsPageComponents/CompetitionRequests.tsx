import React from 'react';
import { REQUEST_TO_JOIN_COMPETITION_BUTTON } from '../../../redux/buttonTypes';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { ButtonRequestToJoin } from '../../../sharedComponents/styledComponents/Button';

//TODO

interface IProps {
  loadingButton: string;
}

const CompetitionRequests: React.FC<IProps> = ({ loadingButton }) => {
  return (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Request to Join'
      handleClick={() => {}}
      isLoading={loadingButton === REQUEST_TO_JOIN_COMPETITION_BUTTON}
    />
  );
};

export default CompetitionRequests;
