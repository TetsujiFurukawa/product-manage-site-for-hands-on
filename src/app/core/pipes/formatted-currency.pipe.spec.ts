import { TestBed } from '@angular/core/testing';

import { FormattedCurrencyPipe } from './formatted-currency.pipe';

describe('FormattedCurrencyPipe', () => {
  const LOCALE_JP = 'ja-JP';
  const LOCALE_EN = 'en-US';
  const LOCALE_FR = 'fr-FR';
  const LOCALE_DE = 'de-DE';
  const CURRENCY_JPY = 'JPY';
  const CURRENCY_USD = 'USD';
  const CURRENCY_EUR = 'EUR';

  let pipe: FormattedCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedCurrencyPipe]
    });
    pipe = TestBed.inject(FormattedCurrencyPipe);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(pipe).toBeTruthy();
    });
  });
  describe('#transform', () => {
    describe('When the value to be converted is an amount, it should return transformed result', () => {
      const parameters = [
        {
          value: '1234567',
          locale: LOCALE_JP,
          currency: CURRENCY_JPY,
          expectedValue: '1,234,567'
        },
        {
          value: '1234,567',
          locale: LOCALE_JP,
          currency: CURRENCY_JPY,
          expectedValue: '1,234,567'
        },
        {
          value: '1234567.12',
          locale: LOCALE_EN,
          currency: 'USD',
          expectedValue: '1,234,567.12'
        },
        {
          value: '1,234567.12',
          locale: LOCALE_EN,
          currency: CURRENCY_USD,
          expectedValue: '1,234,567.12'
        },
        {
          value: '1234567.123',
          locale: LOCALE_FR,
          currency: CURRENCY_EUR,
          expectedValue: '1 234 567,12'
        },
        {
          value: '1234567.456',
          locale: LOCALE_DE,
          currency: CURRENCY_EUR,
          expectedValue: '1.234.567,46'
        }
      ];

      parameters.forEach((parameter) => {
        it(
          'should correctly converted from ' +
            parameter.value +
            ' to ' +
            parameter.expectedValue +
            ' in locale ' +
            parameter.locale +
            ' and in currency ' +
            parameter.currency,
          () => {
            expect(pipe.transform(parameter.value, parameter.locale, parameter.currency)).toEqual(
              parameter.expectedValue
            );
          }
        );
      });
    });

    describe('When the value to be converted is not an amount, it should return non transformed result', () => {
      it('should return non transformed result when the value to be converted is Japanese', () => {
        const value = 'あいうえお';
        const locale = 'ja-JP';
        const currency = 'JPY';
        expect(pipe.transform(value, locale, currency)).toEqual('あいうえお');
      });
    });
  });

  describe('#parse', () => {
    it('should return parsed result', () => {
      const value = '1,234,567';
      const locale = 'ja-JP';
      const currency = 'JPY';
      expect(pipe.parse(value, locale, currency)).toEqual('1234567');
    });
  });
});
