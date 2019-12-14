import { TestBed } from '@angular/core/testing';

import { CurrencyToNumberPipe } from './currency-to-number.pipe';

// xdescribe('CurrencyToNumberPipe', () => {
//   it('create an instance', () => {
//     const pipe = new CurrencyToNumberPipe();
//     expect(pipe).toBeTruthy();
//   });
// });
describe('CurrencyToNumberPipe', () => {
  let pipe: CurrencyToNumberPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyToNumberPipe]
    });
    pipe = TestBed.get(CurrencyToNumberPipe);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(pipe).toBeTruthy();
    });
  });
  describe('#transform', () => {
    it('should return transform result', () => {
      const value = '1234567';
      const locale = 'ja-JP';
      const currency = 'JPY';
      expect(pipe.transform(value, locale, currency)).toEqual('1,234,567');
    });

    it('should return transform result', () => {
      const value = 'あいうえお';
      const locale = 'ja-JP';
      const currency = 'JPY';
      expect(pipe.transform(value, locale, currency)).toEqual('あいうえお');
    });
  });
});
