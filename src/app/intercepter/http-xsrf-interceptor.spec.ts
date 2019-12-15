import {
    HTTP_INTERCEPTORS, HttpClient, HttpHeaders, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ApiConst } from '../const/api-const';
import { UrlConst } from '../const/url-const';
import { ProductDto } from '../entity/dto/product-dto';
import { User } from '../entity/user';
import { ProductService } from '../service/product.service';
import { HttpXsrfInterceptor } from './http-xsrf-interceptor';

// xdescribe('HttpXsrfInterceptor', () => {
//   it('should create an instance', () => {
//     expect(new HttpXsrfInterceptor()).toBeTruthy();
//   });
// });
describe('HttpXsrfInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  // let intercepter: HttpXsrfInterceptor;
  let productService: ProductService;
  let tokenExtractor: { getToken: jasmine.Spy };

  beforeEach(() => {
    tokenExtractor = jasmine.createSpyObj('HttpXsrfTokenExtractor', ['getToken']);

    TestBed.configureTestingModule({
      // schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpXsrfInterceptor,
          multi: true
        },
        HttpXsrfTokenExtractor,
        ProductService,
        { provide: HttpXsrfTokenExtractor, useValue: tokenExtractor }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    // intercepter = TestBed.get(HttpXsrfInterceptor);
    productService = TestBed.get(ProductService);
    // tokenExtractor = TestBed.get(HttpXsrfTokenExtractor);
    httpClient = TestBed.get(HttpClient);
  });

  // afterEach(() => {
  //   // After every test, assert that there are no more pending requests.
  //   httpTestingController.verify();
  // });

  // describe('#constractor', () => {
  //   it('should be created', () => {
  //     expect(intercepter).toBeTruthy();
  //   });
  // });

  describe('#intercept', () => {
    const headerName = 'X-XSRF-TOKEN';
    const expectedToken = 'token';

    it('should intercept get method', async(() => {
      tokenExtractor.getToken.and.returnValue(expectedToken);
      httpClient.get('/test').subscribe(res => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.headers.get(headerName)).toEqual(expectedToken);
      req.flush({});
    }));

    it('should intercept post method', async(() => {
      tokenExtractor.getToken.and.returnValue(expectedToken);
      httpClient.post('/test', null).subscribe(res => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'POST' });
      expect(req.request.headers.get(headerName)).toEqual(expectedToken);
      req.flush({});

      // httpClient.get('/test').subscribe(res => expect(res).toBeTruthy());
      // const req = httpTestingController.expectOne({ method: 'GET' });
      // expect(req.request.headers.get('X-XSRF-TOKEN')).toEqual('aaa');
      // req.flush({
      //   hello: 'world'
      // });
    }));
  });

  // describe('#intercept', () => {
  //   intercepter.intercept(new HttpRequest('HEAD', '/test'), null).subscribe();
  //   const req = backend.expectOne('/test');
  //   expect(req.request.headers.has('X-XSRF-TOKEN')).toEqual(false);
  //   req.flush({});

  //   const headerName = 'X-XSRF-TOKEN';

  //   it('should intercept post method', () => {
  //     const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PRODUCT;
  //     const productDto: ProductDto = new ProductDto();
  //     // spyOn(tokenExtractor, 'getToken').and.returnValue('token');
  //     productService.updateProduct(productDto).subscribe(response => {
  //       expect(response).toBeNull();
  //       const httpRequest = httpTestingController.expectOne(webApiUrl);
  //       expect(httpRequest.request.headers.has(headerName)).toEqual(true);
  //     });
  //   });
  // });
});
