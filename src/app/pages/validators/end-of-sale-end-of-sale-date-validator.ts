import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const END_OF_SALE_DATE = 'endOfSaleDate';
const END_OF_SALE = 'endOfSale';

export const EndOfSaleEndOfSaleDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const endOfSale = control.get(END_OF_SALE).value;
  const endOfSaleDate = control.get(END_OF_SALE_DATE).value;

  if (!endOfSale) {
    return;
  }

  if (!endOfSaleDate) {
    const validateError = { required: true };
    control.get(END_OF_SALE_DATE).setErrors(validateError);
    return validateError;
  }
};
