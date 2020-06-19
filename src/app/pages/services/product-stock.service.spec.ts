import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ApiConst } from '../constants/api-const';
import { ProductStockResponse } from '../models/interfaces/responses/product-stock-response';
import { ProductStockService } from './product-stock.service';

describe('ProductStockService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductStockService;
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
        ProductStockService,
        { provide: SuccessMessagingService, useValue: successMessagingServiceSpy },
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductStockService);
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

  describe('#getProductStock', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;

    it('should return expected response', () => {
      const expectedResponse: ProductStockResponse = {
        productCode: 'productCode',
        productColor: 'productColor',
        productGenre: '1',
        productImage: 'productImage',
        productName: 'productName',
        productSizeStandard: 'productSizeStandard',
        productStockQuantity: 1
      };

      service.getProductStock('productCode').subscribe((response) => {
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
      service.getProductStock('productCode').subscribe((response) => {
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

  describe('#updateProductStock', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;

    it('should return expected response', () => {
      const expectedResponse: ProductStockResponse = {
        productCode: 'productCode',
        productColor: 'productColor',
        productGenre: '1',
        productImage: 'productImage',
        productName: 'productName',
        productSizeStandard: 'productSizeStandard',
        productStockQuantity: 1
      };
      service
        .updateProductStock({ productCode: '', productStockQuantity: 0, addProductStockQuantity: 0 })
        .subscribe((response) => {
          expect(response).toEqual(expectedResponse);
          expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(1);
          expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
        }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedResponse);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service
        .updateProductStock({ productCode: '', productStockQuantity: 0, addProductStockQuantity: 0 })
        .subscribe((response) => {
          expect(response).toBeNull();
          expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(0);
          expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
        }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});
