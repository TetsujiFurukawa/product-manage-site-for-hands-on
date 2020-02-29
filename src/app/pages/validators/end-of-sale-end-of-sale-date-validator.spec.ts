import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { EndOfSaleEndOfSaleDateValidator } from './end-of-sale-end-of-sale-date-validator';

const END_OF_SALE_DATE = 'endOfSaleDate';

describe('EndOfSaleEndOfSaleDateValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndOfSaleEndOfSaleDateValidator]
    });
  });

  describe('#match', () => {
    it('should not have error', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        endOfSale: new FormControl(false),
        endOfSaleDate: new FormControl(null)
      });
      EndOfSaleEndOfSaleDateValidator(testingForm);
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeNull();
    });

    it('should have error', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const testingForm: FormGroup = formBuilder.group({
        endOfSale: new FormControl(true),
        endOfSaleDate: new FormControl(null)
      });
      EndOfSaleEndOfSaleDateValidator(testingForm);
      expect(testingForm.get(END_OF_SALE_DATE).getError('required')).toBeTruthy();
    });
  });
});
