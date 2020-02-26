import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';

import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const PRODUCT_STOCK_QUANTITY = 'productStockQuantity';
const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
const VALIDATOR_LOCALE = 'validatorLocale';

export const PurchaseQuantityStockQuantityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const productStockQuantity: string = control.get(PRODUCT_STOCK_QUANTITY).value;
  const productPurchaseQuantity: string = control.get(PRODUCT_PURCHASE_QUANTITY).value;
  const validatorLocale: string = control.get(VALIDATOR_LOCALE).value;

  if (productStockQuantity === '' || productStockQuantity === null) {
    return;
  }
  if (productPurchaseQuantity === '' || productPurchaseQuantity === null) {
    return;
  }

  const formattedNumberPipe: FormattedNumberPipe = new FormattedNumberPipe();
  const numProductStockQuantity = Number(formattedNumberPipe.parse(productStockQuantity, validatorLocale));
  const numProductPurchaseQuantity = Number(formattedNumberPipe.parse(productPurchaseQuantity, validatorLocale));

  console.log('numProductPurchaseQuantity:' + numProductPurchaseQuantity);
  console.log('numProductStockQuantity:' + numProductStockQuantity);

  if (numProductPurchaseQuantity <= numProductStockQuantity) {
    return;
  }
  const errorCode = { exceedStockError: true };
  control.get(PRODUCT_PURCHASE_QUANTITY).setErrors(errorCode);

  return errorCode;
};

// export class PurchaseQuantityStockQuantityValidator {
//   static match(ac: AbstractControl) {
//     const productStockQuantity: string = ac.get(PRODUCT_STOCK_QUANTITY).value;
//     const productPurchaseQuantity: string = ac.get(PRODUCT_PURCHASE_QUANTITY).value;
//     const validatorLocale: string = ac.get(VALIDATOR_LOCALE).value;

//     if (productStockQuantity === '' || productStockQuantity === null) {
//       return;
//     }
//     if (productPurchaseQuantity === '' || productPurchaseQuantity === null) {
//       return;
//     }

//     const formattedNumberPipe: FormattedNumberPipe = new FormattedNumberPipe();
//     const numProductStockQuantity = Number(formattedNumberPipe.parse(productStockQuantity, validatorLocale));
//     const numProductPurchaseQuantity = Number(formattedNumberPipe.parse(productPurchaseQuantity, validatorLocale));

//     console.log('numProductPurchaseQuantity:' + numProductPurchaseQuantity);
//     console.log('numProductStockQuantity:' + numProductStockQuantity);

//     if (numProductPurchaseQuantity > numProductStockQuantity) {
//       ac.get(PRODUCT_PURCHASE_QUANTITY).setErrors({ exceedStockError: true });
//     }
//   }
// }
