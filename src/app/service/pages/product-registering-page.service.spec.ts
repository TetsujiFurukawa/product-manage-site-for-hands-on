import { TestBed } from '@angular/core/testing';

import { ProductRegisteringPageService } from './product-registering-page.service';

describe('ProductRegisteringPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductRegisteringPageService = TestBed.get(ProductRegisteringPageService);
    expect(service).toBeTruthy();
  });
});
