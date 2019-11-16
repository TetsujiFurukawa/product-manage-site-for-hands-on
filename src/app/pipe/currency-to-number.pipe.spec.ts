import { CurrencyToNumberPipe } from './currency-to-number.pipe';

describe('CurrencyToNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyToNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
