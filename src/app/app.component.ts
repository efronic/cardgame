import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from './models/card';
import { CardService } from './services/cardservice';
import * as fromActions from './state/app.actions';
import * as fromState from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cardNumbers: number[] = [];
  cards$: Observable<Card[]>;
  playersTurn$: Observable<boolean>;
  player1Score$: Observable<number>;
  player2Score$: Observable<number>;
  clickAllowed$: Observable<boolean>;
  cards: Card[];
  componentActive = true;
  imgUrl = 'https://i.picsum.photos/id/';
  title = 'Card Game';
  constructor(
    private store: Store<fromState.AppState>,
    private cardService: CardService
  ) {}
  ngOnInit(): void {
    this.cards = this.cardService.getGameCards();
    console.log('this.cards', this.cards);

    this.store.dispatch(new fromActions.Load(this.cards));
    this.cards$ = this.store.pipe(select(fromState.getCards));
    this.playersTurn$ = this.store.pipe(select(fromState.getCurrentPlayer));
    this.player1Score$ = this.store.pipe(select(fromState.getFirstPlayerScore));
    this.player2Score$ = this.store.pipe(
      select(fromState.getSecondPlayerScore)
    );
    this.clickAllowed$ = this.store.pipe(select(fromState.getClickAllowed));
    this.cards$.subscribe((a) => console.log(a));
  }
  flipped(card: Card): void {
    card = { ...card };
    card.flipped = true;
    card.currentCard = true;

    this.store.dispatch(new fromActions.ToggleFlip(card));
    setTimeout(() => {
      this.store.dispatch(new fromActions.FinalizeToggle());
    }, 800);
  }
}
