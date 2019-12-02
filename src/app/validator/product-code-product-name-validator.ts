import { AbstractControl } from '@angular/forms';

const PRODUCT_CODE = 'productCode';
const PRODUCT_NAME = 'productName';
export class ProductCodeProductNameValidator {

  static match(ac: AbstractControl) {
    const productCode = ac.get(PRODUCT_CODE).value;
    const productName = ac.get(PRODUCT_NAME).value;

    if ((productCode !== null) && (productName === null)) {
      console.log(productName);
      ac.get(PRODUCT_CODE).setErrors({ productNotExistError: true });
    } else {
      ac.get(PRODUCT_CODE).setErrors(null);
    }

  }
}
