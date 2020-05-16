import { initialState, AppState, getWinner } from './app.state';
import { AppActions, ActionTypes } from './app.actions';
import { Card } from '../models/card';

export function AppReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.Load:
      return {
        ...state,
        getCards: action.payload,
        getClickAllowed: initialState.getClickAllowed,
        getNumberOfFlippedCards: initialState.getNumberOfFlippedCards,
        getFirstCardId: initialState.getFirstCardId,
        getWinner: initialState.getWinner,
        getError: initialState.getError,
        getFirstPlayerScore: initialState.getFirstPlayerScore,
        getSecondPlayerScore: initialState.getSecondPlayerScore,
        getCurrentPlayer: initialState.getCurrentPlayer,
      };
    case ActionTypes.ToggleFlip:
      let flippedCard = action.payload;
      let stateCards = state.getCards;
      // const existingCard = stateCards.find((p) => p.id == flippedCard.id);
      const firstTryout = isEven(stateCards.filter((p) => p.flipped).length);
      let updatedCards = state.getCards.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      // if first card to be flipped - there are even number of cards flipped in the array => this is the first next round card to be flipped
      if (firstTryout) {
        return {
          ...state,
          getCards: updatedCards,
          getClickAllowed: false,
          getNumberOfFlippedCards: 1,
          getFirstCardId: flippedCard.id,
        };
        // if second card to be flipped - scoring happens here
      } else {
        return {
          ...state,
          getCards: updatedCards,
          getClickAllowed: false,
          getNumberOfFlippedCards: 2,
        };
      }
    case ActionTypes.FinalizeToggle:
      const thereAre2 = state.getNumberOfFlippedCards == 2;
      let cards = null;
      let itsAMatch = false;
      let newFirstPlayerScore = state.getFirstPlayerScore;
      let newSecondPlayerScore = state.getSecondPlayerScore;
      let newCurrentPlayer = state.getCurrentPlayer;
      if (thereAre2) {
        let stateCards = state.getCards;
        const currentCards = stateCards.filter((p) => p.currentCard == true);
        let card1 = { ...currentCards[0] };
        let card2 = { ...currentCards[1] };
        if (card1.name == card2.name) {
          itsAMatch = true;
          card1.currentCard = card2.currentCard = false;
        } else {
          itsAMatch = false;
        }

        if (itsAMatch) {
          if (!state.getCurrentPlayer) {
            newFirstPlayerScore += 1;
          } else {
            newSecondPlayerScore += 1;
          }
        } else {
          card2.currentCard = false;
          card2.flipped = false;
          card1.flipped = false;
          card1.currentCard = false;
          newCurrentPlayer = !newCurrentPlayer;
        }
        cards = state.getCards
          .map((item2: Card) => (card2.id === item2.id ? card2 : item2))
          .map((item1: Card) => (card1.id === item1.id ? card1 : item1));
        return {
          ...state,
          getCards: cards,
          getClickAllowed: true,
          getFirstPlayerScore: newFirstPlayerScore,
          getSecondPlayerScore: newSecondPlayerScore,
          getCurrentPlayer: newCurrentPlayer,
          getNumberOfFlippedCards: 0,
          getWinner:
            cards.filter((p: Card) => p.flipped).length == cards.length - 1
              ? newFirstPlayerScore > newSecondPlayerScore
                ? false
                : true
              : state.getWinner,
        };
      } else {
        return { ...state, getClickAllowed: true };
      }
    default:
      break;
  }
}
function isEven(n: number) {
  return n % 2 == 0;
}
