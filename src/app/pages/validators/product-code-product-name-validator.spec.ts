import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ProductCodeProductNameValidator } from './product-code-product-name-validator';

const PRODUCT_CODE = 'productCode';

describe('ProductCodeProductNameValidator', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const testingForm: FormGroup = formBuilder.group({
    productCode: new FormControl(''),
    productName: new FormControl('')
  });

  describe('#validate', () => {
    it('should have error', () => {
      testingForm.setValue({ productCode: 'productCode', productName: null });
      ProductCodeProductNameValidator(testingForm);
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeTruthy();
    });

    it('should not have error', () => {
      testingForm.setValue({ productCode: 'productCode', productName: 'productName' });
      ProductCodeProductNameValidator(testingForm);
      expect(testingForm.get(PRODUCT_CODE).getError('productNotExistError')).toBeNull();
    });
  });
});
