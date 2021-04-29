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
    it('should not have error | productStockQuantity is blank', () => {
      testingForm.setValue({ productStockQuantity: '', productPurchaseQuantity: 1 });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });
    it('should not have error | productStockQuantity is null', () => {
      testingForm.setValue({ productStockQuantity: null, productPurchaseQuantity: 1 });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity is blank', () => {
      testingForm.setValue({ productStockQuantity: 1, productPurchaseQuantity: '' });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity is null', () => {
      testingForm.setValue({ productStockQuantity: 1, productPurchaseQuantity: null });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity is not numeric', () => {
      testingForm.setValue({ productStockQuantity: 1, productPurchaseQuantity: 'a' });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity equals productStockQuantity', () => {
      testingForm.setValue({ productStockQuantity: 1, productPurchaseQuantity: 1 });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should have error | productPurchaseQuantity exceeds productStockQuantity', () => {
      testingForm.setValue({ productStockQuantity: 1, productPurchaseQuantity: 2 });
      const validatorFn = PurchaseQuantityStockQuantityValidator(LOCALE);
      validatorFn(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeTruthy();
    });
  });
});
