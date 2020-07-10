import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UrlConst } from '../constants/url-const';
import { AccountService } from '../services/account.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let accountServiceSpy: { getAvailablePages: jasmine.Spy };
  let routerStateSnapshotSpy: RouterStateSnapshot;
  let router: Router;

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getAvailablePages']);
    routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AccountService, useValue: accountServiceSpy }]
    });
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(authGuard).toBeTruthy();
    });
  });

  describe('#canActivate', () => {
    it('No menu', () => {
      accountServiceSpy.getAvailablePages.and.returnValue(of(null));
      spyOn(router, 'navigate');
      authGuard.canActivate(null, null).subscribe((res) => {
        expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_SIGN_IN]);
      });
    });
    it('Can activate', () => {
      routerStateSnapshotSpy.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING;
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_PRODUCT_LISTING)));
      authGuard.canActivate(null, routerStateSnapshotSpy).subscribe((res) => {
        expect(res).toBeTruthy();
      });
    });
    it('Can activate /:productCode', () => {
      routerStateSnapshotSpy.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING + UrlConst.SLASH + ':productCode';
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_PRODUCT_REGISTERING)));
      authGuard.canActivate(null, routerStateSnapshotSpy).subscribe((res) => {
        expect(res).toBeTruthy();
      });
    });
    it('Can not activate', () => {
      routerStateSnapshotSpy.url = UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING;
      accountServiceSpy.getAvailablePages.and.returnValue(of(Array(UrlConst.PATH_DUMMY_PURCHASING)));
      spyOn(router, 'navigate');
      authGuard.canActivate(null, routerStateSnapshotSpy).subscribe((res) => {
        expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_SIGN_IN]);
      });
    });
  });
});
