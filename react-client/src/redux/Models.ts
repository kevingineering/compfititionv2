import { TChallenge, TDifferentUser } from '../types';

//#region Requests
export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  isSearchable: boolean;
};

export type TLoginRequest = { email: string; password: string };

export type TUpdateRequest = TRegisterRequest;

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TGoalRequest = TChallenge & {
  initialValue?: number;
  target?: number;
  isPrivate: boolean;
};

export type TLedgerRequest = {
  goalId: string;
  ledger: (number | null)[];
};

export type TCompetitionRequest = TChallenge & {
  isHighestScoreWins: boolean;
  isPrivate: boolean;
};

//#endregion

//#region Responses
// export type TUserResponse = TUser;
// export type TGoalResponse = TGoal;
// export type TDifferentUserResponse = TDifferentUser;
// export type OtherUserInfoResponse = TOtherUser;

export type TFriendRequestUserInfoResponse = {
  usersWhoReceivedFriendRequest: TDifferentUser[];
  usersWhoSentFriendRequest: TDifferentUser[];
  searchableUsers: TDifferentUser[];
};

export type TUsersWhoSentFriendRequestResponse = {
  usersWhoSentFriendRequest: TDifferentUser[];
};

//#endregion

export type TUpdateParticipantDTO = {
  competitionId: string;
  value: number;
};
