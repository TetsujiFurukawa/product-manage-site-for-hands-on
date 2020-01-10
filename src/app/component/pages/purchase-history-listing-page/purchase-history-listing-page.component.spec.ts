import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import {
    ProductPurchaseHistorySearchListResponseDto
} from 'src/app/entity/dto/response/product-purchase-history-search-list-response-dto';
import {
    ProductPurchaseHistorySearchResponseDto
} from 'src/app/entity/dto/response/product-purchase-history-search-response-dto';
import { User } from 'src/app/entity/user';
import { CurrencyCommaPipe } from 'src/app/pipe/currency-comma.pipe';
import { AccountService } from 'src/app/service/account.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductPurchaseService } from 'src/app/service/product-purchase.service';
import { ProductService } from 'src/app/service/product.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';
import { MaterialModule } from 'src/app/utils/material/material.module';

import { CurrencyPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { PurchaseHistoryListingPageComponent } from './purchase-history-listing-page.component';

describe('PurchaseHistoryListingPageComponent', () => {
  const expectedGenres = Array('1', '2', '3');
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';

  const expectedSearchParamsProductPurchaseName = 'productPurchaseName';
  const expectedSearchParamsProductPurchaseDateFrom = '2020/01/01';
  const expectedSearchParamsProductPurchaseDateTo = '2020/01/11';
  const expectedSearchParamsProductName = 'productName';
  const expectedSearchParamsProductCode = 'productCode';
  const expectedSearchParamsPageSize = 50;
  const expectedSearchParamsPageIndex = 1;

  const expectedProductPurchaseHistorySearchListResponseDto: ProductPurchaseHistorySearchListResponseDto = new ProductPurchaseHistorySearchListResponseDto();
  const productPurchaseHistorySearchResponseDtos: ProductPurchaseHistorySearchResponseDto[] = [
    {
      no: 1,
      productName: 'productName',
      productCode: 'productCode',
      productPurchaseName: 'productPurchaseName',
      productImageUrl: 'productImageUrl',
      productPurchaseDate: new Date(),
      productPurchaseUnitPrice: 123,
      productPurchaseQuantity: 456,
      productPurchaseAmount: 789
    }
  ];
  expectedProductPurchaseHistorySearchListResponseDto.productPurchaseHistorySearchResponseDtos = productPurchaseHistorySearchResponseDtos;

  let component: PurchaseHistoryListingPageComponent;
  let fixture: ComponentFixture<PurchaseHistoryListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy; getProductList: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let searchParamsServiceSpy: { getProductListingSearchParam: jasmine.Spy; removeProductListingSearchParam: jasmine.Spy; setProductListingSearchParam: jasmine.Spy };
  let productPurchaseServiceSpy: { getProductPurchaseHistoryList: jasmine.Spy };

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres', 'getProductList']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', ['getProductListingSearchParam', 'removeProductListingSearchParam', 'setProductListingSearchParam']);
    productPurchaseServiceSpy = jasmine.createSpyObj('PurchaseService', ['getProductPurchaseHistoryList']);

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
        CurrencyCommaPipe,
        CurrencyPipe,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy },
        { provide: ProductPurchaseService, useValue: productPurchaseServiceSpy }
      ],
      declarations: [PurchaseHistoryListingPageComponent, CurrencyCommaPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(user);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    fixture = TestBed.createComponent(PurchaseHistoryListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(null);
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickSearchButton', () => {
    it('should search', () => {
      productPurchaseServiceSpy.getProductPurchaseHistoryList.and.returnValue(of(expectedProductPurchaseHistorySearchListResponseDto));
      component.clickSearchButton();

      expect(productPurchaseServiceSpy.getProductPurchaseHistoryList.calls.count()).toEqual(1);
      expect(component.purchaseHistorySearchResponseDtos).toEqual(expectedProductPurchaseHistorySearchListResponseDto.productPurchaseHistorySearchResponseDtos);
    });
  });

  describe('#receivedEventFromChildFrom', () => {
    it('should set date', () => {
      component.receivedEventFromChildFrom(expectedSearchParamsProductPurchaseDateFrom);
      expect(component.productPurchaseDateFrom.value).toEqual(expectedSearchParamsProductPurchaseDateFrom);
    });
  });

  describe('#receivedEventFromChildTo', () => {
    it('should set date', () => {
      component.receivedEventFromChildTo(expectedSearchParamsProductPurchaseDateTo);
      expect(component.productPurchaseDateTo.value).toEqual(expectedSearchParamsProductPurchaseDateTo);
    });
  });
  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#title');
      expect(htmlInputElement.innerText).toContain('購入履歴一覧');
    });

    it('product purchase name', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-purchase-name');
      expect(htmlInputElement.placeholder).toContain('購入者');
    });
    it('product purchase date from', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-purchase-date-from');
      expect(htmlInputElement.placeholder).toContain('購入日From');
    });
    it('product purchase date to', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-purchase-date-to');
      expect(htmlInputElement.placeholder).toContain('購入日To');
    });
    it('product code', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-code');
      expect(htmlInputElement.placeholder).toContain('商品コード');
    });
    it('product name', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-name');
      expect(htmlInputElement.placeholder).toContain('商品名');
    });
  });

  describe('DOM input test', () => {
    it('product purchase name', () => {
      const expectedValue = expectedSearchParamsProductPurchaseName;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-purchase-name', expectedValue);
      expect(component.productPurchaseName.value).toEqual(expectedValue);
    });
    it('product name', () => {
      const expectedValue = expectedSearchParamsProductName;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product code', () => {
      const expectedValue = expectedSearchParamsProductCode;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      expect(component.productCode.value).toEqual(expectedValue.toUpperCase());
    });
  });

  describe('DOM input test', () => {
    it('Should Enter input and create http params', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-purchase-name', expectedSearchParamsProductPurchaseName);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedSearchParamsProductName);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedSearchParamsProductCode);

      component.receivedEventFromChildFrom(expectedSearchParamsProductPurchaseDateFrom);
      component.receivedEventFromChildTo(expectedSearchParamsProductPurchaseDateTo);
      // fixture.detectChanges();

      // tslint:disable-next-line: no-string-literal
      const actualHttpParams: HttpParams = component['createHttpParams']();
      expect(actualHttpParams.get('productPurchaseName')).toEqual(expectedSearchParamsProductPurchaseName);
      expect(actualHttpParams.get('productName')).toEqual(expectedSearchParamsProductName);
      expect(actualHttpParams.get('productCode')).toEqual(expectedSearchParamsProductCode.toUpperCase());
      expect(actualHttpParams.get('pageSize').toString()).toEqual(expectedSearchParamsPageSize.toString());
      expect(actualHttpParams.get('pageIndex').toString()).toEqual((expectedSearchParamsPageIndex - 1).toString());

      expect(actualHttpParams.get('productPurchaseDateFrom')).toEqual(new Date(expectedSearchParamsProductPurchaseDateFrom).toDateString());
      expect(actualHttpParams.get('productPurchaseDateTo')).toEqual(new Date(expectedSearchParamsProductPurchaseDateTo).toDateString());
    });
    it('Should Enter input and create http params without purchase date', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-purchase-name', expectedSearchParamsProductPurchaseName);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedSearchParamsProductName);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedSearchParamsProductCode);

      // fixture.detectChanges();

      // tslint:disable-next-line: no-string-literal
      const actualHttpParams: HttpParams = component['createHttpParams']();
      expect(actualHttpParams.get('productPurchaseName')).toEqual(expectedSearchParamsProductPurchaseName);
      expect(actualHttpParams.get('productName')).toEqual(expectedSearchParamsProductName);
      expect(actualHttpParams.get('productCode')).toEqual(expectedSearchParamsProductCode.toUpperCase());
      expect(actualHttpParams.get('pageSize').toString()).toEqual(expectedSearchParamsPageSize.toString());
      expect(actualHttpParams.get('pageIndex').toString()).toEqual((expectedSearchParamsPageIndex - 1).toString());

      expect(actualHttpParams.get('productPurchaseDateFrom')).toBeNull();
      expect(actualHttpParams.get('productPurchaseDateTo')).toBeNull();
    });
  });
});
