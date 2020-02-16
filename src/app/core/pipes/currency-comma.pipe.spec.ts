import { TestBed } from '@angular/core/testing';

import { CurrencyCommaPipe } from './currency-comma.pipe';

describe('CurrencyCommaPipe', () => {
  let pipe: CurrencyCommaPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyCommaPipe]
    });
    pipe = TestBed.inject(CurrencyCommaPipe);
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
