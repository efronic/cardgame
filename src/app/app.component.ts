import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cardNumbers: number[] = [];
  imgUrl = 'https://i.picsum.photos/id/';
  title = 'Card Game';


}
