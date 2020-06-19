import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ApiConst } from '../constants/api-const';
import {
    ProductPurchaseHistorySearchListResponse
} from '../models/interfaces/responses/product-purchase-history-search-list-response';
import {
    ProductPurchaseHistorySearchResponse
} from '../models/interfaces/responses/product-purchase-history-search-response';
import { ProductPurchaseResponse } from '../models/interfaces/responses/product-purchase-response';
import { ProductPurchaseService } from './product-purchase.service';

describe('ProductPurchaseService', () => {
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
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductPurchaseService);
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
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;

    it('should return expected response', () => {
      const productPurchaseResponse: ProductPurchaseHistorySearchResponse = new ProductPurchaseHistorySearchResponse();
      productPurchaseResponse.no = 1;
      productPurchaseResponse.productCode = 'productCode';
      productPurchaseResponse.productImageUrl = 'productImageUrl';
      productPurchaseResponse.productName = 'productName';
      productPurchaseResponse.productPurchaseAmount = 1;
      productPurchaseResponse.productPurchaseDate = new Date();
      productPurchaseResponse.productPurchaseName = 'productPurchaseName';
      productPurchaseResponse.productPurchaseQuantity = 1;
      productPurchaseResponse.productPurchaseUnitPrice = 1;

      const expectedResponse: ProductPurchaseHistorySearchListResponse = new ProductPurchaseHistorySearchListResponse();
      expectedResponse.productPurchaseHistorySearchResponses = Array(productPurchaseResponse);
      expectedResponse.pageIndex = 1;
      expectedResponse.resultsLength = 1;

      service.getProductPurchaseHistoryList(new HttpParams()).subscribe((response) => {
        expect(response).toEqual(expectedResponse);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedResponse);
    });

    it('should return null 500 Internal Server Error', () => {
      const msg = '500 Internal Server Error';
      service.getProductPurchaseHistoryList(new HttpParams()).subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 500, statusText: '500 Internal Server Error' });
    });
  });

  describe('#getProductPurchase', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE;

    it('should return expected response', () => {
      const expectedResponse: ProductPurchaseResponse = new ProductPurchaseResponse();
      expectedResponse.productCode = 'productCode';
      expectedResponse.productColor = 'productColor';
      expectedResponse.productGenre = '1';
      expectedResponse.productImage = 'productImage';
      expectedResponse.productName = 'productName';
      expectedResponse.productPurchaseUnitPrice = 1;
      expectedResponse.productSizeStandard = 'productSizeStandard';
      expectedResponse.productStockQuantity = 1;

      service.getProductPurchase('productCode').subscribe((response) => {
        expect(response).toEqual(expectedResponse);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl + '?productCode=productCode');
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedResponse);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProductPurchase('productCode').subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl + '?productCode=productCode');
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#createProductPurchase', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE;

    it('should return expected response', () => {
      const expectedResponse: ProductPurchaseResponse = new ProductPurchaseResponse();

      expectedResponse.productCode = 'productCode';
      expectedResponse.productColor = 'productColor';
      expectedResponse.productGenre = '1';
      expectedResponse.productImage = 'productImage';
      expectedResponse.productName = 'productName';
      expectedResponse.productPurchaseUnitPrice = 1;
      expectedResponse.productSizeStandard = 'productSizeStandard';
      expectedResponse.productStockQuantity = 1;

      service
        .createProductPurchase({
          productCode: '',
          productPurchaseName: '',
          productStockQuantity: 0,
          productPurchaseQuantity: 0
        })
        .subscribe((response) => {
          expect(response).toEqual(expectedResponse);
          expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(1);
          expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
        }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedResponse);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service
        .createProductPurchase({
          productCode: '',
          productPurchaseName: '',
          productStockQuantity: 0,
          productPurchaseQuantity: 0
        })
        .subscribe((response) => {
          expect(response).toBeNull();
          expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(0);
          expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
        }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});
