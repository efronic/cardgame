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
    this.cards$.subscribe((a) => console.log(a));
  }
  flipped(card: Card): void {
    card = { ...card };
    card.flipped = true;

    this.store.dispatch(new fromActions.ToggleFlip(card));
    setTimeout(() => {
      this.store.dispatch(new fromActions.FinalizeToggle())

    }, 2000);
  }
}
