import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { RegexConst } from '../const/regex-const';

@Pipe({
  name: 'currencyToNumber'
})
export class CurrencyToNumberPipe implements PipeTransform {

  transform(value: string, locale: string, currency: string): any {
    const regexp = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD);
    if (!value.match(regexp)) {
      return value;
    }
    return new CurrencyPipe(locale).transform(value, currency, '', '', locale);
  }

  parse(value: any): any {
    return value.replace(/,/g, '');
  }

}
