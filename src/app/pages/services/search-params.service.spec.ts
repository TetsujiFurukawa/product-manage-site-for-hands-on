import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from '../../core/services/session-strage.service';
import {
    ProductListingSearchParamsDto
} from '../models/dtos/requests/product-listing-search-params-dto';
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
      const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = createProductListingSearchParamsDto();

      service.setProductListingSearchParam(expectedProductListingSearchParamsDto);
      const res: ProductListingSearchParamsDto = service.getProductListingSearchParam({
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

  describe('#removeProductListingSearchParam', () => {
    it('should remove value', () => {
      const expectedProductListingSearchParamsDto: ProductListingSearchParamsDto = createProductListingSearchParamsDto();
      service.setProductListingSearchParam(expectedProductListingSearchParamsDto);
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
