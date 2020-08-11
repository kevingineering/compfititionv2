// https://stackoverflow.com/questions/54542318/using-an-enum-as-a-dictionary-key
type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export enum GoalTypeEnum {
  'passfail',
  'total',
  'difference',
}

export const goalTypeDescriptors: EnumDictionary<GoalTypeEnum, string> = {
  [GoalTypeEnum.passfail]: 'Success',
  [GoalTypeEnum.total]: 'Total',
  [GoalTypeEnum.difference]: 'Change',
};

export interface IGoal {
  id: string;
  name: string;
  userId: string;
  duration: number;
  startDate: Date;
  type: GoalTypeEnum;
  description: string;
  units: string;
  total: number;
  isPrivate: boolean;
  compId: string | null;
  tracker: boolean[] | number[] | string[];
}
