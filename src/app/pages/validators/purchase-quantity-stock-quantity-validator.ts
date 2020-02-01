import { NumberCommaPipe } from 'src/app/core/pipes/number-comma.pipe';

import { AbstractControl } from '@angular/forms';

const PRODUCT_STOCK_QUANTITY = 'productStockQuantity';
const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
const VALIDATOR_LOCALE = 'validatorLocale';

export class PurchaseQuantityStockQuantityValidator {
  static match(ac: AbstractControl) {
    const productStockQuantity: string = ac.get(PRODUCT_STOCK_QUANTITY).value;
    const productPurchaseQuantity: string = ac.get(PRODUCT_PURCHASE_QUANTITY).value;
    const validatorLocale: string = ac.get(VALIDATOR_LOCALE).value;

    if (productStockQuantity === '' || productStockQuantity === null) {
      return;
    }
    if (productPurchaseQuantity === '' || productPurchaseQuantity === null) {
      return;
    }

    const numberCommaPipe: NumberCommaPipe = new NumberCommaPipe();
    const numProductStockQuantity = Number(numberCommaPipe.parse(productStockQuantity, validatorLocale));
    const numProductPurchaseQuantity = Number(numberCommaPipe.parse(productPurchaseQuantity, validatorLocale));

    console.log('numProductPurchaseQuantity:' + numProductPurchaseQuantity);
    console.log('numProductStockQuantity:' + numProductStockQuantity);

    if (numProductPurchaseQuantity > numProductStockQuantity) {
      ac.get(PRODUCT_PURCHASE_QUANTITY).setErrors({ exceedStockError: true });
    }
  }
}
