import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../const/api-const';
import { UrlConst } from '../const/url-const';
import { SignInRequestDto } from '../entity/dto/request/sign-in-request-dto';
import { MenuListResponseDto } from '../entity/dto/response/menu-list-response-dto';
import { SignInResponseDto } from '../entity/dto/response/sign-in-response-dto';
import { User } from '../entity/user';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    accountService = TestBed.get(AccountService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(accountService).toBeTruthy();
    });
  });

  describe('#signIn', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_IN;

    it('should return expected response (called once)', () => {
      const expectedSignInResponseDto: SignInResponseDto = new SignInResponseDto();
      expectedSignInResponseDto.userAccount = 'userAccount';
      expectedSignInResponseDto.userName = 'userName';
      expectedSignInResponseDto.userLocale = 'ja-JP';
      expectedSignInResponseDto.userLanguage = 'ja';
      expectedSignInResponseDto.userTimezone = 'UTC';
      expectedSignInResponseDto.userCurrency = 'JPY';

      accountService
        .signIn(new SignInRequestDto())
        .subscribe(
          signInResponseDto =>
            expect(signInResponseDto).toEqual(expectedSignInResponseDto, 'should return expected response'),
          fail
        );

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(expectedSignInResponseDto);
    });

    it('should return 401 Unauthorized', () => {
      const msg = '401 Unauthorized';
      accountService
        .signIn(new SignInRequestDto())
        .subscribe(signInResponseDto => expect(signInResponseDto).toBeNull(), fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(msg, { status: 401, statusText: '401 Unauthorized' });
    });
  });

  describe('#getMenu', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_MENU;

    it('should return expected response (called once)', () => {
      const subMenuCodeList = new Array('subMenu1', 'subMenu2', 'subMenu3');
      const menuListResponseDto: MenuListResponseDto = new MenuListResponseDto();
      menuListResponseDto.menuCode = 'menu1';
      menuListResponseDto.subMenuCodeList = subMenuCodeList;
      const expectedMenuListResponseDto = Array(menuListResponseDto);

      accountService
        .getMenu()
        .subscribe(
          response => expect(response).toEqual(expectedMenuListResponseDto, 'should return expected response'),
          fail
        );

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(expectedMenuListResponseDto);
    });

    it('should return 404 Not Found', () => {
      const msg = '404 Not Found';
      accountService.getMenu().subscribe(response => expect(response).toBeNull(), fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(msg, { status: 401, statusText: '404 Not Found' });
    });
  });

  describe('#signOut', () => {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_OUT;

    it('should return expected response (called once)', () => {
      const user: User = new User();
      accountService.setUser(user);

      accountService.signOut().subscribe(response => {
        expect(accountService.getUser()).toBeNull();
      });

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(null);
    });
  });
});
