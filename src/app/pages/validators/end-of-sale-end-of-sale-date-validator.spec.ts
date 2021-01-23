import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { EndOfSaleEndOfSaleDateValidator } from './end-of-sale-end-of-sale-date-validator';

const END_OF_SALE_DATE = 'endOfSaleDate';

describe('EndOfSaleEndOfSaleDateValidator', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const testingForm: FormGroup = formBuilder.group({
    endOfSale: new FormControl(''),
    endOfSaleDate: new FormControl('')
  });

  describe('#validate', () => {
    it('should not have error', () => {
      testingForm.setValue({ endOfSale: false, endOfSaleDate: null });
      EndOfSaleEndOfSaleDateValidator(testingForm);
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeNull();
    });

    it('should have error', () => {
      testingForm.setValue({ endOfSale: true, endOfSaleDate: null });
      EndOfSaleEndOfSaleDateValidator(testingForm);
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeTruthy();
    });
  });
});
