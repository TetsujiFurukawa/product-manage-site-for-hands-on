import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { User } from 'src/app/pages/models/user';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductService } from 'src/app/pages/services/product.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';

import { CurrencyPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
    ProductListingSearchParams
} from '../../models/interfaces/requests/product-listing-search-params';
import {
    ProductSearchListResponseDto
} from '../../models/interfaces/responses/product-search-list-response-dto';
import {
    ProductSearchResponseDto
} from '../../models/interfaces/responses/product-search-response-dto';
import { ProductListingPageComponent } from './product-listing-page.component';

describe('ProductListingPageComponent', () => {
  const expectedGenres = Array('1', '2', '3');
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';

  const expectedProductListingSearchParams: ProductListingSearchParams = {
    endOfSale: true,
    pageIndex: 1,
    pageSize: 50,
    productCode: 'productCode',
    productGenre: '1',
    productName: 'productName'
  };

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
  expectedProductSearchListResponseDto.pageIndex = 1;

  let component: ProductListingPageComponent;
  let fixture: ComponentFixture<ProductListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy; getProductList: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let searchParamsServiceSpy: {
    getProductListingSearchParam: jasmine.Spy;
    removeProductListingSearchParam: jasmine.Spy;
    setProductListingSearchParam: jasmine.Spy;
  };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres', 'getProductList']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', [
      'getProductListingSearchParam',
      'removeProductListingSearchParam',
      'setProductListingSearchParam'
    ]);

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
        FormattedCurrencyPipe,
        FormattedNumberPipe,
        CurrencyPipe,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy }
      ],
      declarations: [ProductListingPageComponent, FormattedCurrencyPipe, FormattedNumberPipe]
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(user);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(null);
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
      spyOn(component, 'clickSearchButton').and.callThrough();
      component.ngOnInit();

      expect(component.clickSearchButton).toHaveBeenCalledTimes(0);
    });
    it('should init search criteria', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(expectedProductListingSearchParams);
      productServiceSpy.getProductList.and.returnValue(of(expectedProductSearchListResponseDto));
      component.ngOnInit();

      expect(component.productName.value).toEqual(expectedProductListingSearchParams.productName);
      expect(component.productCode.value).toEqual(expectedProductListingSearchParams.productCode);
      expect(component.productGenre.value).toEqual(expectedProductListingSearchParams.productGenre);
      expect(component.endOfSale.value).toEqual(expectedProductListingSearchParams.endOfSale);
      expect(component.paginator.pageIndex).toEqual(expectedProductListingSearchParams.pageIndex);
      expect(component.paginator.pageSize).toEqual(expectedProductListingSearchParams.pageSize);
    });

    it('should init search criteria partly undefined', () => {
      const expectedProductListingSearchParamsUndefine: ProductListingSearchParams = {
        endOfSale: true,
        pageIndex: 1,
        pageSize: 50,
        productCode: undefined,
        productGenre: undefined,
        productName: undefined
      };
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(expectedProductListingSearchParamsUndefine);
      productServiceSpy.getProductList.and.returnValue(of(expectedProductSearchListResponseDto));
      component.ngOnInit();

      expect(component.productName.value).toEqual('');
      expect(component.productCode.value).toEqual('');
      expect(component.productGenre.value).toEqual('');
      expect(component.endOfSale.value).toEqual(expectedProductListingSearchParams.endOfSale);
      expect(component.paginator.pageIndex).toEqual(expectedProductListingSearchParams.pageIndex);
      expect(component.paginator.pageSize).toEqual(expectedProductListingSearchParams.pageSize);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(null);
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('clicks new button', () => {
    it('should move to new page', () => {
      searchParamsServiceSpy.getProductListingSearchParam.and.returnValue(null);
      spyOn(router, 'navigate').and.returnValue(null);
      component.clickNewButton();
      expect(searchParamsServiceSpy.removeProductListingSearchParam.calls.count()).toEqual(1);
      expect(router.navigate).toHaveBeenCalledWith(['/' + UrlConst.PATH_PRODUCT_REGISTERING_NEW]);
    });
  });

  describe('clicks clear button', () => {
    it('should clear', () => {
      component.productName.setValue('productName');
      component.productCode.setValue('productCode');
      component.productGenre.setValue('1');
      component.endOfSale.setValue(true);

      component.clickClearButton();

      expect(searchParamsServiceSpy.removeProductListingSearchParam.calls.count()).toEqual(1);
      expect(component.productName.value).toEqual('');
    });
  });

  describe('clicks clear button', () => {
    it('should search', () => {
      productServiceSpy.getProductList.and.returnValue(of(expectedProductSearchListResponseDto));
      component.clickSearchButton();

      expect(productServiceSpy.getProductList.calls.count()).toEqual(1);
      expect(component.productSearchResponseDtos).toEqual(
        expectedProductSearchListResponseDto.productSearchResponseDtos
      );
    });
  });

  describe('clicks list row', () => {
    it('should move to new page', () => {
      const expectedProductSearchResponseDto: ProductSearchResponseDto =
        expectedProductSearchListResponseDto.productSearchResponseDtos[0];
      spyOn(router, 'navigate').and.returnValue(null);
      component.clickListRow(expectedProductSearchResponseDto);

      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
  describe('unselectProductGenre', () => {
    it('should unselect genre', () => {
      component.productGenre.setValue('1');
      component.unselectProductGenre();

      expect(component.productGenre.value).toEqual('');
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#title');
      expect(htmlInputElement.innerText).toContain('商品一覧');
    });

    it('product name', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-name');
      expect(htmlInputElement.placeholder).toContain('商品名');
    });
    it('product code', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-code');
      expect(htmlInputElement.placeholder).toContain('商品コード');
    });
    it('product genre', () => {
      const hTMLLabelElement: HTMLLabelElement = fixture.nativeElement.querySelector('#product-genre-label');
      expect(hTMLLabelElement.innerText).toContain('ジャンル');
    });
    it('end of sale', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#end-of-sale');
      expect(htmlInputElement.innerText).toContain('販売終了');
    });

    it('new button', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#new-button');
      expect(htmlInputElement.innerText).toContain('新規');
    });
    it('clear button', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#clear-button');
      expect(htmlInputElement.innerText).toContain('クリア');
    });
    it('search button', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#search-button');
      expect(htmlInputElement.innerText).toContain('検索');
    });
  });

  describe('DOM input test', () => {
    it('product name', () => {
      const expectedValue = expectedProductListingSearchParams.productName;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product code', () => {
      const expectedValue = expectedProductListingSearchParams.productCode;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      expect(component.productCode.value).toEqual(expectedValue.toUpperCase());
    });
    it('product genre', () => {
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(
        fixture,
        '#product-genre',
        '.product-genre-option',
        Number(expectedProductListingSearchParams.productGenre)
      );
      expect(component.productGenre.value).toEqual(expectedProductListingSearchParams.productGenre);
    });
    it('end of sale', () => {
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');
      expect(component.endOfSale.value).toEqual(true);
    });
  });

  describe('DOM input test', () => {
    it('Should Enter input and create request dto / http params', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-name',
        expectedProductListingSearchParams.productName
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-code',
        expectedProductListingSearchParams.productCode
      );
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(
        fixture,
        '#product-genre',
        '.product-genre-option',
        Number(expectedProductListingSearchParams.productGenre)
      );
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');

      fixture.detectChanges();
      // tslint:disable-next-line: no-string-literal
      const actualProductListingSearchParams: ProductListingSearchParams = component['createSearchParams']();

      expect(actualProductListingSearchParams.productName).toEqual(expectedProductListingSearchParams.productName);
      expect(actualProductListingSearchParams.productCode).toEqual(
        expectedProductListingSearchParams.productCode.toUpperCase()
      );
      expect(actualProductListingSearchParams.productGenre).toEqual('1');
      expect(actualProductListingSearchParams.endOfSale).toEqual(true);
      expect(actualProductListingSearchParams.pageIndex).toEqual(0);
      expect(actualProductListingSearchParams.pageSize).toEqual(50);

      // testing http params part
      // tslint:disable-next-line: no-string-literal
      const actualHttpParams: HttpParams = component['createHttpParams'](actualProductListingSearchParams);

      expect(actualHttpParams.get('productName')).toEqual(expectedProductListingSearchParams.productName);
      expect(actualHttpParams.get('productCode')).toEqual(expectedProductListingSearchParams.productCode.toUpperCase());
      expect(actualHttpParams.get('productGenre')).toEqual('1');
      expect(actualHttpParams.get('endOfSale')).toBeTruthy();
      expect(actualHttpParams.get('pageSize').toString()).toEqual('50');
      expect(actualHttpParams.get('pageIndex').toString()).toEqual('0');
    });
  });
});
