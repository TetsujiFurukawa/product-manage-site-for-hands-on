import { AbstractControl } from '@angular/forms';
import { CurrencyToNumberPipe } from '../pipe/currency-to-number.pipe';

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

        const currencyToNumberPipe: CurrencyToNumberPipe = new CurrencyToNumberPipe();
        const numProductStockQuantity = Number(currencyToNumberPipe.parse(productStockQuantity));
        const numProductPurchaseQuantity = Number(currencyToNumberPipe.parse(productPurchaseQuantity));
        if (numProductPurchaseQuantity > numProductStockQuantity) {
            ac.get(PRODUCT_PURCHASE_QUANTITY).setErrors({ exceedStockError: true });
        }
    }
}
