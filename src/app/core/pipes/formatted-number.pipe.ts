import { RegexConst } from 'src/app/pages/constants/regex-const';

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { NumberUtility } from '../utilities/number-utility';

@Pipe({
  name: 'formattedNumber'
})
export class FormattedNumberPipe implements PipeTransform {
  transform(value: any, locale: string): any {
    const regexp = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD);
    if (!value.toString().match(regexp)) {
      return value;
    }
    return new DecimalPipe(locale).transform(this.parse(value.toString(), locale), '1.0-0', locale);
  }

  parse(value: any, locale: string): any {
    return NumberUtility.parseNumber(value.toString(), locale);
  }
}
