import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from '../../core/services/session-storage.service';
import {
    ProductListingSearchParamsDto
} from '../models/dtos/requests/product-listing-search-params-dto';
import { SearchParamsService } from './search-params.service';

describe('SearchParamsService', () => {
  const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = createProductListingSearchParamsDto();

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

  describe('#setProductListingSearchParamsDto,#getProductListingSearchParamsDto', () => {
    it('should set value', () => {
      service.setProductListingSearchParamsDto(expectedProductListingSearchParamsDto);
      const res: ProductListingSearchParamsDto = service.getProductListingSearchParamsDto();
      expect(res).toEqual(expectedProductListingSearchParamsDto);
    });
  });

  describe('#removeProductListingSearchParamsDto', () => {
    it('should remove value', () => {
      service.setProductListingSearchParamsDto(expectedProductListingSearchParamsDto);
      service.removeProductListingSearchParamsDto();
      expect(service.getProductListingSearchParamsDto()).toBeNull();
    });
  });
});

function createProductListingSearchParamsDto() {
  const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = {
    productCode: 'productCode',
    productName: 'productName',
    productGenre: '1',
    endOfSale: true,
    pageIndex: 0,
    pageSize: 10
  };
  return expectedProductListingSearchParamsDto;
}
