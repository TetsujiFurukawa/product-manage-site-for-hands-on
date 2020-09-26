import { RegexConst } from 'src/app/core/constants/regex-const';

import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ParseHelper } from '../utilities/parse-helper';

@Pipe({
  name: 'formattedCurrency'
})
export class FormattedCurrencyPipe implements PipeTransform {
  transform(value: any, locale: string, currency: string): string {
    const regexp = new RegExp(RegexConst.SINGLE_BYTE_NUMERIC_COMMA_PERIOD_SPACE);

    // If the format is not proper, returnes the character string without conversion.
    if (!value.toString().match(regexp)) {
      return value;
    }

    // Removes blanks and commas before converting
    const blankCommaRemovedValue = value
      .toString()
      // First converts with half-width blank
      .replace(new RegExp(RegexConst.HalfWidthBlank, 'g'), '')
      .replace(new RegExp(RegexConst.HalfWidthComma, 'g'), '');

    return new CurrencyPipe(locale).transform(blankCommaRemovedValue, currency, '', '', locale);
  }

  parse(value: any, locale: string, currency: string): string {
    return ParseHelper.parseCurrencyToNumber(value.toString(), locale, currency);
    // If the Parse Helper class is difficult, use the comment line below instead.
    // return value.toString().replace(/,/g, '');
  }
}
