import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from '../../core/services/session-storage.service';
import {
    ProductListingSearchParamsDto
} from '../models/dtos/requests/product-listing-search-params-dto';
import { SearchParamsService } from './search-params.service';

describe('SearchParamsService', () => {
  let service: SearchParamsService;
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });
    service = TestBed.inject(SearchParamsService);
    sessionStorageService = TestBed.inject(SessionStorageService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setProductListingSearchParams,#getProductListingSearchParams', () => {
    it('should set value', () => {
      const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = createProductListingSearchParamsDto();

      service.setProductListingSearchParams(expectedProductListingSearchParamsDto);
      const res: ProductListingSearchParamsDto = service.getProductListingSearchParams({
        endOfSale: false,
        pageIndex: 1,
        pageSize: 1,
        productCode: '',
        productGenre: '',
        productName: ''
      });
      expect(res.endOfSale).toEqual(expectedProductListingSearchParamsDto.endOfSale);
      expect(res.pageIndex).toEqual(expectedProductListingSearchParamsDto.pageIndex);
      expect(res.pageSize).toEqual(expectedProductListingSearchParamsDto.pageSize);
      expect(res.productCode).toEqual(expectedProductListingSearchParamsDto.productCode);
      expect(res.productGenre).toEqual(expectedProductListingSearchParamsDto.productGenre);
      expect(res.productName).toEqual(expectedProductListingSearchParamsDto.productName);
    });
  });

  describe('#removeProductListingSearchParams', () => {
    it('should remove value', () => {
      const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = createProductListingSearchParamsDto();
      service.setProductListingSearchParams(expectedProductListingSearchParamsDto);
      service.removeProductListingSearchParams();
      expect(
        service.getProductListingSearchParams({
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

function createProductListingSearchParamsDto() {
  const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = {
    endOfSale: true,
    pageIndex: 1,
    pageSize: 1,
    productCode: 'productCode',
    productGenre: '1',
    productName: 'productName'
  };
  return expectedProductListingSearchParamsDto;
}
