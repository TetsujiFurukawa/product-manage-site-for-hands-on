import { RegexConst } from 'src/app/pages/constants/regex-const';

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberComma'
})
export class NumberCommaPipe implements PipeTransform {
  transform(value: any, locale: string): any {
    const regexp = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD);
    if (!value.toString().match(regexp)) {
      return value;
    }
    return new DecimalPipe(locale).transform(this.parse(value.toString()), '1.0', locale);
  }

  parse(value: any): any {
    return value.toString().replace(/,/g, '');
  }
}
