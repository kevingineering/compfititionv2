import { TAlert } from '../../types';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

export interface ISetAlert {
  type: typeof SET_ALERT;
  payload: TAlert;
}

export interface IClearAlert {
  type: typeof CLEAR_ALERT;
}

export interface IRemoveAlert {
  type: typeof REMOVE_ALERT;
  payload: number;
}

export type AlertDispatchTypes = ISetAlert | IClearAlert | IRemoveAlert;
