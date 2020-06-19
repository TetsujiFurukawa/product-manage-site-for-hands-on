import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ApiConst } from '../constants/api-const';
import { Product } from '../models/interfaces/product';
import {
    ProductSearchListResponse
} from '../models/interfaces/responses/product-search-list-response';
import { ProductSearchResponse } from '../models/interfaces/responses/product-search-response';
import { ProductService } from './product.service';

describe('ProductService', () => {
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
      const productSearchResponse: ProductSearchResponse = new ProductSearchResponse();
      productSearchResponse.endOfSale = false;
      productSearchResponse.no = 1;
      productSearchResponse.productCode = 'productCode';
      productSearchResponse.productColor = 'productColor';
      productSearchResponse.productGenre = '1';
      productSearchResponse.productImageUrl = 'productImageUrl';
      productSearchResponse.productName = 'productName';
      productSearchResponse.productSizeStandard = 'productSizeStandard';
      productSearchResponse.productStockQuantity = 1;
      productSearchResponse.productUnitPrice = 1;

      const expectedResponse: ProductSearchListResponse = new ProductSearchListResponse();
      expectedResponse.productSearchResponses = Array(productSearchResponse);
      expectedResponse.pageIndex = 1;
      expectedResponse.resultsLength = 1;

      service.getProductList(new HttpParams()).subscribe((response) => {
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

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProductList(new HttpParams()).subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#getProductPurchase', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponse: Product = createProduct();

      service.getProduct('productCode').subscribe((response) => {
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
      service.getProduct('productCode').subscribe((response) => {
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

  describe('#createProduct', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponse: Product = createProduct();

      service.createProduct(new Product()).subscribe((response) => {
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
      service.createProduct(new Product()).subscribe((response) => {
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

  describe('#updateProduct', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;

    it('should return expected response', () => {
      const expectedResponse: Product = createProduct();

      service.updateProduct(new Product()).subscribe((response) => {
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
      service.updateProduct(new Product()).subscribe((response) => {
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

  describe('#getGenres', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_GENRE;

    it('should return expected response', () => {
      const expectedResponse: string[] = Array('1', '2', '3');

      service.getGenres().subscribe((response) => {
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

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getGenres().subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});

function createProduct() {
  const expectedResponse: Product = new Product();
  expectedResponse.endOfSale = false;
  expectedResponse.endOfSaleDate = new Date();
  expectedResponse.productCode = 'productCode';
  expectedResponse.productColor = 'productColor';
  expectedResponse.productGenre = '1';
  expectedResponse.productImage = 'productImage';
  expectedResponse.productName = 'productName';
  expectedResponse.productSeq = 1;
  expectedResponse.productSizeStandard = 'productSizeStandard';
  expectedResponse.productUnitPrice = 1;
  expectedResponse.updateDate = new Date();
  return expectedResponse;
}
