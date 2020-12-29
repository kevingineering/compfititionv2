import { CompetitionButtonTypes } from '../../buttonTypes';

export enum ECommonCompetitionActions {
  COMPETITION_LOADING = 'COMPETITION_LOADING',
  COMPETITION_ERROR = 'COMPETITION_ERROR',
}

export interface ICompetitionLoading {
  type: ECommonCompetitionActions.COMPETITION_LOADING;
  payload: {
    type: CompetitionButtonTypes;
    userId?: string;
  };
}

export interface ICompetitionError {
  type: ECommonCompetitionActions.COMPETITION_ERROR;
  payload?: string;
}

export type CommonDispatchTypes = ICompetitionLoading | ICompetitionError;
