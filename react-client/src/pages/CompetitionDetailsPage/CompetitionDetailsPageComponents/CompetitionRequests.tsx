import React from 'react';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { REQUEST_TO_JOIN_COMPETITION_BUTTON } from '../../../redux/buttonTypes';

//TODO

interface IProps {
  loadingButton: string;
}

const CompetitionRequests: React.FC<IProps> = ({ loadingButton }) => {
  return (
    <LoadingButton
      message='Request to Join'
      handleClick={() => {}}
      isLoading={loadingButton === REQUEST_TO_JOIN_COMPETITION_BUTTON}
      className='h3 margin-top-0'
    ></LoadingButton>
  );
};

export default CompetitionRequests;
