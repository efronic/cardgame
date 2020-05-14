import { Card } from '../models/card';

export class CardService {
  cardNumbers: number[] = [];

  randomize() {
    while (this.cardNumbers.length < 9) {
      const r = Math.floor(Math.random() * 999) + 1;
      if (this.cardNumbers.indexOf(r) === -1) {
        this.cardNumbers.push(r);
      }
    }
  }

  getGameCards() {
    this.randomize();
    const cards: Array<Card> = this.cardNumbers.map((n) => ({
      name: n,
      flipped: false,
      url: `https://i.picsum.photos/id/${n.toString()}/200/300.jpg`,
    }));
    return cards.concat(cards).map((c, i) => ({
      _id: i,
      name: c.name,
      flipped: c.flipped,
      url: c.url,
    }));
  }
}
