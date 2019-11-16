import { AbstractControl } from '@angular/forms';

const END_OF_SALE_DATE = 'endOfSaleDate';
const END_OF_SALE = 'endOfSale';

export class EndOfSaleEndOfSaleDateValidator {

  static match(ac: AbstractControl) {
    const endOfSale = ac.get(END_OF_SALE).value;
    const endOfSaleDate = ac.get(END_OF_SALE_DATE).value;

    if ((true === endOfSale) && (endOfSaleDate === null)) {
      ac.get(END_OF_SALE_DATE).setErrors({ required: true });
    }

  }
}
