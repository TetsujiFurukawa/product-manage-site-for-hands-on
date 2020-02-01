import { CurrencyPipe, DecimalPipe } from '@angular/common';

const CHAR_CODE_FRENCH_SEPARATOR = 160; // Hex(A0)

export const NumberUtility = {
  /**
   * Parses number
   * @param value value with thousand separator and decimal point
   * @param locale locale
   * @returns parsed number value
   */
  parseNumber(value: any, locale: string) {
    const localeTest = new DecimalPipe(locale).transform('1111', '', locale);
    let thousandSeparator = localeTest.charAt(1);
    thousandSeparator = whenHexA0ReplaceToSpace(thousandSeparator);
    thousandSeparator = whenPeriodAddEscape(thousandSeparator);

    return value.toString().replace(new RegExp(thousandSeparator, 'g'), '');
  },

  /**
   * Parses currency to number
   * @param value value with thousand separator and decimal point
   * @param locale locale
   * @param currency currency
   * @returns parsed number value
   */
  parseCurrencyToNumber(value: any, locale: string, currency: string) {
    const localeTest = new CurrencyPipe(locale).transform('1111', currency, '', '', locale);
    let thousandSeparator = localeTest.charAt(1);
    thousandSeparator = whenHexA0ReplaceToSpace(thousandSeparator);
    thousandSeparator = whenPeriodAddEscape(thousandSeparator);

    console.log('localeTest:' + localeTest);
    console.log('thousandSeparator:' + thousandSeparator);

    return value.toString().replace(new RegExp(thousandSeparator, 'g'), '');
  }
};

function whenHexA0ReplaceToSpace(thousandSeparator: string) {
  if (thousandSeparator.charCodeAt(0) === CHAR_CODE_FRENCH_SEPARATOR) {
    thousandSeparator = ' ';
  }
  return thousandSeparator;
}
function whenPeriodAddEscape(thousandSeparator: string) {
  if (thousandSeparator === '.') {
    thousandSeparator = '\\.';
  }
  return thousandSeparator;
}
