import React, { useEffect } from 'react';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../../../redux/Store';
import { GetFriends } from '../../../../redux/friendship/actions';
import { TCompetition } from '../../../../types';
import InvitationItem from './InvitationItem';
import { MessageInBorderedSpace } from '../../../../sharedComponents/styledComponents/Misc';

interface IProps {
  competition: TCompetition;
  buttonIds: string[];
}

const Invitations: React.FC<IProps> = ({ competition, buttonIds }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFriends());
  }, [dispatch]);

  const friendState = useSelector((state: RootStore) => state.friendState);

  let participantIds = competition.participants.map((user) => user.userId);
  let participationRequestIds = competition.participants.map(
    (request) => request.userId
  );
  let invitableFriends = friendState.friends.filter(
    (user) =>
      !participantIds.includes(user.userId) &&
      !participationRequestIds.includes(user.userId)
  );

  //TODO - combine existing invitations with friends

  const invitableList =
    invitableFriends.length !== 0 ? (
      invitableFriends.map((friend, index) => (
        <InvitationItem
          key={index}
          user={friend}
          competitionId={competition.competitionId}
          isInvitationPending={
            competition.invitations.findIndex(
              (x) => x.userId === friend.userId
            ) !== -1
          }
          buttonIds={buttonIds}
        />
      ))
    ) : (
      <MessageInBorderedSpace>
        You have no more friends to invite.
      </MessageInBorderedSpace>
    );

  return (
    <CollapsibleListContainer isH3={true} title='Invite Friends'>
      {invitableList}
      <hr />
    </CollapsibleListContainer>
  );
};

export default Invitations;
