import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'app-cardgrid',
  templateUrl: './cardgrid.component.html',
  styleUrls: ['./cardgrid.component.scss'],
})
export class CardgridComponent {
  @Input() cards: Card[];
  @Output() flipped = new EventEmitter<Card>();
  /**
   *
   */
  constructor() {
    console.log('this.cards from presentation ', this.cards);
  }
  flip(card: Card): void {
    if (card.flipped) {
      return;
    } else {
      this.flipped.emit(card);
    }
  }
}
