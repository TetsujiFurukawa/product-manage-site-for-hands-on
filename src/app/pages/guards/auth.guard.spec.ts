import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService } from '../../core/services/routing.service';
import { UrlConst } from '../constants/url-const';
import { MenuListResponseDto } from '../models/dtos/responses/menu-list-response-dto';
import { AccountService } from '../services/account.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routingService: RoutingService;
  let accountServiceSpy: { getMenu: jasmine.Spy };
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu']);
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
      accountServiceSpy.getMenu.and.returnValue(of(null));
      spyOn(routingService, 'navigate');
      authGuard.canActivate(null, null).subscribe(res => {
        expect(routingService.navigate).toHaveBeenCalledWith(UrlConst.PATH_SIGN_IN);
      });
    });
    it('Can activate', () => {
      const menuListResponseDto = new MenuListResponseDto();
      menuListResponseDto.menuCode = 'goodMenu';
      menuListResponseDto.subMenuCodeList = Array(UrlConst.PATH_PRODUCT_LISTING);
      mockSnapshot.url = '/' + UrlConst.PATH_PRODUCT_LISTING;

      accountServiceSpy.getMenu.and.returnValue(of(Array(menuListResponseDto)));
      authGuard.canActivate(null, mockSnapshot).subscribe(res => {
        expect(res).toBeTruthy();
      });
    });
    it('Can not activate', () => {
      const menuListResponseDto = new MenuListResponseDto();
      menuListResponseDto.menuCode = 'badMenu';
      menuListResponseDto.subMenuCodeList = Array(UrlConst.PATH_DUMMY_PURCHASING);
      mockSnapshot.url = '/' + UrlConst.PATH_PRODUCT_LISTING;

      accountServiceSpy.getMenu.and.returnValue(of(Array(menuListResponseDto)));
      spyOn(routingService, 'navigate');
      authGuard.canActivate(null, mockSnapshot).subscribe(res => {
        expect(routingService.navigate).toHaveBeenCalledWith(UrlConst.PATH_SIGN_IN);
      });
    });
  });
});
