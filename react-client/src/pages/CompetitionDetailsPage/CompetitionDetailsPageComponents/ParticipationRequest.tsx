import React from 'react';
import {
  ADD_PARTICIPATION_REQUEST_BUTTON,
  ACCEPT_INVITATION_BUTTON,
  DELETE_PARTICIPATION_REQUEST_BUTTON,
} from '../../../redux/buttonTypes';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { ButtonRequestToJoin } from '../../../sharedComponents/styledComponents/Button';
import { useDispatch } from 'react-redux';
import {
  AddParticipationRequest,
  DeleteParticipationRequest,
} from '../../../redux/aggregateCompetition/participationRequest/actions';
import { AcceptInvitation } from '../../../redux/aggregateCompetition/participant/actions';

//TODO - IProps
interface IProps {
  loadingButton: string;
  competitionId: string;
  userId: string;
  hasRequest: boolean;
  hasInvitation: boolean;
}

const ParticipationRequest: React.FC<IProps> = ({
  loadingButton,
  competitionId,
  userId,
  hasRequest,
  hasInvitation,
}) => {
  const dispatch = useDispatch();
  return hasInvitation ? (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Accept Invitation'
      handleClick={() => dispatch(AcceptInvitation(competitionId))}
      isLoading={loadingButton === ACCEPT_INVITATION_BUTTON}
    />
  ) : hasRequest ? (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Delete Request'
      handleClick={() =>
        dispatch(DeleteParticipationRequest(userId, competitionId))
      }
      isLoading={loadingButton === DELETE_PARTICIPATION_REQUEST_BUTTON}
    />
  ) : (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Request to Join'
      handleClick={() => dispatch(AddParticipationRequest(competitionId))}
      isLoading={loadingButton === ADD_PARTICIPATION_REQUEST_BUTTON}
    />
  );
};

export default ParticipationRequest;
