import { UrlConst } from 'e2e/src/url-const';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { ApiConst } from '../constants/api-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { MenuListResponseDto } from '../models/dtos/responses/menu-list-response-dto';
import { SignInResponseDto } from '../models/dtos/responses/sign-in-response-dto';
import { User } from '../models/user';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AccountService;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'setupPageErrorMessageFromResponse'
    ]);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AccountService, { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
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

  describe('#signIn', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;

    it('should return expected response', () => {
      const expectedSignInResponseDto: SignInResponseDto = new SignInResponseDto();
      expectedSignInResponseDto.userAccount = 'userAccount';
      expectedSignInResponseDto.userName = 'userName';
      expectedSignInResponseDto.userLocale = 'ja-JP';
      expectedSignInResponseDto.userLanguage = 'ja';
      expectedSignInResponseDto.userTimezone = 'UTC';
      expectedSignInResponseDto.userCurrency = 'JPY';

      service.signIn(new SignInRequestDto()).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toEqual(expectedSignInResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(expectedSignInResponseDto);
    });

    it('should return null 401 Unauthorized', () => {
      const msg = '401 Unauthorized';
      service.signIn(new SignInRequestDto()).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(msg, { status: 401, statusText: '401 Unauthorized' });
    });
  });

  describe('#getMenu', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_MENU;

    it('should return expected response', () => {
      const subMenuCodeList = new Array('subMenu1', 'subMenu2', 'subMenu3');
      const menuListResponseDto: MenuListResponseDto = new MenuListResponseDto();
      menuListResponseDto.menuCode = 'menu1';
      menuListResponseDto.subMenuCodeList = subMenuCodeList;
      const expectedMenuListResponseDto = Array(menuListResponseDto);

      service.getMenu().subscribe((response) => {
        expect(response).toEqual(expectedMenuListResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(expectedMenuListResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getMenu().subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(msg, { status: 401, statusText: '404 Not Found' });
    });
  });

  describe('#getAvailablePages', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_AVAILABLE_PAGES;

    it('should return expected response', () => {
      const expectedResponse = Array(UrlConst.PATH_PRODUCT_LISTING, UrlConst.PATH_PRODUCT_REGISTERING);

      service.getAvailablePages().subscribe((response) => {
        expect(response).toEqual(expectedResponse);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(expectedResponse);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getAvailablePages().subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock
      req.flush(msg, { status: 401, statusText: '404 Not Found' });
    });
  });

  describe('#signOut', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_OUT;

    it('should return expected response', () => {
      const user: User = new User();
      service.setUser(user);

      service.signOut().subscribe((response) => {
        expect(service.getUser()).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      });

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock
      req.flush(null);
    });
  });

  describe('#getUser', () => {
    it('should return expected data', () => {
      const user: User = createUser();

      service.setUser(user);
      expect(service.getUser().userAccount).toEqual(user.userAccount);
      expect(service.getUser().userCurrency).toEqual(user.userCurrency);
      expect(service.getUser().userLanguage).toEqual(user.userLanguage);
      expect(service.getUser().userLocale).toEqual(user.userLocale);
      expect(service.getUser().userName).toEqual(user.userName);
      expect(service.getUser().userTimezone).toEqual(user.userTimezone);
    });
  });

  describe('#removeUser', () => {
    it('should remove user', () => {
      const user: User = createUser();

      service.setUser(user);
      expectUser(service, user);

      service.removeUser();
      expect(service.getUser()).toBeNull();
    });
  });
});

function createUser() {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'js-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';
  return user;
}

function expectUser(accountService: AccountService, user: User) {
  expect(accountService.getUser().userAccount).toEqual(user.userAccount);
  expect(accountService.getUser().userCurrency).toEqual(user.userCurrency);
  expect(accountService.getUser().userLanguage).toEqual(user.userLanguage);
  expect(accountService.getUser().userLocale).toEqual(user.userLocale);
  expect(accountService.getUser().userName).toEqual(user.userName);
  expect(accountService.getUser().userTimezone).toEqual(user.userTimezone);
}
