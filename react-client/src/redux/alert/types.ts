import { TAlert } from '../../types';

export enum EAlertActions {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  CLEAR_ALERT = 'CLEAR_ALERT',
}

export interface ISetAlert {
  type: EAlertActions.SET_ALERT;
  payload: TAlert;
}

export interface IClearAlert {
  type: EAlertActions.CLEAR_ALERT;
}

export interface IRemoveAlert {
  type: EAlertActions.REMOVE_ALERT;
  payload: number;
}

export type AlertDispatchTypes = ISetAlert | IClearAlert | IRemoveAlert;
