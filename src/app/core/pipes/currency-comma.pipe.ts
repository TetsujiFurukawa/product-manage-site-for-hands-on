import { RegexConst } from 'src/app/pages/constants/regex-const';

import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyComma'
})
export class CurrencyCommaPipe implements PipeTransform {
  transform(value: any, locale: string, currency: string): any {
    const regexp = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD);
    if (!value.toString().match(regexp)) {
      return value;
    }
    return new CurrencyPipe(locale).transform(this.parse(value.toString()), currency, '', '', locale);
  }

  parse(value: any): any {
    return value.toString().replace(/,/g, '');
  }
}