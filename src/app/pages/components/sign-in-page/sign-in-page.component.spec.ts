import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { User } from 'src/app/pages/models/user';
import { AccountService } from 'src/app/pages/services/account.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInRequestDto } from '../../models/interfaces/requests/sign-in-request';
import { SignInResponseDto } from '../../models/interfaces/responses/sign-in-response';
import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';

  const expectedRequest: SignInRequestDto = { Password: 'Password', Username: 'Username' };

  const expectedResponse = {
    userAccount: 'userAccount',
    userCurrency: 'JPY',
    userLanguage: 'ja',
    userLocale: 'ja-JP',
    userName: 'userName',
    userTimezone: ''
  };

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
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy }
      ],
      declarations: [SignInPageComponent]
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    setupNavigatorLanguage('ja');
  });

  describe('#constractor', () => {
    it('should create when navigator.langage returns ja', () => {
      expect(component).toBeTruthy();
    });
    it('should create when navigator.langage returns ja-JP', () => {
      setupNavigatorLanguage('ja-jp');
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
      accountServiceSpy.signIn.and.returnValue(of(expectedResponse));
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
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('.sign-in-title-wrapper'))
        .nativeElement;
      expect(htmlInputElement.innerText).toContain('EXAPMLE SITE');
    });

    it('signin user account', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#signin-user-account'))
        .nativeElement;
      expect(htmlInputElement.placeholder).toContain('ユーザアカウント');
    });
    it('signin user password', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#signin-user-password'))
        .nativeElement;
      expect(htmlInputElement.placeholder).toContain('パスワード');
    });
    it('saveBtn', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#sign-in-button')).nativeElement;
      expect(htmlInputElement.innerText).toContain('サインイン');
    });
  });

  describe('DOM input test', () => {
    it('signin user account', () => {
      const expectedValue = expectedResponse.userAccount;
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', expectedValue);
      expect(component.signInUserAccount.value).toEqual(expectedValue);
    });
    it('signin user password', () => {
      const expectedValue = 'productName';
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-password', expectedValue);
      expect(component.signInUserPassword.value).toEqual(expectedValue);
    });
  });

  describe('DOM input validation test', () => {
    it('signin user account', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', '');
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('signin user password', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-password', '');
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
  });

  describe('DOM input test', () => {
    it('Should Enter input and create request', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', expectedRequest.Username);
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-password', expectedRequest.Password);

      const targetMethodName = 'createSignInRequestDto';
      const signInRequestDto: SignInRequestDto = component[targetMethodName]();

      expect(signInRequestDto.Username).toEqual(expectedRequest.Username);
      expect(signInRequestDto.Password).toEqual(expectedRequest.Password);
    });
  });
});

function setupNavigatorLanguage(language: string) {
  const defineGetter = '__defineGetter__';
  window.navigator[defineGetter]('language', () => {
    return language;
  });
}
