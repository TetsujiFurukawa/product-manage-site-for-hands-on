import { CurrencyCommaPipe } from 'src/app/core/pipes/currency-comma.pipe';

import { AbstractControl } from '@angular/forms';

const PRODUCT_STOCK_QUANTITY = 'productStockQuantity';
const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
export class PurchaseQuantityStockQuantityValidator {
  static match(ac: AbstractControl) {
    const productStockQuantity: string = ac.get(PRODUCT_STOCK_QUANTITY).value;
    const productPurchaseQuantity: string = ac.get(PRODUCT_PURCHASE_QUANTITY).value;
    if (productStockQuantity === '' || productStockQuantity === null) {
      return;
    }
    if (productPurchaseQuantity === '' || productPurchaseQuantity === null) {
      return;
    }

    const currencyCommaPipe: CurrencyCommaPipe = new CurrencyCommaPipe();
    const numProductStockQuantity = Number(currencyCommaPipe.parse(productStockQuantity));
    const numProductPurchaseQuantity = Number(currencyCommaPipe.parse(productPurchaseQuantity));
    if (numProductPurchaseQuantity > numProductStockQuantity) {
      ac.get(PRODUCT_PURCHASE_QUANTITY).setErrors({ exceedStockError: true });
    }
  }
}
