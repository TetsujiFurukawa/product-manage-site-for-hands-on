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

describe('HttpXsrfInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let tokenExtractor: { getToken: jasmine.Spy };

  beforeEach(() => {
    tokenExtractor = jasmine.createSpyObj('HttpXsrfTokenExtractor', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpXsrfInterceptor,
          multi: true
        },
        HttpXsrfTokenExtractor,
        { provide: HttpXsrfTokenExtractor, useValue: tokenExtractor }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  describe('#intercept', () => {
    const headerName = 'X-XSRF-TOKEN';
    const expectedToken = 'token';

    it('should intercept get method', () => {
      tokenExtractor.getToken.and.returnValue(expectedToken);
      httpClient.get('/test').subscribe(res => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.headers.get(headerName)).toEqual(expectedToken);
    });

    it('should intercept post method', () => {
      tokenExtractor.getToken.and.returnValue(expectedToken);
      httpClient.post('/test', null).subscribe(res => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'POST' });
      expect(req.request.headers.get(headerName)).toEqual(expectedToken);
    });
  });
});
