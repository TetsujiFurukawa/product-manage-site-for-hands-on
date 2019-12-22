import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import {
    ProductPurchaseResponseDto
} from 'src/app/entity/dto/response/product-purchase-response-dto';
import { User } from 'src/app/entity/user';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductPurchaseService } from 'src/app/service/product-purchase.service';
import { ProductService } from 'src/app/service/product.service';

import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

describe('DummyPurchasingPageComponent', () => {
  const expectedGenres = Array(1, 2, 3);
  let component: DummyPurchasingPageComponent;
  let fixture: ComponentFixture<DummyPurchasingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let productPurchaseServiceSpy: { createProductPurchase: jasmine.Spy; getProductPurchase: jasmine.Spy };

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    productPurchaseServiceSpy = jasmine.createSpyObj('PurchaseService', ['createProductPurchase', 'getProductPurchase']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        CurrencyToNumberPipe,
        CurrencyPipe,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: ProductPurchaseService, useValue: productPurchaseServiceSpy }
      ],
      declarations: [DummyPurchasingPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(createUser);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    fixture = TestBed.createComponent(DummyPurchasingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init', async () => {
      productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
      component.ngOnInit();
      expect(productServiceSpy.getGenres.calls.count()).toBeGreaterThan(1);
      expect(component.genres).toEqual(expectedGenres);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickSaveButton', () => {
    it('should create data but no response', async () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productPurchaseServiceSpy.createProductPurchase.and.returnValue(of(null));
      component.clickSaveButton();
      expect(productPurchaseServiceSpy.createProductPurchase.calls.count()).toEqual(1);
    });
    it('should create data', async () => {
      component.currency = 'JPY';
      component.locale = 'ja-JP';
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      const expectedResponseDto: ProductPurchaseResponseDto = new ProductPurchaseResponseDto();

      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productPurchaseUnitPrice = 1000;
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 1000;

      productPurchaseServiceSpy.createProductPurchase.and.returnValue(of(expectedResponseDto));
      component.clickSaveButton();
      expect(productPurchaseServiceSpy.createProductPurchase.calls.count()).toEqual(1);
      expect(component.productStockQuantity.value).toEqual('1,000');
      expect(component.productPurchaseQuantity.value).toBeNull();
      expect(component.productPurchaseAmount.value).toBeNull();
    });
    it('should not create data', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(false) });
      productPurchaseServiceSpy.createProductPurchase.and.returnValue(of(null));
      component.clickSaveButton();
      expect(productPurchaseServiceSpy.createProductPurchase.calls.count()).toEqual(0);
    });
  });

  describe('#blurProductCode', () => {
    it('no product code', async () => {
      component.productCode.setValue('');
      component.blurProductCode();
      expect(productPurchaseServiceSpy.getProductPurchase.calls.count()).toEqual(0);
    });
    it('no load data', async () => {
      component.currency = 'JPY';
      component.locale = 'ja-JP';
      component.productCode.setValue('test01');
      productPurchaseServiceSpy.getProductPurchase.and.returnValue(of(null));
      component.blurProductCode();
      expect(productPurchaseServiceSpy.getProductPurchase.calls.count()).toEqual(1);
    });

    it('should load data', async () => {
      component.currency = 'JPY';
      component.locale = 'ja-JP';
      component.productCode.setValue('test01');
      const expectedResponseDto: ProductPurchaseResponseDto = new ProductPurchaseResponseDto();

      expectedResponseDto.productCode = 'productCode';
      expectedResponseDto.productColor = 'productColor';
      expectedResponseDto.productGenre = '1';
      expectedResponseDto.productImage = 'productImage';
      expectedResponseDto.productName = 'productName';
      expectedResponseDto.productPurchaseUnitPrice = 1000;
      expectedResponseDto.productSizeStandard = 'productSizeStandard';
      expectedResponseDto.productStockQuantity = 2000;

      productPurchaseServiceSpy.getProductPurchase.and.returnValue(of(expectedResponseDto));
      component.blurProductCode();

      expect(component.productCode.value).toEqual(expectedResponseDto.productCode);
      expect(component.productGenre.value).toEqual(expectedResponseDto.productGenre);
      expect(component.productImage.value).toEqual(expectedResponseDto.productImage);
      expect(component.productName.value).toEqual(expectedResponseDto.productName);
      expect(component.productPurchaseUnitPrice.value).toEqual('1,000');
      expect(component.productSizeStandard.value).toEqual(expectedResponseDto.productSizeStandard);
      expect(component.productStockQuantity.value).toEqual('2,000');
      expect(productPurchaseServiceSpy.getProductPurchase.calls.count()).toBe(1);
    });
  });

  describe('#blurProductPurchaseQuantity', () => {
    it('should return formated value', () => {
      component.currency = 'JPY';
      component.locale = 'ja-JP';
      component.productPurchaseUnitPrice.setValue(2);
      component.productPurchaseQuantity.setValue(111111111);
      component.blurProductPurchaseQuantity();
      expect(component.productPurchaseAmount.value).toEqual('222,222,222');
    });
  });

  describe('#onKey', () => {
    it('to be determined', () => {
      component.onKey();
    });
  });
});

function createUser() {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';
  return user;
}
