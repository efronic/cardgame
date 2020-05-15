import { Action } from '@ngrx/store';
import { Card } from '../models/card';

export enum ActionTypes {
  Load = 'Load Cards',
  ToggleFlip = 'Flip a Card',
  FinalizeToggle = 'Finalize Toggle',
}
export class ToggleFlip implements Action {
  readonly type = ActionTypes.ToggleFlip;
  constructor(public payload: Card) {
    console.log('toggle flip', payload);
  }
}
export class FinalizeToggle implements Action {
  readonly type = ActionTypes.FinalizeToggle;
  constructor() {
    console.log('finalize toggle');
  }
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
  constructor(public payload: Card[]) {
    console.log('load app.actions ', payload);
  }
}
export type AppActions = ToggleFlip | Load | FinalizeToggle;
