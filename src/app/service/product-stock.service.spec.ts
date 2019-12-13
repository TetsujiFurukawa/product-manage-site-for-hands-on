import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../const/api-const';
import { UrlConst } from '../const/url-const';
import { ProductStockRequestDto } from '../entity/dto/request/product-stock-request-dto';
import { ProductStockResponseDto } from '../entity/dto/response/product-stock-response-dto';
import { ErrorMessagingService } from './common/error-messaging.service';
import { SuccessMessagingService } from './common/success-messaging.service';
import { ProductStockService } from './product-stock.service';

describe('ProductStockService', () => {
  let httpClient: HttpClient;
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
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductStockService);
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
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_STOCK;

    it('should return expected response', () => {
      const expectedResponseDto: ProductStockResponseDto = new ProductStockResponseDto();
      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 1;

      service.getProductStock('productCode').subscribe(responseDto => {
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
      service.getProductStock('productCode').subscribe(responseDto => {
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

  describe('#updateProductStock', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_STOCK;

    it('should return expected response', () => {
      const expectedResponseDto: ProductStockResponseDto = new ProductStockResponseDto();
      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 1;

      service.updateProductStock(new ProductStockRequestDto()).subscribe(responseDto => {
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
      service.updateProductStock(new ProductStockRequestDto()).subscribe(responseDto => {
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
});
