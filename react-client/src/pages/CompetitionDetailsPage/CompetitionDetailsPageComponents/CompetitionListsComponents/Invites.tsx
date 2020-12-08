import React, { useEffect } from 'react';
import CollapsibleListContainer from '../../../../sharedComponents/misc/CollapsibleListContainer';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../../../redux/Store';
import { GetFriends } from '../../../../redux/friend/actions';
import { TParticipant } from '../../../../types';
import InviteItem from './InviteItem';

//TODO
interface IProps {
  compId: string;
  participants: TParticipant[];
  //letters
}

const Invites: React.FC<IProps> = ({ compId, participants }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFriends());
  }, [dispatch]);

  const friendState = useSelector((state: RootStore) => state.friendState);

  let participantIds = participants.map((x) => x.userId);
  let invitableFriends = friendState.friends.filter(
    (x) => !participantIds.includes(x.id)
  );

  const invitableList = invitableFriends.map((friend, index) => (
    <InviteItem
      key={index}
      isLast={index === invitableFriends.length - 1}
      user={friend}
      isInvitePending={true}
    />
  ));

  return (
    <CollapsibleListContainer isH3={true} title='Invite Friends'>
      {invitableList}
    </CollapsibleListContainer>
  );
};

export default Invites;
