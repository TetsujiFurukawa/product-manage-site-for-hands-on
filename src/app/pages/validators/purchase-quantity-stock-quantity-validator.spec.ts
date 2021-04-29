import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
    PurchaseQuantityStockQuantityValidator
} from './purchase-quantity-stock-quantity-validator';

const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
const LOCALE = 'ja-JP';

describe('PurchaseQuantityStockQuantityValidator', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const testingForm: FormGroup = formBuilder.group({
    productStockQuantity: new FormControl(''),
    productPurchaseQuantity: new FormControl(1)
  });

  describe('#validate', () => {
    const parameters = [
      {
        description: 'should not have error | productStockQuantity is blank',
        productStockQuantity: '',
        productPurchaseQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productStockQuantity is null',
        productStockQuantity: null,
        productPurchaseQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity is blank',
        productStockQuantity: 1,
        productPurchaseQuantity: '',
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity is null',
        productStockQuantity: 1,
        productPurchaseQuantity: null,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity is not numeric',
        productStockQuantity: 1,
        productPurchaseQuantity: 'a',
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should not have error | productPurchaseQuantity equals productStockQuantity',
        productStockQuantity: 1,
        productPurchaseQuantity: 1,
        expectedErrorOfProductPurchaseQuantity: null
      },
      {
        description: 'should have error | productPurchaseQuantity exceeds productStockQuantity',
        productStockQuantity: 1,
        productPurchaseQuantity: 2,
        expectedErrorOfProductPurchaseQuantity: true
      }
    ];
    parameters.forEach((parameter) => {
      it(parameter.description, () => {
        testingForm.setValue({
          productStockQuantity: parameter.productStockQuantity,
          productPurchaseQuantity: parameter.productPurchaseQuantity
        });
        const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
        validatorFn(testingForm);
        expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toEqual(
          parameter.expectedErrorOfProductPurchaseQuantity
        );
      });
    });
  });
});
