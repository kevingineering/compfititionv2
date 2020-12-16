export type TDifferentUser = {
  email: string;
  userId: string;
  name: string;
};

export type TUser = TDifferentUser & {
  token?: string;
  isSearchable?: boolean;
};

export type TOtherUser = TDifferentUser & {
  pastGoals: TGoal[];
  activeGoals: TGoal[];
  pastCompetitions: TGoal[];
  activeCompetitions: TGoal[];
  selectedGoal?: TGoal;
  friends: TDifferentUser[];
  isFriend: boolean;
};

export type TChallenge = {
  name: string;
  duration: number;
  startTime: Date;
  category: string;
  description: string;
  units?: string;
  daysPerWeek?: number;
};

export type TGoal = TChallenge & {
  goalId: string;
  isPrivate: boolean;
  target?: number;
  ledger: string | null;
  initialValue?: number;
};

export enum EGoalCategory {
  cumulative = 'cumulative',
  difference = 'difference',
  passfail = 'passfail',
}

export type TCompetition = TChallenge & {
  competitionId: string;
  isPrivate: boolean;
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
  target?: number;
  initialValue?: number;
};

export type TAlert = {
  message?: string;
  timestamp: number;
  persist: boolean;
};
