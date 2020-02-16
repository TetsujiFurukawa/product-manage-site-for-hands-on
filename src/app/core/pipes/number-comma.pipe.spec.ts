import { TestBed } from '@angular/core/testing';

import { NumberCommaPipe } from './number-comma.pipe';

describe('NumberCommaPipe', () => {
  let pipe: NumberCommaPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberCommaPipe]
    });
    pipe = TestBed.inject(NumberCommaPipe);
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
      expect(pipe.transform(value, locale)).toEqual('1,234,567');
    });

    it('should return transform result', () => {
      const value = 'あいうえお';
      const locale = 'ja-JP';
      const currency = 'JPY';
      expect(pipe.transform(value, locale)).toEqual('あいうえお');
    });
  });
});
