import { Card } from '../models/card';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  getCards: Card[];
  getFlippedCards: Card[];
  currentPlayer: string;
  flipped: boolean;
  error: string;
}
export const initialState: AppState = {
  getCards: [],
  getFlippedCards: [],
  currentPlayer: 'Player 1',
  flipped: false,
  error: '',
};
const getState = createFeatureSelector<AppState>('appstate');
export const getCards = createSelector(
  getState,
  (state) => state.getCards
);
export const getFlippedCards = createSelector(
  getState,
  (state) => state.getFlippedCards
);
export const currentPlayer = createSelector(
  getState,
  (state) => state.currentPlayer
);
export const flipped = createSelector(
  getState,
  (state) => state.flipped
);
export const error = createSelector(
  getState,
  (state) => state.error
);
