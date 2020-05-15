import { Card } from '../models/card';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  getCards: Card[];
  getFlippedCards: Card[];
  currentPlayer: boolean;
  firstPlayerScore: number;
  secondPlayerScore: number;
  flipped: boolean;
  error: string;
}
export const initialState: AppState = {
  getCards: [],
  getFlippedCards: [],
  currentPlayer: false,
  firstPlayerScore: 0,
  secondPlayerScore: 0,
  flipped: false,
  error: '',
};
const getState = createFeatureSelector<AppState>('cardGame');
export const getCards = createSelector(getState, (state) => state.getCards);
export const getFlippedCards = createSelector(
  getState,
  (state) => state.getFlippedCards
);
export const currentPlayer = createSelector(
  getState,
  (state) => state.currentPlayer
);
export const firstPlayerScore = createSelector(
  getState,
  (state) => state.firstPlayerScore
);
export const secondPlayerScore = createSelector(
  getState,
  (state) => state.secondPlayerScore
);
export const flipped = createSelector(getState, (state) => state.flipped);
export const error = createSelector(getState, (state) => state.error);
