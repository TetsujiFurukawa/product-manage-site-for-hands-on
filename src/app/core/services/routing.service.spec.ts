import { UrlConst } from 'src/app/pages/constants/url-const';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let router: Router;
  let service: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    });
    service = TestBed.get(RoutingService);
    router = TestBed.get(Router);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#navigate', () => {
    it('should be navigated', () => {
      spyOn(router, 'navigate');
      service.navigate(UrlConst.PATH_SIGN_IN);
      expect(router.navigate).toHaveBeenCalledWith(['/' + UrlConst.PATH_SIGN_IN]);
    });
  });
});
