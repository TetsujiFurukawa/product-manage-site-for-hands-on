import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../const/api-const';
import { UrlConst } from '../const/url-const';
import { ProductPurchaseRequestDto } from '../entity/dto/request/product-purchase-request-dto';
import {
    ProductPurchaseHistorySearchListResponseDto
} from '../entity/dto/response/product-purchase-history-search-list-response-dto';
import {
    ProductPurchaseHistorySearchResponseDto
} from '../entity/dto/response/product-purchase-history-search-response-dto';
import { ProductPurchaseResponseDto } from '../entity/dto/response/product-purchase-response-dto';
import { ErrorMessagingService } from './common/error-messaging.service';
import { SuccessMessagingService } from './common/success-messaging.service';
import { ProductPurchaseService } from './product-purchase.service';

describe('ProductPurchaseService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductPurchaseService;
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
        ProductPurchaseService,
        { provide: SuccessMessagingService, useValue: successMessagingServiceSpy },
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductPurchaseService);
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

  describe('#getProductPurchaseHistoryList', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;

    it('should return expected response', () => {
      const productPurchaseResponseDto: ProductPurchaseHistorySearchResponseDto = new ProductPurchaseHistorySearchResponseDto();
      productPurchaseResponseDto.no = 1;
      productPurchaseResponseDto.productCode = 'productCode';
      productPurchaseResponseDto.productImageUrl = 'productImageUrl';
      productPurchaseResponseDto.productName = 'productName';
      productPurchaseResponseDto.productPurchaseAmount = 1;
      productPurchaseResponseDto.productPurchaseDate = new Date();
      productPurchaseResponseDto.productPurchaseName = 'productPurchaseName';
      productPurchaseResponseDto.productPurchaseQuantity = 1;
      productPurchaseResponseDto.productPurchaseUnitPrice = 1;

      const expectedResponseDto: ProductPurchaseHistorySearchListResponseDto = new ProductPurchaseHistorySearchListResponseDto();
      expectedResponseDto.productPurchaseHistorySearchResponseDtos = Array(productPurchaseResponseDto);
      expectedResponseDto.pageIndex = 1;
      expectedResponseDto.resultsLength = 1;

      service.getProductPurchaseHistoryList(new HttpParams()).subscribe(responseDto => {
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

    it('should return null 500 Internal Server Error', () => {
      const msg = '500 Internal Server Error';
      service.getProductPurchaseHistoryList(new HttpParams()).subscribe(responseDto => {
        expect(responseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(
          1,
          'setupPageErrorMessageFromResponse'
        );
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'clearMessageProperty');

      // Respond with the mock
      req.flush(msg, { status: 500, statusText: '500 Internal Server Error' });
    });
  });

  describe('#getProductPurchase', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;

    it('should return expected response', () => {
      const expectedResponseDto: ProductPurchaseResponseDto = new ProductPurchaseResponseDto();
      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productPurchaseUnitPrice = 1;
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 1;

      service.getProductPurchase('productCode').subscribe(responseDto => {
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
      service.getProductPurchase('productCode').subscribe(responseDto => {
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

  describe('#createProductPurchase', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;

    it('should return expected response', () => {
      const expectedResponseDto: ProductPurchaseResponseDto = new ProductPurchaseResponseDto();

      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productPurchaseUnitPrice = 1;
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 1;

      service.createProductPurchase(new ProductPurchaseRequestDto()).subscribe(responseDto => {
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
      service.createProductPurchase(new ProductPurchaseRequestDto()).subscribe(responseDto => {
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
});
