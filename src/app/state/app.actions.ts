import { Action } from '@ngrx/store';
import { Card } from '../models/card';

export enum ActionTypes {
  Load = 'Load Cards',
  ToggleFlip = 'Flip a Card',
  FinalizeToggle = 'Finalize Toggle',
}
export class ToggleFlip implements Action {
  readonly type = ActionTypes.ToggleFlip;
  constructor(public payload: Card) {}
}
export class FinalizeToggle implements Action {
  readonly type = ActionTypes.FinalizeToggle;
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
  constructor(public payload: Card[]) {}
}
export type AppActions = ToggleFlip | Load | FinalizeToggle;
