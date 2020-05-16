import { initialState, AppState } from './app.state';
import { AppActions, ActionTypes } from './app.actions';
import { Card } from '../models/card';

export function AppReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.Load:
      return { ...state, getCards: action.payload };
    case ActionTypes.ToggleFlip:
      let flippedCard = action.payload;
      // flippedCard.currentCard = true;
      // let newFirstPlayerScore = state.getFirstPlayerScore;
      // let newSecondPlayerScore = state.getSecondPlayerScore;
      let stateCards = state.getCards;
      const existingCard = stateCards.find((p) => p.id == flippedCard.id);
      const firstTryout = isEven(stateCards.filter((p) => p.flipped).length);
      let updatedCards = state.getCards.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      console.log('existingCard: ', existingCard);
      console.log('firstTryout: ', firstTryout);
      // console.log('newFirstPlayerScore: ', newFirstPlayerScore);
      // console.log('newSecondPlayerScore: ', newSecondPlayerScore);

      // if first card to be flipped - there are even number of cards flipped in the array => this is the first next round card to be flipped
      if (firstTryout) {
        console.log('statecards', stateCards);

        //  stateCards.find((p) => p.id == flippedCard.id);
        return {
          ...state,
          getCards: updatedCards,
          getClickAllowed: false,
          getNumberOfFlippedCards: 1,
          getFirstCardId: flippedCard.id,
          // getFlippedCards: [...state.getFlippedCards, flippedCard],
        };
        // if second card to be flipped - scoring happens here
      } else {
        return {
          ...state,
          // getFlippedCards: [...state.getFlippedCards, flippedCard],
          getCards: updatedCards,
          getClickAllowed: false,
          getNumberOfFlippedCards: 2,
        };
      }

    // else if (
    //   !firsCardTryout &&
    //   existingCard &&
    //   existingCard.name == flippedCard.name &&
    //   existingCard.flipped
    // ) {
    //   if (!state.currentPlayer) {
    //     newFirstPlayerScore++;
    //   } else {
    //     newSecondPlayerScore++;
    //   }
    //   // stateCards.find((p) => p.id == flippedCard.id).flipped = true;
    //   const updatedCards = state.getCards.map((item) =>
    //     action.payload.id === item.id ? action.payload : item
    //   );
    //   return {
    //     ...state,
    //     getCards: updatedCards,
    //     currentPlayer: state.currentPlayer,
    //     firstPlayerScore: newFirstPlayerScore,
    //     secondPlayerScore: newSecondPlayerScore,
    //   };
    //   // player looses, the other player scores
    // } else {
    //   return {
    //     ...state,
    //     currentPlayer: !state.currentPlayer,
    //     firstPlayerScore: newFirstPlayerScore,
    //     secondPlayerScore: newSecondPlayerScore,
    //   };
    // }
    case ActionTypes.FinalizeToggle:
      const thereAre2 = state.getNumberOfFlippedCards == 2;
      let updatedCards2 = null;
      console.log('thereAre2', thereAre2);
      let itsAMatch = false;
      let newFirstPlayerScore = state.getFirstPlayerScore;
      let newSecondPlayerScore = state.getSecondPlayerScore;
      let newCurrentPlayer = state.getCurrentPlayer;
      if (thereAre2) {
        console.log('thereAre2', thereAre2);
        let stateCards = state.getCards;
        const currentCards = stateCards.filter((p) => p.currentCard == true);
        let card1 = { ...currentCards[0] };
        let card2 = { ...currentCards[1] };
        // let updatedCards2 = null;
        // let updatedCards3 = null;
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
          // if (card1.id == state.getFirstCardId) {
          card2.currentCard = false;
          card2.flipped = false;
          // } else {
          card1.flipped = false;
          card1.currentCard = false;
          // }
          // currentCards.map((item) => (item.flipped = false));
          // currentCards.map((item) => (item.currentCard = false));
          // const po = {
          //   ...this.createPurchaseOrder,
          //   ...this.CreatePurchaseOrderForm.getRawValue(),
          // };
          // currentCards[0].currentCard = false;
          // currentCards[1].flipped = false;
          // currentCards[1].currentCard = false;

          newCurrentPlayer = !newCurrentPlayer;
        }
        updatedCards2 = state.getCards
          .map((item2: Card) => (card2.id === item2.id ? card2 : item2))
          .map((item1: Card) => (card1.id === item1.id ? card1 : item1));

        console.log('currentCards finalize thereare2', currentCards);
        console.log('itsAMatch finalize thereare2', itsAMatch);
        console.log(
          'newFirstPlayerScore finalize thereare2',
          newFirstPlayerScore
        );
        console.log(
          'newSecondPlayerScore finalize thereare2',
          newSecondPlayerScore
        );
        console.log('newCurrentPlayer finalize thereare2', newCurrentPlayer);

        return {
          ...state,
          getCards: updatedCards2,
          getClickAllowed: true,
          getFirstPlayerScore: newFirstPlayerScore,
          getSecondPlayerScore: newSecondPlayerScore,
          getCurrentPlayer: newCurrentPlayer,
          // getNumberOfFlippedCards: itsAMatch ? 0 : 1,
          getNumberOfFlippedCards: 0,
        };
        // currentCards.
        //   const updatedCards = state.getCards.map((item) =>
        //   action.payload.id === item.id ? action.payload : item
        // );

        // if (state.getFlippedCards[0].name == state.getFlippedCards[1].name) {
        //   let updatedCards2 = state.getCards.map((item) =>
        //     item.id == state.getFlippedCards[0].id
        //       ? state.getFlippedCards[0]
        //       : item
        //   );
        //   updatedCards2 = state.getCards.map((item) =>
        //     item.id == state.getFlippedCards[1].id
        //       ? state.getFlippedCards[1]
        //       : item
        //   );
        // return { ...state, getCards: updatedCards2, getFlippedCards: [] };
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
