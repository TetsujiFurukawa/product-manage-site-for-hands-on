import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ProductCodeProductNameValidator } from './product-code-product-name-validator';

const PRODUCT_CODE = 'productCode';

describe('ProductCodeProductNameValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCodeProductNameValidator]
    });
  });

  describe('#match', () => {
    it('should have error', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productCode: new FormControl('productCode'),
        productName: new FormControl(null)
      });
      ProductCodeProductNameValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeTruthy();
    });

    it('should not have error', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        productCode: new FormControl('productCode'),
        productName: new FormControl('productName')
      });
      ProductCodeProductNameValidator.match(testingForm);
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeNull();
    });
  });
});
