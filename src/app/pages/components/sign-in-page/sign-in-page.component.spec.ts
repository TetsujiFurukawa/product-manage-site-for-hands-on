import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { SignInRequestDto } from 'src/app/pages/models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/pages/models/dtos/responses/sign-in-response-dto';
import { User } from 'src/app/pages/models/user';
import { AccountService } from 'src/app/pages/services/account.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';
import { MaterialModule } from 'src/app/utils/material/material.module';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';

  const expectedRequestDto = new SignInRequestDto();
  expectedRequestDto.Password = 'Password';
  expectedRequestDto.Username = 'Username';

  const expectedResponseDto = new SignInResponseDto();
  expectedResponseDto.userAccount = 'userAccount';
  expectedResponseDto.userCurrency = 'JPY';
  expectedResponseDto.userLanguage = 'ja';
  expectedResponseDto.userLocale = 'ja-JP';
  expectedResponseDto.userName = 'userName';
  expectedResponseDto.userTimezone = '';
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let accountServiceSpy: { signIn: jasmine.Spy; setUser: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['signIn', 'setUser']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [FormBuilder, { provide: AccountService, useValue: accountServiceSpy }, { provide: TitleI18Service, useValue: titleI18ServiceSpy }],
      declarations: [SignInPageComponent]
    }).compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    setNavigatorLanguage('ja');
  });

  describe('#constractor', () => {
    it('should create when navigator.langage returns ja', () => {
      expect(component).toBeTruthy();
    });
    it('should create when navigator.langage returns ja-JP', () => {
      setNavigatorLanguage('ja-jp');
      expect(component).toBeTruthy();
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#singnIn', () => {
    it('should not sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(null));
      component.clickSignInButton();
      expect(accountServiceSpy.setUser.calls.count()).toEqual(0);
    });

    it('should sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(expectedResponseDto));
      spyOn(router, 'navigate');

      component.clickSignInButton();

      expect(accountServiceSpy.setUser.calls.count()).toEqual(1);
      expect(router.navigate).toHaveBeenCalledWith(['/' + UrlConst.PATH_PRODUCT_LISTING]);
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('.sign-in-title');
      expect(htmlInputElement.innerText).toContain('EXAPMLE SITE');
    });

    it('signin user account', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#signin-user-account');
      expect(htmlInputElement.placeholder).toContain('ユーザアカウント');
    });
    it('signin user password', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#signin-user-password');
      expect(htmlInputElement.placeholder).toContain('パスワード');
    });
    it('saveBtn', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#sign-in-button');
      expect(htmlInputElement.innerText).toContain('サインイン');
    });
  });

  describe('DOM input test', () => {
    it('signin user account', () => {
      const expectedValue = expectedResponseDto.userAccount;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', expectedValue);
      expect(component.signInUserAccount.value).toEqual(expectedValue);
    });
    it('signin user password', () => {
      const expectedValue = 'productName';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', expectedValue);
      expect(component.signInUserPassword.value).toEqual(expectedValue);
    });
  });

  describe('DOM input validation test', () => {
    it('signin user account', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', '');
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('signin user password', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', '');
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
  });

  describe('DOM input test', () => {
    it('Should Enter input and create request dto', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', expectedRequestDto.Username);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', expectedRequestDto.Password);

      // tslint:disable-next-line: no-string-literal
      const signInRequestDto: SignInRequestDto = component['createSignInRequestDto']();

      expect(signInRequestDto.Username).toEqual(expectedRequestDto.Username);
      expect(signInRequestDto.Password).toEqual(expectedRequestDto.Password);
    });
  });
});

function setNavigatorLanguage(language: string) {
  // tslint:disable-next-line: no-string-literal
  window.navigator['__defineGetter__'](
    'language',
    // tslint:disable-next-line: only-arrow-functions
    function() {
      return language;
    }
  );
}
