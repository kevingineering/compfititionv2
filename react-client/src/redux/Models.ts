import { TChallenge, TDifferentUser } from '../types';

//#region Requests
export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  isSearchable: boolean;
};

export type TLoginRequest = { email: string; password: string };

export type TUpdateUserRequest = TRegisterRequest;

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

export type TUpdateParticipationRequest = {
  competitionId: string;
  value: number;
};
//#endregion

//#region Responses
// export type TUserResponse = TUser;
// export type TGoalResponse = TGoal;
// export type TCompetitionResponse = TCompetition;
// export type TDifferentUserResponse = TDifferentUser;
// export type TDifferentUserInfoResponse = TDifferentUserInfo;
// export type TUserInfoResponse = TUserInfo;
// export type TParticipant

export type TFriendRequestInfoResponse = {
  usersWhoReceivedFriendRequest: TDifferentUser[];
  usersWhoSentFriendRequest: TDifferentUser[];
  searchableUsers: TDifferentUser[];
};

//#endregion
