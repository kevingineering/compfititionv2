import React from 'react';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
import {
  MessageInBorderedSpace,
  FlexContainer,
} from '../../../../sharedComponents/styledComponents/Misc';
import LoadingButton from '../../../../sharedComponents/forms/LoadingButton';
import { useDispatch } from 'react-redux';
import {
  RejectAdminRequest,
  AcceptAdminRequest,
} from '../../../../redux/competition/actions';
import {
  ButtonSplitGray,
  ButtonSplitPrimary,
} from '../../../../sharedComponents/styledComponents/Button';
import {
  REJECT_ADMIN_REQUEST_BUTTON,
  ACCEPT_ADMIN_REQUEST_BUTTON,
} from '../../../../redux/buttonTypes';

interface IProps {
  userId: string;
  competitionId: string;
  loadingButton: string;
}

//TODO - isLoading, request issue

const AdminRequestMenu: React.FC<IProps> = ({
  userId,
  competitionId,
  loadingButton,
}) => {
  const dispatch = useDispatch();
  return (
    <CollapsibleListContainer title='Admin Request' isCollapsible={false}>
      <MessageInBorderedSpace>
        You have been asked to be an admin for this competition. Do you accept
        this role?
      </MessageInBorderedSpace>
      <FlexContainer>
        <LoadingButton
          message='No'
          handleClick={() =>
            dispatch(RejectAdminRequest(userId, competitionId))
          }
          styles={ButtonSplitGray}
          isLoading={loadingButton === REJECT_ADMIN_REQUEST_BUTTON}
        />
        <LoadingButton
          message='Yes'
          handleClick={() =>
            dispatch(AcceptAdminRequest(userId, competitionId))
          }
          styles={ButtonSplitPrimary}
          isLoading={loadingButton === ACCEPT_ADMIN_REQUEST_BUTTON}
        />
      </FlexContainer>
    </CollapsibleListContainer>
  );
};

export default AdminRequestMenu;
