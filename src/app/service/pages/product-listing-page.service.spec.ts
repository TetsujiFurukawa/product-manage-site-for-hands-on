import { TestBed } from '@angular/core/testing';

import { ProductListingPageService } from './product-listing-page.service';

describe('ProductListingPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListingPageService = TestBed.get(ProductListingPageService);
    expect(service).toBeTruthy();
  });
});
