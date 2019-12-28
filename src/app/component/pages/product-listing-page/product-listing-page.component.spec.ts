import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import {
    ProductListingSearchParams
} from 'src/app/entity/dto/request/product-listing-search-params';
import {
    ProductSearchListResponseDto
} from 'src/app/entity/dto/response/product-search-list-response-dto';
import { ProductSearchResponseDto } from 'src/app/entity/dto/response/product-search-response-dto';
import { User } from 'src/app/entity/user';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductService } from 'src/app/service/product.service';
import { MaterialModule } from 'src/app/utils/material/material.module';

import { CurrencyPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListingPageComponent } from './product-listing-page.component';

// xdescribe('ProductListingPageComponent', () => {
//   let component: ProductListingPageComponent;
//   let fixture: ComponentFixture<ProductListingPageComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ProductListingPageComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProductListingPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
describe('ProductListingPageComponent', () => {
  const expectedGenres = Array('1', '2', '3');
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';

  const expectedSearchParams = new ProductListingSearchParams();
  expectedSearchParams.endOfSale = true;
  expectedSearchParams.pageIndex = 1;
  expectedSearchParams.pageSize = 50;
  expectedSearchParams.productCode = 'productCode';
  expectedSearchParams.productGenre = 'productGenre';
  expectedSearchParams.productName = 'productName';

  // const conditions = {
  //   productName: expectedSearchParams.productName,
  //   productCode: expectedSearchParams.productCode,
  //   productGenre: expectedSearchParams.productGenre,
  //   endOfSale: expectedSearchParams.endOfSale,
  //   pageSize: expectedSearchParams.pageSize,
  //   pageIndex: expectedSearchParams.pageIndex
  // };
  // const paramsOptions = { fromObject: conditions } as any;
  // const expectedHttpSearchParams = new HttpParams(paramsOptions);

  const expectedProductSearchListResponseDto: ProductSearchListResponseDto = new ProductSearchListResponseDto();
  const productSearchResponseDto: ProductSearchResponseDto[] = [
    {
      no: 1,
      productName: 'productName',
      productCode: 'productCode',
      productGenre: '1',
      productImageUrl: 'productImageUrl',
      productSizeStandard: 'productSizeStandard',
      productColor: 'productColor',
      productUnitPrice: 123,
      productStockQuantity: 456,
      endOfSale: true
    }
  ];
  expectedProductSearchListResponseDto.productSearchResponseDtos = productSearchResponseDto;

  let component: ProductListingPageComponent;
  let fixture: ComponentFixture<ProductListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy; getProduct: jasmine.Spy; createProduct: jasmine.Spy; updateProduct: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let searchParamsServiceSpy: { getProductListingSearchParam: jasmine.spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres', 'getProduct', 'createProduct', 'updateProduct']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', ['getProductListingSearchParam']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxUpperCaseDirectiveModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        CurrencyToNumberPipe,
        CurrencyPipe,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy }
      ],
      declarations: [ProductListingPageComponent, CurrencyToNumberPipe]
    }).compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(user);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    fixture = TestBed.createComponent(ProductListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should not init search criteria', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(null);
    });
    it('should init search criteria', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(expectedSearchParams);

      expect(component.productName.value).toEqual(expectedSearchParams.productName);
      expect(component.productCode.value).toEqual(expectedSearchParams.productCode);
      expect(component.productGenre.value).toEqual(expectedSearchParams.productGenre);
      expect(component.endOfSale.value).toEqual(expectedSearchParams.endOfSale);
      expect(component.paginator.pageIndex).toEqual(expectedSearchParams.pageIndex);
      expect(component.paginator.pageSize).toEqual(expectedSearchParams.pageSize);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  // describe('#singnIn', () => {
  //   it('should not sign in', () => {
  //     accountServiceSpy.signIn.and.returnValue(of(null));
  //     component.clickSignInButton();
  //     expect(accountServiceSpy.setUser.calls.count()).toEqual(0);
  //   });

  //   it('should sign in', () => {
  //     accountServiceSpy.signIn.and.returnValue(of(expectedResponseDto));
  //     spyOn(router, 'navigate');

  //     component.clickSignInButton();

  //     expect(accountServiceSpy.setUser.calls.count()).toEqual(1);
  //     expect(router.navigate).toHaveBeenCalledWith(['/' + UrlConst.PATH_PRODUCT_LISTING]);
  //   });
  // });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  // describe('DOM placeholder', () => {
  //   it('title', () => {
  //     const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('.sign-in-title');
  //     expect(htmlInputElement.innerText).toContain('EXAPMLE SITE');
  //   });

  //   it('signin user account', () => {
  //     const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#signin-user-account');
  //     expect(htmlInputElement.placeholder).toContain('ユーザアカウント');
  //   });
  //   it('signin user password', () => {
  //     const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#signin-user-password');
  //     expect(htmlInputElement.placeholder).toContain('パスワード');
  //   });
  //   it('saveBtn', () => {
  //     const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#signInBtn');
  //     expect(htmlInputElement.innerText).toContain('サインイン');
  //   });
  // });

  // describe('DOM input test', () => {
  //   it('signin user account', () => {
  //     const expectedValue = expectedResponseDto.userAccount;
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', expectedValue);
  //     expect(component.signInUserAccount.value).toEqual(expectedValue);
  //   });
  //   it('signin user password', () => {
  //     const expectedValue = 'productName';
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', expectedValue);
  //     expect(component.signInUserPassword.value).toEqual(expectedValue);
  //   });
  // });

  // describe('DOM input validation test', () => {
  //   it('signin user account', () => {
  //     const expectedValue = '';
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', expectedValue);
  //     const validationError = fixture.nativeElement.querySelector('.validation-error');
  //     expect(validationError).toBeTruthy();
  //   });
  //   it('signin user password', () => {
  //     const expectedValue = '';
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', expectedValue);
  //     const validationError = fixture.nativeElement.querySelector('.validation-error');
  //     expect(validationError).toBeTruthy();
  //   });
  // });

  // describe('DOM input test', () => {
  //   it('Should Enter input and create request dto', () => {
  //     let expectedValue = expectedSearchParams.Username;
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-account', expectedValue);

  //     expectedValue = expectedSearchParams.Password;
  //     HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#signin-user-password', expectedValue);

  //     // tslint:disable-next-line: no-string-literal
  //     const signInRequestDto: SignInRequestDto = component['createSignInRequestDto']();

  //     expect(signInRequestDto.Username).toEqual(expectedSearchParams.Username);
  //     expect(signInRequestDto.Password).toEqual(expectedSearchParams.Password);
  //   });
  // });
});
