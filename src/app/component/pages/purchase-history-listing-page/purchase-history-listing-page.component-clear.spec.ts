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
import { MaterialModule } from 'src/app/utils/material/material.module';

import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDatePickerComponent } from '../../common/mat-date-picker/mat-date-picker.component';
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
      declarations: [PurchaseHistoryListingPageComponent, CurrencyCommaPipe, MatDatePickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(user);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    fixture = TestBed.createComponent(PurchaseHistoryListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#clickClearButton', () => {
    it('should clear', () => {
      spyOn(component.matDatePickerComponents.first, 'reset');
      spyOn(component.matDatePickerComponents.last, 'reset');

      component.productPurchaseName.setValue(expectedSearchParamsProductPurchaseName);
      component.productPurchaseDateFrom.setValue(expectedSearchParamsProductPurchaseDateFrom);
      component.productPurchaseDateTo.setValue(expectedSearchParamsProductPurchaseDateTo);
      component.productName.setValue(expectedSearchParamsProductName);
      component.productCode.setValue(expectedSearchParamsProductCode);

      component.clickClearButton();

      expect(searchParamsServiceSpy.removeProductListingSearchParam.calls.count()).toEqual(1);
      expect(component.productPurchaseName.value).toEqual('');
      expect(component.productPurchaseDateFrom.value).toEqual('');
      expect(component.productPurchaseDateTo.value).toEqual('');
      expect(component.productName.value).toEqual('');
      expect(component.productCode.value).toEqual('');

      expect(component.matDatePickerComponents.first.reset).toHaveBeenCalled();
      expect(component.matDatePickerComponents.last.reset).toHaveBeenCalled();
    });
  });
});
