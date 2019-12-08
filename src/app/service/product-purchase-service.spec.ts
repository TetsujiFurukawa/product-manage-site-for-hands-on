import { TestBed } from '@angular/core/testing';

import { ProductPurchaseService } from './product-purchase.service';

xdescribe('PurchaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPurchaseService = TestBed.get(ProductPurchaseService);
    expect(service).toBeTruthy();
  });
});
