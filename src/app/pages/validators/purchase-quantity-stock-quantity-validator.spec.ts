import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
    PurchaseQuantityStockQuantityValidator
} from './purchase-quantity-stock-quantity-validator';

const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
describe('PurchaseQuantityStockQuantityValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseQuantityStockQuantityValidator]
    });
  });

  describe('#validate', () => {
    it('should not have error | productStockQuantity is blank', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(''),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });
    it('should not have error | productStockQuantity is null', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(null),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity is blank', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(''),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity is null', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(null),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity equals productStockQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should have error | productPurchaseQuantity exceeds productStockQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(2),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeTruthy();
    });
  });
});
