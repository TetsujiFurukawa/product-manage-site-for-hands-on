import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ApiConst } from '../constants/api-const';
import { ProductDto } from '../models/dtos/product-dto';
import {
    ProductSearchListResponseDto
} from '../models/dtos/responses/product-search-list-response-dto';
import { ProductSearchResponseDto } from '../models/dtos/responses/product-search-response-dto';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductService;
  let successMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setMessageProperty: jasmine.Spy };
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    successMessagingServiceSpy = jasmine.createSpyObj('SuccessMessagingService', [
      'clearMessageProperty',
      'setMessageProperty'
    ]);
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'setupPageErrorMessageFromResponse'
    ]);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: SuccessMessagingService, useValue: successMessagingServiceSpy },
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#getProductList', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT_SEARCH;

    it('should return expected response', () => {
      const productSearchResponseDto: ProductSearchResponseDto = new ProductSearchResponseDto();
      productSearchResponseDto.endOfSale = false;
      productSearchResponseDto.no = 1;
      productSearchResponseDto.productCode = 'productCode';
      productSearchResponseDto.productColor = 'productColor';
      productSearchResponseDto.productGenre = '1';
      productSearchResponseDto.productImageUrl = 'productImageUrl';
      productSearchResponseDto.productName = 'productName';
      productSearchResponseDto.productSizeStandard = 'productSizeStandard';
      productSearchResponseDto.productStockQuantity = 1;
      productSearchResponseDto.productUnitPrice = 1;

      const expectedResponseDto: ProductSearchListResponseDto = new ProductSearchListResponseDto();
      expectedResponseDto.productSearchResponseDtos = Array(productSearchResponseDto);
      expectedResponseDto.pageIndex = 1;
      expectedResponseDto.resultsLength = 1;

      service.getProductList(new HttpParams()).subscribe(responseDto => {
        expect(responseDto).toEqual(expectedResponseDto, 'should return expected response');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          0,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(expectedResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProductList(new HttpParams()).subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'one call');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#getProductPurchase', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponseDto: ProductDto = createProductDto();

      service.getProduct('productCode').subscribe(responseDto => {
        expect(responseDto).toEqual(expectedResponseDto, 'should return expected response');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          0,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl + '?productCode=productCode');
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(expectedResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProduct('productCode').subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl + '?productCode=productCode');
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'one call');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#createProduct', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponseDto: ProductDto = createProductDto();

      service.createProduct(new ProductDto()).subscribe(responseDto => {
        expect(responseDto).toEqual(expectedResponseDto, 'should return expected response');
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(1, 'setMessageProperty');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          0,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(expectedResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.createProduct(new ProductDto()).subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(0, 'setMessageProperty');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#updateProduct', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponseDto: ProductDto = createProductDto();

      service.updateProduct(new ProductDto()).subscribe(responseDto => {
        expect(responseDto).toEqual(expectedResponseDto, 'should return expected response');
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(1, 'setMessageProperty');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          0,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(expectedResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.updateProduct(new ProductDto()).subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(0, 'setMessageProperty');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#getGenres', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_GENRE;

    it('should return expected response', () => {
      const expectedResponseDto: string[] = Array('1', '2', '3');

      service.getGenres().subscribe(responseDto => {
        expect(responseDto).toEqual(expectedResponseDto, 'should return expected response');
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          0,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(expectedResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getGenres().subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'one call');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});

function createProductDto() {
  const expectedResponseDto: ProductDto = new ProductDto();
  expectedResponseDto.endOfSale = false;
  expectedResponseDto.endOfSaleDate = new Date();
  expectedResponseDto.productCode = 'productCode';
  expectedResponseDto.productColor = 'productColor';
  expectedResponseDto.productGenre = '1';
  expectedResponseDto.productImage = 'productImage';
  expectedResponseDto.productName = 'productName';
  expectedResponseDto.productSeq = 1;
  expectedResponseDto.productSizeStandard = 'productSizeStandard';
  expectedResponseDto.productUnitPrice = 1;
  expectedResponseDto.updateDate = new Date();
  return expectedResponseDto;
}
