import { RegexConst } from 'src/app/pages/constants/regex-const';

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ParseHelper } from '../utilities/parse-helper';

@Pipe({
  name: 'formattedNumber'
})
export class FormattedNumberPipe implements PipeTransform {
  transform(value: any, locale: string): string {
    const regexp = new RegExp(RegexConst.SINGLE_BYTE_NUMERIC_COMMA_PERIOD_SPACE);

    // If the format is not proper, returnes the character string without conversion.
    if (!value.toString().match(regexp)) {
      return value;
    }
    // Converts after parsing once
    const parsedValue = this.parse(value.toString(), locale);

    return new DecimalPipe(locale).transform(parsedValue, '1.0-0', locale);
  }

  parse(value: any, locale: string): string {
    return ParseHelper.parseNumber(value.toString(), locale);
  }
}
