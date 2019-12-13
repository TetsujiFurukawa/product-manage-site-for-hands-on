import { AppConst } from 'src/app/const/app-const';
import {
    ProductListingSearchParams
} from 'src/app/entity/dto/request/product-listing-search-params';

import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { SearchParamsService } from './search-params.service';
import { SessionStrageService } from './session-strage.service';

describe('SearchParamsService', () => {
  let service: SearchParamsService;
  let sessionStrageService: SessionStrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStrageService]
    });
    service = TestBed.get(SearchParamsService);
    sessionStrageService = TestBed.get(SessionStrageService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setProductListingSearchParam,#getProductListingSearchParam', () => {
    it('should set value', () => {
      const expectedProductListingSearchParams: ProductListingSearchParams = createProductListingSearchParams();

      service.setProductListingSearchParam(expectedProductListingSearchParams);
      const res: ProductListingSearchParams = service.getProductListingSearchParam(new ProductListingSearchParams());
      expect(res.endOfSale).toEqual(expectedProductListingSearchParams.endOfSale);
      expect(res.pageIndex).toEqual(expectedProductListingSearchParams.pageIndex);
      expect(res.pageSize).toEqual(expectedProductListingSearchParams.pageSize);
      expect(res.productCode).toEqual(expectedProductListingSearchParams.productCode);
      expect(res.productGenre).toEqual(expectedProductListingSearchParams.productGenre);
      expect(res.productName).toEqual(expectedProductListingSearchParams.productName);
    });
  });

  describe('#removeProductListingSearchParam', () => {
    it('should remove value', () => {
      const expectedProductListingSearchParams: ProductListingSearchParams = createProductListingSearchParams();
      service.setProductListingSearchParam(expectedProductListingSearchParams);
      service.removeProductListingSearchParam();
      expect(service.getProductListingSearchParam(new ProductListingSearchParams())).toBeNull();
    });
  });
});

function createProductListingSearchParams() {
  const expectedProductListingSearchParams: ProductListingSearchParams = new ProductListingSearchParams();
  expectedProductListingSearchParams.endOfSale = true;
  expectedProductListingSearchParams.pageIndex = 1;
  expectedProductListingSearchParams.pageSize = 1;
  expectedProductListingSearchParams.productCode = 'productCode';
  expectedProductListingSearchParams.productGenre = '1';
  expectedProductListingSearchParams.productName = 'productName';
  return expectedProductListingSearchParams;
}
