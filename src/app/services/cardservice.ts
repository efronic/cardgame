import { Card } from '../models/card';
import { Observable, of } from 'rxjs';

export class CardService {
  cardNumbers: number[] = [];

  randomize() {
    var max = 50;
    // const min = 20;
    for (var i = 0; i < 8; i++) {
      var temp = Math.floor(Math.random() * max);
      if (this.cardNumbers.indexOf(temp) == -1) {
        this.cardNumbers.push(temp);
      } else i--;
    }
    console.log(this.cardNumbers);

    // while (this.cardNumbers.length < 8) {
    //   const r = Math.floor(Math.random() * 16) + 1;
    //   if (this.cardNumbers.indexOf(r) === -1) {
    //     this.cardNumbers.push(r);
    //   }
    // }
  }

  getGameCards(): Card[] {
    this.randomize();
    const cards: Array<Card> = this.cardNumbers.map((n) => ({
      name: n,
      flipped: false,
      currentCard: false,

      url: `https://i.picsum.photos/id/${n.toString()}/150/200.jpg`,
    }));
    var temp = cards.concat(cards).map((c, i) => ({
      id: i,
      name: c.name,
      flipped: c.flipped,
      currentCard: false,
      url: c.url,
    }));
    temp.pop();
    return this.shuffle(temp);
  }

  shuffle(arr: any[]) {
    const newArr = arr.slice();
    for (let i = newArr.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const x = newArr[i - 1];
      newArr[i - 1] = newArr[j];
      newArr[j] = x;
    }
    return newArr;
  }
}
