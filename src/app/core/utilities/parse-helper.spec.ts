import { ParseHelper } from './parse-helper';

describe('ParseHelper', () => {
  const LOCALE_JP = 'ja-JP';
  const LOCALE_EN = 'en-US';
  const LOCALE_FR = 'fr-FR';
  const LOCALE_DE = 'de-DE';
  const CURRENCY_JPY = 'JPY';
  const CURRENCY_USD = 'USD';
  const CURRENCY_EUR = 'EUR';

  describe('#parseNumber', () => {
    const parameters = [
      {
        locale: LOCALE_JP,
        inputValue: '1,234,567',
        expectedValue: '1234567'
      },
      {
        locale: LOCALE_EN,
        inputValue: '1,234,567',
        expectedValue: '1234567'
      },
      {
        locale: LOCALE_FR,
        inputValue: '1 234 567',
        expectedValue: '1234567'
      },
      {
        locale: LOCALE_DE,
        inputValue: '1.234.567',
        expectedValue: '1234567'
      }
    ];

    parameters.forEach((parameter) => {
      it('should correctly converted in locale ' + parameter.locale, () => {
        expect(ParseHelper.parseNumber(parameter.inputValue, parameter.locale)).toEqual(parameter.expectedValue);
      });
    });
  });

  describe('#parseCurrencyToNumber', () => {
    const parameters = [
      {
        locale: LOCALE_JP,
        currency: CURRENCY_JPY,
        inputValue: '1,234,567',
        expectedValue: '1234567'
      },
      {
        locale: LOCALE_EN,
        currency: CURRENCY_USD,
        inputValue: '1,234,567.89',
        expectedValue: '1234567.89'
      },
      {
        locale: LOCALE_FR,
        currency: CURRENCY_EUR,
        inputValue: '1 234 567,89',
        expectedValue: '1234567.89'
      },
      {
        locale: LOCALE_DE,
        currency: CURRENCY_EUR,
        inputValue: '1.234.567,89',
        expectedValue: '1234567.89'
      }
    ];

    parameters.forEach((parameter) => {
      it('should correctly converted in locale ' + parameter.locale + ' and in currency ' + parameter.currency, () => {
        expect(ParseHelper.parseCurrencyToNumber(parameter.inputValue, parameter.locale, parameter.currency)).toEqual(
          parameter.expectedValue
        );
      });
    });
  });
});
