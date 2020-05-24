import { AppConst } from 'src/app/pages/constants/app-const';
import {
    ProductListingSearchParams
} from 'src/app/pages/models/dtos/requests/product-listing-search-params';

import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from './session-strage.service';

describe('SessionStrageService', () => {
  let service: SessionStrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStrageService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setItem,#getItem', () => {
    it('should set value', () => {
      const expectedProductListingSearchParams: ProductListingSearchParams = createProductListingSearchParams();

      SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, expectedProductListingSearchParams);
      const res: ProductListingSearchParams = SessionStrageService.getItem(
        AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST,
        new ProductListingSearchParams()
      );
      expect(res.endOfSale).toEqual(expectedProductListingSearchParams.endOfSale);
      expect(res.pageIndex).toEqual(expectedProductListingSearchParams.pageIndex);
      expect(res.pageSize).toEqual(expectedProductListingSearchParams.pageSize);
      expect(res.productCode).toEqual(expectedProductListingSearchParams.productCode);
      expect(res.productGenre).toEqual(expectedProductListingSearchParams.productGenre);
      expect(res.productName).toEqual(expectedProductListingSearchParams.productName);
    });
  });

  describe('#removeItem', () => {
    it('should remove value', () => {
      const expectedProductListingSearchParams: ProductListingSearchParams = createProductListingSearchParams();
      SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, expectedProductListingSearchParams);
      SessionStrageService.removeItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
      expect(
        SessionStrageService.getItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, new ProductListingSearchParams())
      ).toBeNull();
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
