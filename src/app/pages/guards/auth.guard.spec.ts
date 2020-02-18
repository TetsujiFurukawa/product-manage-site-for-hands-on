import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
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

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu']);
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
    it('should return expected response', () => {
      const menuListResponseDto = new MenuListResponseDto();
      accountServiceSpy.getMenu.and.returnValue(of(menuListResponseDto));
      authGuard.canActivate(null, null).subscribe(res => {
        expect(res).toBeTruthy();
      });
    });

    it('should return expected response', () => {
      accountServiceSpy.getMenu.and.returnValue(of(null));
      spyOn(routingService, 'navigate');
      authGuard.canActivate(null, null).subscribe(res => {
        expect(res).toBeFalsy();
        expect(routingService.navigate).toHaveBeenCalledWith(UrlConst.PATH_SIGN_IN);
      });
    });
  });
});
