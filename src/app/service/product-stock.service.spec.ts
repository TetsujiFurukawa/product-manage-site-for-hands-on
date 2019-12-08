import { TestBed } from '@angular/core/testing';

import { ProductStockService } from './product-stock.service';

xdescribe('ProductStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductStockService = TestBed.get(ProductStockService);
    expect(service).toBeTruthy();
  });
});
