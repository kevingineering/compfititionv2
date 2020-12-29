import { NOT_LOADING } from '../buttonTypes';
import { TGoal, TCompetition } from '../../types';
import { CommonDispatchTypes, ECommonCompetitionActions } from './common/types';
import {
  CompetitionDispatchTypes,
  ECompetitionActions,
} from './competition/types';
import {
  ParticipantDispatchTypes,
  EParticipantActions,
} from './participant/types';
import {
  InvitationDispatchTypes,
  EInvitationActions,
} from './invitation/types';
import {
  ParticipationRequestDispatchTypes,
  EParticipationRequestActions,
} from './participationRequest/types';
import { AdminDispatchTypes, EAdminActions } from './admin/types';
import {
  AdminRequestDispatchTypes,
  EAdminRequestActions,
} from './adminRequest/types';
import commonReducer from './common/reducer';
import competitionReducer from './competition/reducer';
import participantReducer from './participant/reducer';
import invitationReducer from './invitation/reducer';
import participationRequestReducer from './participationRequest/reducer';
import adminReducer from './admin/reducer';
import adminRequestReducer from './adminRequest/reducer';

export type AggregateCompetitionDispatchTypes =
  | CommonDispatchTypes
  | CompetitionDispatchTypes
  | ParticipantDispatchTypes
  | InvitationDispatchTypes
  | ParticipationRequestDispatchTypes
  | AdminDispatchTypes
  | AdminRequestDispatchTypes;

export interface ICompetitionState {
  loadingButton: string;
  activeCompetitionGoals: TGoal[];
  pastCompetitionGoals: TGoal[];
  selectedCompetition?: TCompetition;
  buttonIds: string[];
}

const competitionState: ICompetitionState = {
  loadingButton: NOT_LOADING,
  activeCompetitionGoals: [],
  pastCompetitionGoals: [],
  selectedCompetition: undefined,
  buttonIds: [],
};

const aggregateCompetitionReducer = (
  state: ICompetitionState = competitionState,
  action: AggregateCompetitionDispatchTypes
) => {
  if (
    Object.values(ECommonCompetitionActions).includes(
      action.type as ECommonCompetitionActions
    )
  ) {
    return commonReducer(state, action as CommonDispatchTypes);
  } else if (
    Object.values(ECompetitionActions).includes(
      action.type as ECompetitionActions
    )
  ) {
    return competitionReducer(state, action as CompetitionDispatchTypes);
  } else if (
    Object.values(EParticipantActions).includes(
      action.type as EParticipantActions
    )
  ) {
    return participantReducer(state, action as ParticipantDispatchTypes);
  } else if (
    Object.values(EInvitationActions).includes(
      action.type as EInvitationActions
    )
  ) {
    return invitationReducer(state, action as InvitationDispatchTypes);
  } else if (
    Object.values(EParticipationRequestActions).includes(
      action.type as EParticipationRequestActions
    )
  ) {
    return participationRequestReducer(
      state,
      action as ParticipationRequestDispatchTypes
    );
  } else if (
    Object.values(EAdminActions).includes(action.type as EAdminActions)
  ) {
    return adminReducer(state, action as AdminDispatchTypes);
  } else if (
    Object.values(EAdminRequestActions).includes(
      action.type as EAdminRequestActions
    )
  ) {
    return adminRequestReducer(state, action as AdminRequestDispatchTypes);
  } else {
    return state;
  }
};

export default aggregateCompetitionReducer;
