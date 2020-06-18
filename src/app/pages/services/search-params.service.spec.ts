import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from '../../core/services/session-strage.service';
import {
    ProductListingSearchParams
} from '../models/interfaces/requests/product-listing-search-params';
import { SearchParamsService } from './search-params.service';

describe('SearchParamsService', () => {
  let service: SearchParamsService;
  let sessionStrageService: SessionStrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStrageService]
    });
    service = TestBed.inject(SearchParamsService);
    sessionStrageService = TestBed.inject(SessionStrageService);
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
      const res: ProductListingSearchParams = service.getProductListingSearchParam({
        endOfSale: false,
        pageIndex: 1,
        pageSize: 1,
        productCode: '',
        productGenre: '',
        productName: ''
      });
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
      expect(
        service.getProductListingSearchParam({
          endOfSale: false,
          pageIndex: 1,
          pageSize: 1,
          productCode: '',
          productGenre: '',
          productName: ''
        })
      ).toBeNull();
    });
  });
});

function createProductListingSearchParams() {
  const expectedProductListingSearchParams: ProductListingSearchParams = {
    endOfSale: true,
    pageIndex: 1,
    pageSize: 1,
    productCode: 'productCode',
    productGenre: '1',
    productName: 'productName'
  };
  return expectedProductListingSearchParams;
}
