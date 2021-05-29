import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { User } from 'src/app/pages/models/user';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductPurchaseService } from 'src/app/pages/services/product-purchase.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';

import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    PurchaseHistoryListingSearchParamsDto
} from '../../models/dtos/requests/purchase-history-listing-search-params-dto';
import {
    ProductPurchaseHistorySearchListResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-list-response-dto';
import {
    ProductPurchaseHistorySearchResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-response-dto';
import { PurchaseHistoryListingPageComponent } from './purchase-history-listing-page.component';

/** Frequently used values */
const VALUE_PRODUCT_PURCHASE_NAME = 'productPurchaseName';
const VALUE_PRODUCT_PURCHASE_DATE_FROM = 'Wed Jan 01 2020 00:00:00 GMT+0900';
const VALUE_PRODUCT_PURCHASE_DATE_TO = 'Wed Jan 11 2020 00:00:00 GMT+0900';
const VALUE_PRODUCT_PURCHASE_DATE_FROM_ISO = '2019-12-31T15:00:00.000Z';
const VALUE_PRODUCT_PURCHASE_DATE_TO_ISO = '2020-01-11T15:00:00.000Z';
const VALUE_PRODUCT_NAME = 'productName';
const VALUE_PRODUCT_CODE_UPPER = 'PRODUCTCODE';
const VALUE_PRODUCT_CODE_LOWER = 'productCode';
const VALUE_PRODUCT_PURCHASE_UNIT_PRICE = 123;
const VALUE_PRODUCT_PURCHASE_QUANTITY = 2;
const VALUE_PRODUCT_PURCHASE_AMOUNT = 246;
const VALUE_PAGE_INDEX = 0;
const VALUE_PAGE_SIZE = 50;

describe('PurchaseHistoryListingPageComponent', () => {
  const expectedUser = createExpectedUser();
  const expectedSearchParamsDto = createExpectedSearchParamsDto();
  const expectedSearchListResponseDto = createExpectedSearchListResponseDto();

  let component: PurchaseHistoryListingPageComponent;
  let fixture: ComponentFixture<PurchaseHistoryListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let productPurchaseServiceSpy: { getProductPurchaseHistoryList: jasmine.Spy };

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    productPurchaseServiceSpy = jasmine.createSpyObj('PurchaseService', ['getProductPurchaseHistoryList']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        NgxUpperCaseDirectiveModule
      ],
      providers: [
        FormBuilder,
        FormattedNumberPipe,
        FormattedCurrencyPipe,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: ProductPurchaseService, useValue: productPurchaseServiceSpy }
      ],
      declarations: [PurchaseHistoryListingPageComponent, FormattedNumberPipe, FormattedCurrencyPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(expectedUser);
    productPurchaseServiceSpy.getProductPurchaseHistoryList.and.returnValue(of(expectedSearchListResponseDto));
    fixture = TestBed.createComponent(PurchaseHistoryListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should set user lang to default of translate service on init', () => {
      component.ngOnInit();
      expect(component.translateService.getDefaultLang()).toEqual(expectedUser.userLanguage);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickSearchButton', () => {
    describe('If the page index does not change after searching', () => {
      it('should search normally', () => {
        component.clickSearchButton();
        expect(productPurchaseServiceSpy.getProductPurchaseHistoryList.calls.count()).toEqual(1);
        expect(component.purchaseHistorySearchResponses).toEqual(
          expectedSearchListResponseDto.productPurchaseHistorySearchResponseDtos
        );
      });
    });
    describe('If the page index change after searching', () => {
      it('should overwrite pagenator page index from response', () => {
        component.paginator.pageIndex = 1;
        component.clickSearchButton();
        expect(component.paginator.pageIndex).toEqual(expectedSearchListResponseDto.pageIndex);
      });
    });
  });

  describe('#receivedEventFromChildFrom', () => {
    it('should set date', () => {
      component.receivedEventFromChildFrom(VALUE_PRODUCT_PURCHASE_DATE_FROM);
      expect(component.productPurchaseDateFrom.value).toEqual(VALUE_PRODUCT_PURCHASE_DATE_FROM);
    });
  });

  describe('#receivedEventFromChildTo', () => {
    it('should set date', () => {
      component.receivedEventFromChildTo(VALUE_PRODUCT_PURCHASE_DATE_TO);
      expect(component.productPurchaseDateTo.value).toEqual(VALUE_PRODUCT_PURCHASE_DATE_TO);
    });
  });
  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#title')).nativeElement;
      expect(htmlElement.innerText).toContain('購入履歴一覧');
    });

    it('product purchase name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-purchase-name')).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('購入者');
    });
    it('product purchase date from', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('#product-purchase-date-from')
      ).nativeElement;
      expect(htmlInputElement.placeholder).toContain('購入日From');
    });
    it('product purchase date to', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('#product-purchase-date-to')
      ).nativeElement;
      expect(htmlInputElement.placeholder).toContain('購入日To');
    });
    it('product code', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-code')).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品コード');
    });
    it('product name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-name')).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品名');
    });
  });

  describe('DOM input test', () => {
    it('product purchase name', () => {
      const expectedValue = VALUE_PRODUCT_PURCHASE_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-purchase-name', expectedValue);
      expect(component.productPurchaseName.value).toEqual(expectedValue);
    });
    it('product name', () => {
      const expectedValue = VALUE_PRODUCT_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product code', () => {
      const expectedValue = VALUE_PRODUCT_CODE_LOWER;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      expect(component.productCode.value).toEqual(expectedValue.toUpperCase());
    });
  });

  describe('#createSearchParamsDto', () => {
    it('Should create product listing search params dto correctly', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-purchase-name',
        VALUE_PRODUCT_PURCHASE_NAME
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', VALUE_PRODUCT_NAME);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-code',
        VALUE_PRODUCT_CODE_LOWER
      );

      component.receivedEventFromChildFrom(VALUE_PRODUCT_PURCHASE_DATE_FROM);
      component.receivedEventFromChildTo(VALUE_PRODUCT_PURCHASE_DATE_TO);

      const privateMethodName = 'createSearchParamsDto';
      const resultProductListingSearchParamsDto: PurchaseHistoryListingSearchParamsDto = component[privateMethodName]();
      expect(resultProductListingSearchParamsDto).toEqual(expectedSearchParamsDto);
    });
  });
});

function createExpectedUser(): User {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'Asia/Tokyo';
  user.userTimezoneOffset = '+0900';
  return user;
}

function createExpectedSearchParamsDto() {
  const purchaseHistoryListingSearchParamsDto: PurchaseHistoryListingSearchParamsDto = {
    productPurchaseName: VALUE_PRODUCT_PURCHASE_NAME,
    productPurchaseDateFrom: VALUE_PRODUCT_PURCHASE_DATE_FROM_ISO,
    productPurchaseDateTo: VALUE_PRODUCT_PURCHASE_DATE_TO_ISO,
    productName: VALUE_PRODUCT_NAME,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    pageIndex: VALUE_PAGE_INDEX,
    pageSize: VALUE_PAGE_SIZE
  };
  return purchaseHistoryListingSearchParamsDto;
}

function createExpectedSearchListResponseDto(): ProductPurchaseHistorySearchListResponseDto {
  const productPurchaseHistorySearchResponseDto: ProductPurchaseHistorySearchResponseDto[] = [
    {
      no: 1,
      productName: 'productName',
      productCode: 'productCode',
      productPurchaseName: 'productPurchaseName',
      productImageUrl: 'productImageUrl',
      productPurchaseDate: new Date(),
      productPurchaseUnitPrice: VALUE_PRODUCT_PURCHASE_UNIT_PRICE,
      productPurchaseQuantity: VALUE_PRODUCT_PURCHASE_QUANTITY,
      productPurchaseAmount: VALUE_PRODUCT_PURCHASE_AMOUNT
    }
  ];
  const productPurchaseHistorySearchListResponseDto: ProductPurchaseHistorySearchListResponseDto = {
    productPurchaseHistorySearchResponseDtos: productPurchaseHistorySearchResponseDto,
    pageIndex: VALUE_PAGE_INDEX,
    resultsLength: 1
  };
  return productPurchaseHistorySearchListResponseDto;
}
