export type TLoginDTO = { email: string; password: string };

export type TRegisterDTO = {
  name: string;
  email: string;
  password: string;
  isSearchable: boolean;
};

export type TUpdateDTO = TRegisterDTO;

export type TChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};

export type TGoalDTO = {
  name: string;
  duration: string;
  startTime: Date;
  type: string;
  description: string;
  units?: string;
  target: number;
  isPrivate: boolean;
  initialValue?: number;
};

export type TCompDTO = {
  name: string;
  duration: string;
  startTime: Date;
  type: string;
  description: string;
  units?: string;
  frequency?: number;
  isHighestScoreWins: boolean;
  isPrivate: boolean;
  initialValue?: number;
};

export type TLedgerDTO = {
  id: string;
  ledger: (number | null)[];
};

export type TUpdateParticipantDTO = {
  compId: string;
  value: number;
};
