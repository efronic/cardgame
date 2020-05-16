import { Card } from '../models/card';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  getCards: Card[];
  // getFlippedCards: Card[];
  getCurrentPlayer: boolean;
  getNumberOfFlippedCards: number;
  getFirstCardId: number;
  getFirstPlayerScore: number;
  getSecondPlayerScore: number;
  getClickAllowed: boolean;
  getError: string;
}
export const initialState: AppState = {
  getCards: [],
  // getFlippedCards: [],
  getCurrentPlayer: false,
  getNumberOfFlippedCards: 0,
  getFirstCardId: 0,
  getFirstPlayerScore: 0,
  getSecondPlayerScore: 0,
  getClickAllowed: true,
  getError: '',
};
const getState = createFeatureSelector<AppState>('cardGame');
export const getCards = createSelector(getState, (state) => state.getCards);
// export const getFlippedCards = createSelector(
//   getState,
//   (state) => state.getFlippedCards
// );
export const getCurrentPlayer = createSelector(
  getState,
  (state) => state.getCurrentPlayer
);
export const getFirstCardId = createSelector(
  getState,
  (state) => state.getFirstCardId
);
export const getNumberOfFlippedCards = createSelector(
  getState,
  (state) => state.getNumberOfFlippedCards
);
export const getFirstPlayerScore = createSelector(
  getState,
  (state) => state.getFirstPlayerScore
);
export const getSecondPlayerScore = createSelector(
  getState,
  (state) => state.getSecondPlayerScore
);
export const getClickAllowed = createSelector(
  getState,
  (state) => state.getClickAllowed
);
export const getError = createSelector(getState, (state) => state.getError);
