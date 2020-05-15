import { initialState, AppState, getFlippedCards } from './app.state';
import { AppActions, ActionTypes } from './app.actions';

export function AppReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.Load:
      return { ...state, getCards: action.payload };
    case ActionTypes.ToggleFlip:
      const flippedCard = action.payload;
      let newFirstPlayerScore = state.firstPlayerScore;
      let newSecondPlayerScore = state.secondPlayerScore;
      let stateCards = state.getCards;
      const existingCard = stateCards.find((p) => p.id == flippedCard.id);
      const firsCardTryout = isEven(stateCards.filter((p) => p.flipped).length);
      console.log('existingCard: ', existingCard);
      console.log('firsCardTryout: ', firsCardTryout);
      console.log('newFirstPlayerScore: ', newFirstPlayerScore);
      console.log('newSecondPlayerScore: ', newSecondPlayerScore);

      // if first card to be flipped - there are even number of cards flipped in the array => this is the first next round card to be flipped
      // if (firsCardTryout) {
      console.log('statecards', stateCards);
      const updatedCards = state.getCards.map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      //  stateCards.find((p) => p.id == flippedCard.id);
      return {
        ...state,
        getCards: updatedCards,
        getFlippedCards: [...state.getFlippedCards, flippedCard],
      };
    // if second card to be flipped - scoring happens here
    // } else {
    //   return {
    //     ...state,
    //     getFlippedCards: [...state.getFlippedCards, flippedCard],
    //   };
    // }

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
      const thereAre2 = state.getFlippedCards.length == 2;
      if (thereAre2) {
        console.log('thereAre2');

        if (state.getFlippedCards[0].name == state.getFlippedCards[1].name) {
          let updatedCards2 = state.getCards.map((item) =>
            item.id == state.getFlippedCards[0].id
              ? state.getFlippedCards[0]
              : item
          );
          updatedCards2 = state.getCards.map((item) =>
            item.id == state.getFlippedCards[1].id
              ? state.getFlippedCards[1]
              : item
          );
          return { ...state, getCards: updatedCards2, getFlippedCards: [] };
        } else {
          // update to unflipped cards in getcards
          // let updatedCards2 = state.getCards.map((item) =>
          //   item.id == state.getFlippedCards[0].id
          //     ? state.getFlippedCards[0].flipped = false
          //     : item
          // );
          // updatedCards2 = state.getCards.map((item) =>
          //   item.id == state.getFlippedCards[1].id
          //     ? state.getFlippedCards[1].flipped = false
          //     : item
          // );
          return { ...state, getFlippedCards: [] };
        }
      } else {
        return { ...state };
      }
    default:
      break;
  }
}
function isEven(n: number) {
  return n % 2 == 0;
}
