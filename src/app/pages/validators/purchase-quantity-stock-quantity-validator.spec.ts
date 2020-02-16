import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';

import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
    PurchaseQuantityStockQuantityValidator
} from './purchase-quantity-stock-quantity-validator';

const PRODUCT_PURCHASE_QUANTITY = 'productPurchaseQuantity';
describe('PurchaseQuantityStockQuantityValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseQuantityStockQuantityValidator, FormattedCurrencyPipe]
    });
  });

  describe('#match', () => {
    it('should not have error | productStockQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(''),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });
    it('should not have error | productStockQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(null),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(''),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(null),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should not have error | productPurchaseQuantity', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(2),
        productPurchaseQuantity: new FormControl(1),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeNull();
    });

    it('should have error', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productStockQuantity: new FormControl(1),
        productPurchaseQuantity: new FormControl(2),
        validatorLocale: new FormControl('ja-JP')
      });
      PurchaseQuantityStockQuantityValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_PURCHASE_QUANTITY).getError('exceedStockError')).toBeTruthy();
    });
  });
});
