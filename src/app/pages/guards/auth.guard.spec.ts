import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService } from '../../core/services/routing.service';
import { UrlConst } from '../constants/url-const';
import { AccountService } from '../services/account.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routingService: RoutingService;
  let accountServiceSpy: { getAvailablePages: jasmine.Spy };
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getAvailablePages']);
    mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }]
    });
    routingService = TestBed.inject(RoutingService);
    authGuard = TestBed.inject(AuthGuard);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(authGuard).toBeTruthy();
    });
  });

  describe('#canActivate', () => {
    it('No menu', () => {
      accountServiceSpy.getAvailablePages.and.returnValue(of(null));
      spyOn(routingService, 'navigate');
      authGuard.canActivate(null, null).subscribe((res) => {
        expect(routingService.navigate).toHaveBeenCalledWith(UrlConst.PATH_SIGN_IN);
      });
    });
    it('Can activate', () => {
      mockSnapshot.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING;
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_PRODUCT_LISTING)));
      authGuard.canActivate(null, mockSnapshot).subscribe((res) => {
        expect(res).toBeTruthy();
      });
    });
    it('Can activate /:productCode', () => {
      mockSnapshot.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING + UrlConst.SLASH + ':productCode';
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_PRODUCT_REGISTERING)));
      authGuard.canActivate(null, mockSnapshot).subscribe((res) => {
        expect(res).toBeTruthy();
      });
    });
    it('Can not activate', () => {
      mockSnapshot.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING;
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_DUMMY_PURCHASING)));
      spyOn(routingService, 'navigate');
      authGuard.canActivate(null, mockSnapshot).subscribe((res) => {
        expect(routingService.navigate).toHaveBeenCalledWith(UrlConst.PATH_SIGN_IN);
      });
    });
  });
});
