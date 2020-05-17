import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Card } from './models/card';
import { CardService } from './services/card.service';
import { DialogService } from './services/dialog.service';
import * as fromActions from './state/app.actions';
import * as fromState from './state/app.state';
import { isNullorUndefined } from './helpers/revealer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  componentActive = true;
  cards$: Observable<Card[]>;
  winner$: Observable<boolean> | Observable<null>;
  playersTurn$: Observable<boolean>;
  player1Score$: Observable<number>;
  player2Score$: Observable<number>;
  clickAllowed$: Observable<boolean>;
  cards: Card[];
  imgUrl = 'https://i.picsum.photos/id/';
  title = 'Card Game';
  constructor(
    private store: Store<fromState.AppState>,
    private cardService: CardService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.cards = this.cardService.getGameCards();

    this.store.dispatch(new fromActions.Load(this.cards));
    this.cards$ = this.store.pipe(select(fromState.getCards));
    this.winner$ = this.store.pipe(select(fromState.getWinner));
    this.playersTurn$ = this.store.pipe(select(fromState.getCurrentPlayer));
    this.player1Score$ = this.store.pipe(select(fromState.getFirstPlayerScore));
    this.player2Score$ = this.store.pipe(
      select(fromState.getSecondPlayerScore)
    );
    this.clickAllowed$ = this.store.pipe(select(fromState.getClickAllowed));
    this.store
      .pipe(
        select(fromState.getWinner),
        takeWhile(() => this.componentActive)
      )
      .subscribe((winner?: boolean) => {
        if (!isNullorUndefined(winner)) {
          this.openDialog(winner).subscribe((result) => {
            if (result) {

              this.store.dispatch(
                new fromActions.Load(this.cardService.getGameCards())
              );
            }
          });
        }
      });
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
  openDialog(winner: boolean): Observable<any> {
    return this.dialogService.confirm(winner);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
