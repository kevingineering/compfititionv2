import React from 'react';
import {
  ADD_PARTICIPANT_REQUEST_BUTTON,
  ACCEPT_INVITE_BUTTON,
  DELETE_PARTICIPANT_REQUEST_BUTTON,
} from '../../../redux/buttonTypes';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { ButtonRequestToJoin } from '../../../sharedComponents/styledComponents/Button';
import { useDispatch } from 'react-redux';
import {
  AddParticipantRequest,
  DeleteParticipantRequest,
  AcceptInvite,
} from '../../../redux/competition/actions';

//TODO - IProps
interface IProps {
  loadingButton: string;
  competitionId: string;
  userId: string;
  hasRequest: boolean;
  hasInvite: boolean;
}

const ParticipantRequest: React.FC<IProps> = ({
  loadingButton,
  competitionId,
  userId,
  hasRequest,
  hasInvite,
}) => {
  const dispatch = useDispatch();
  return hasInvite ? (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Accept Invite'
      handleClick={() => dispatch(AcceptInvite(competitionId))}
      isLoading={loadingButton === ACCEPT_INVITE_BUTTON}
    />
  ) : hasRequest ? (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Delete Request'
      handleClick={() =>
        dispatch(DeleteParticipantRequest(userId, competitionId))
      }
      isLoading={loadingButton === DELETE_PARTICIPANT_REQUEST_BUTTON}
    />
  ) : (
    <LoadingButton
      styles={ButtonRequestToJoin}
      message='Request to Join'
      handleClick={() => dispatch(AddParticipantRequest(userId, competitionId))}
      isLoading={loadingButton === ADD_PARTICIPANT_REQUEST_BUTTON}
    />
  );
};

export default ParticipantRequest;
