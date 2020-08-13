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
    it('locale ja-JP', () => {
      const inputValue = '1,234,567';
      const expectedValue = '1234567';
      expect(ParseHelper.parseNumber(inputValue, LOCALE_JP)).toEqual(expectedValue);
    });
    it('locale en-US', () => {
      const inputValue = '1,234,567';
      const expectedValue = '1234567';
      expect(ParseHelper.parseNumber(inputValue, LOCALE_EN)).toEqual(expectedValue);
    });
    it('locale fr-FR', () => {
      const inputValue = '1 234 567';
      const expectedValue = '1234567';
      expect(ParseHelper.parseNumber(inputValue, LOCALE_FR)).toEqual(expectedValue);
    });
    it('locale de-DE', () => {
      const inputValue = '1.234.567';
      const expectedValue = '1234567';
      expect(ParseHelper.parseNumber(inputValue, LOCALE_DE)).toEqual(expectedValue);
    });
  });
  describe('#parseCurrencyToNumber', () => {
    it('locale ja-JP', () => {
      const inputValue = '1,234,567';
      const expectedValue = '1234567';
      expect(ParseHelper.parseCurrencyToNumber(inputValue, LOCALE_JP, CURRENCY_JPY)).toEqual(expectedValue);
    });
    it('locale en-US', () => {
      const inputValue = '1,234,567.89';
      const expectedValue = '1234567.89';
      expect(ParseHelper.parseCurrencyToNumber(inputValue, LOCALE_EN, CURRENCY_USD)).toEqual(expectedValue);
    });
    it('locale fr-FR', () => {
      const inputValue = '1 234 567,89';
      const expectedValue = '1234567,89';
      expect(ParseHelper.parseCurrencyToNumber(inputValue, LOCALE_FR, CURRENCY_EUR)).toEqual(expectedValue);
    });
    it('locale de-DE', () => {
      const inputValue = '1.234.567,89';
      const expectedValue = '1234567,89';
      expect(ParseHelper.parseCurrencyToNumber(inputValue, LOCALE_DE, CURRENCY_EUR)).toEqual(expectedValue);
    });
  });
});
