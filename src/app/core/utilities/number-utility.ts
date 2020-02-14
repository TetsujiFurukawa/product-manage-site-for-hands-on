import { CurrencyPipe, DecimalPipe } from '@angular/common';

export const NumberUtility = {
  /**
   * Parses number
   * @param value value with thousand separator and decimal point
   * @param locale locale
   * @returns parsed number value
   */
  parseNumber(value: any, locale: string) {
    const localeTest = new DecimalPipe(locale).transform('1111', '', locale);
    return parse(localeTest, value);
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
    return parse(localeTest, value);
  }
};

function createThousandSeparatorRegex(thousandSeparator: string) {
  if (thousandSeparator === '.') {
    thousandSeparator = '\\.';
  }
  return thousandSeparator;
}

function parse(localeTest: string, value: any) {
  let thousandSeparator = localeTest.charAt(1);
  thousandSeparator = createThousandSeparatorRegex(thousandSeparator);
  return value
    .toString()
    .replace(new RegExp(' ', 'g'), '')
    .replace(new RegExp(thousandSeparator, 'g'), '');
}
