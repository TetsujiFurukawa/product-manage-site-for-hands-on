import { RegexConst } from 'src/app/pages/constants/regex-const';

import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ParseHelper } from '../utilities/parse-helper';

@Pipe({
  name: 'formattedCurrency'
})
export class FormattedCurrencyPipe implements PipeTransform {
  transform(value: any, locale: string, currency: string): string {
    const regexp = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD);

    // If the format is not proper, returnes the character string without conversion.
    if (!value.toString().match(regexp)) {
      return value;
    }
    // Converts after parsing once
    const parsedValue = this.parse(value.toString(), locale, currency);

    return new CurrencyPipe(locale).transform(parsedValue, currency, '', '', locale);
  }

  parse(value: any, locale: string, currency: string): string {
    return ParseHelper.parseCurrencyToNumber(value.toString(), locale, currency);
    // return value.toString().replace(/,/g, '');
  }
}
