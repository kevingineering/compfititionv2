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
  startDate: Date;
  type: string;
  description: string;
  units?: string;
  target: number;
  isPrivate: boolean;
  initialValue?: number;
  ledger: null;
};

export type TLedgerDTO = {
  id: string;
  ledger: (number | null)[];
};

export type TUpdateParticipantDTO = {
  compId: string;
  value: number;
};

//TODO
export type TLetterDTO = {
  compId: string;
  receiverId: string;
  senderId: string;
  type: string;
};
