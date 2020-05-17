import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;
  beforeEach(() => {
    service = new CardService();
  });
  it('shold have no card numbers to start', () => {
    expect(service.cardNumbers.length).toBe(0);
  });
  it('should card number array length = 8 when randomize is called', () => {
    service.randomize();
    expect(service.cardNumbers.length).toBe(8);
  });
  it('should have no duplicates in card number array when randomize is called', () => {
    service.randomize();
    expect(
      new Set(service.cardNumbers).size === service.cardNumbers.length
    ).toBeTruthy();
  });
  it('should have 15 cards in cards array when getGameCards is called', () => {
    expect(service.getGameCards().length).toBe(15);
  });
  it('should have 15 cards in cards array when shuffle is called', () => {
    expect(service.shuffle(service.getGameCards()).length).toBe(15);
  });
  it('should return different order of cards array when shuffle is called', () => {
    const original = service.getGameCards();
    const shuffled = service.shuffle(original);

    expect(JSON.stringify(original) == JSON.stringify(shuffled)).toBeFalsy();
  });
});
