export type TUser = {
  email?: string;
  id?: string;
  name?: string;
  token?: string;
  isSearchable?: boolean;
};

export type TDifferentUser = {
  email: string;
  id: string;
  name: string;
};

export type TFriend = {
  id: string;
  email: string;
  name: string;
  activeGoals: TGoal[];
  pastGoals: TGoal[];
  activeCompetitions: TGoal[];
  pastCompetitions: TGoal[];
  selectedGoal?: TGoal;
  friends: TDifferentUser[];
  isFriend: boolean;
};

export type TGoal = {
  id: string;
  name: string;
  duration: number;
  startTime: Date;
  type: EGoalType;
  description: string;
  units?: string;
  isPrivate: boolean;
  target: number;
  ledger: string | null;
  initialValue?: number;
};

export enum EGoalType {
  cumulative = 'cumulative',
  difference = 'difference',
  passfail = 'passfail',
}

export type TCompetition = {
  id: string;
  name: string;
  duration: number;
  startTime: Date;
  type: string;
  description: string;
  units?: string;
  isPrivate: boolean;
  frequency?: number;
  isHighestScoreWins: boolean;
  participants: TParticipant[];
  admins: string[];
  invites: string[];
  participantRequests: string[];
  adminRequests: string[];
};

export type TParticipant = {
  userId: string;
  ledger: string | null;
  name: string;
  target: number;
  initialValue?: number;
};

export type TAlert = {
  message?: string;
  timestamp: number;
  persist: boolean;
};
