import { initialState, AppState } from './app.state';
import { AppActions, ActionTypes } from './app.actions';

export function AppReducer(
  state = initialState,
  action: AppActions
): AppState {
  switch (action.type) {
    case ActionTypes.ToggleFlip:
      return {
        ...state,
        // getCards: { ...action.payload },
      };
      default:
        break;
    }
  }
