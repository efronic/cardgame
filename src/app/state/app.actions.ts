import { Action } from '@ngrx/store';
import { Card } from '../models/card';

export enum ActionTypes {
  ToggleFlip = 'Toggle Flip',
}
export class ToggleFlip implements Action {
  readonly type = ActionTypes.ToggleFlip;
  constructor(public payload: Card) {}
}
export type AppActions = ToggleFlip;
