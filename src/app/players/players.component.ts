import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent {
  constructor() {}
  @Input() player1Score: number;
  @Input() player2Score: number;
  @Input() playersTurn: boolean;
}
