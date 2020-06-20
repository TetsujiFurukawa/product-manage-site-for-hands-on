import { UrlConst } from 'e2e/src/url-const';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { ApiConst } from '../constants/api-const';
import { MenuListResponseDto } from '../models/interfaces/responses/menu-list-response';
import { SignInResponseDto } from '../models/interfaces/responses/sign-in-response';
import { User } from '../models/user';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  let errorMessagingServiceSpy: { setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', ['setupPageErrorMessageFromResponse']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService, { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
      const expectedSignInResponseDto: SignInResponseDto = createExpectedSignInResponseDto();

      // Subscribes to api.
      service.signIn({ Username: '', Password: '' }).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toEqual(expectedSignInResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      // Responds with the mock.
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedSignInResponseDto);
    });

    it('should return null when response is 401 Unauthorized error', () => {
      const errorStatus = 401;
      const errorMessage = '401 Unauthorized';

      // Subscribes to api.
      service.signIn({ Username: '', Password: '' }).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(errorMessage, { status: errorStatus, statusText: errorMessage });
    });
  });

  describe('#getMenu', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_MENU;

    it('should return expected response', () => {
      const expectedMenuListResponseDto = createExpectedMenuListResponseDto();

      // Subscribes to api.
      service.getMenu().subscribe((response) => {
        expect(response).toEqual(expectedMenuListResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMenuListResponseDto);
    });

    it('should return null when response is 404 Not Found', () => {
      const errorStatus = 404;
      const errorMessage = '404 Not Found';

      // Subscribes to api.
      service.getMenu().subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(errorMessage, { status: errorStatus, statusText: errorMessage });
    });
  });

  describe('#getAvailablePages', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_AVAILABLE_PAGES;

    it('should return expected response', () => {
      const expectedResponse = Array(UrlConst.PATH_PRODUCT_LISTING, UrlConst.PATH_PRODUCT_REGISTERING);

      // Subscribes to api.
      service.getAvailablePages().subscribe((response) => {
        expect(response).toEqual(expectedResponse);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedResponse);
    });

    it('should return null when response is 404 Not Found', () => {
      const errorStatus = 404;
      const errorMessage = '404 Not Found';

      // Subscribes to api.
      service.getAvailablePages().subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(errorMessage, { status: errorStatus, statusText: errorMessage });
    });
  });

  describe('#signOut', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_OUT;

    it('should return expected response', () => {
      const user: User = new User();
      service.setUser(user);

      // Subscribes to api.
      service.signOut().subscribe((response) => {
        expect(service.getUser()).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      });

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    });
  });

  describe('#getUser,#setUser', () => {
    it('should return expected data', () => {
      const user: User = createExpectedUser();
      service.setUser(user);
      expectUser(service, service.getUser());
    });
  });

  describe('#removeUser', () => {
    it('should remove user', () => {
      const user: User = createExpectedUser();
      service.setUser(user);
      expectUser(service, service.getUser());

      service.removeUser();
      expect(service.getUser()).toBeNull();
    });
  });
});

function createExpectedSignInResponseDto() {
  return {
    userAccount: 'userAccount',
    userName: 'userName',
    userLocale: 'ja-JP',
    userLanguage: 'ja',
    userTimezone: 'UTC',
    userTimezoneOffset: '0000',
    userCurrency: 'JPY'
  };
}

function createExpectedMenuListResponseDto() {
  const codeList = new Array('subMenu1', 'subMenu2', 'subMenu3');
  const menuListResponseDto: MenuListResponseDto = {
    menuCode: 'menu1',
    subMenuCodeList: codeList
  };
  const expectedMenuListResponseDto = Array(menuListResponseDto);
  return expectedMenuListResponseDto;
}

function createExpectedUser() {
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
