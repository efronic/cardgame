import { Status } from './status';
import { Card } from './card';

export interface CurrentState {
  remains?: number;
  status?: Status;
  cards?: Card[];
  lastSelectedCard?: Card;
}
