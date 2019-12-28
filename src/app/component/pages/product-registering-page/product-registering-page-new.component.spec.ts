import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { User } from 'src/app/entity/user';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductService } from 'src/app/service/product.service';
import { HtmlElementUtility } from 'src/app/tetsing/html-element-utility';

import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductRegisteringPageComponent } from './product-registering-page.component';

describe('ProductRegisteringPageComponent', () => {
  const CHAR_NEW = '/new';
  const expectedGenres = Array('1', '2', '3');
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';
  const expectedResponseDto: ProductDto = new ProductDto();
  expectedResponseDto.endOfSale = true;
  expectedResponseDto.endOfSaleDate = new Date();
  expectedResponseDto.productCode = 'ABCD1234';
  expectedResponseDto.productColor = 'productColor';
  expectedResponseDto.productGenre = '1';
  expectedResponseDto.productImage =
    // tslint:disable-next-line: max-line-length
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAgICAsICAsQCwkLEBMOCwsOExYSEhMSEhYVERMSEhMRFRUZGhsaGRUhISQkISEwLy8vMDY2NjY2NjY2Njb/2wBDAQwLCwwNDA8NDQ8TDg4OExQODw8OFBoSEhQSEhoiGBUVFRUYIh4gGxsbIB4lJSIiJSUvLywvLzY2NjY2NjY2Njb/wAARCAEoAYsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZNKkEUk0mdkal2wMnCjJwB16VX1TUrbR9Pn1O83fZ7dd8mwZbGQAAMjua808UfEc6nbi30LfHaSDEshwsrk5/d4BOxMD5m79BRcdjQuvizbTW06aVZP9vwwtxcECMnsWCkN+HH1q/o/xI0lrFBrcxhvkO2YiJgh4BEhA3bAc4wx6g9sV5hb2C3heW6YtPJ0kXgr6bfQD0796cdRn0VktrxfMjP8Aq5U43r/8UKV2PQ98sr+y1KAXVhOlxA3SSNgwz6HHQ+xqxXjVlJLpN0b3TZvsd0f9Zs+5IB2lj6MOfr713vh7xtZ6tKun36iz1M/cQnMU2MAmFz3/ANg8j360XFY6iiiimIKKqXOq6ZZZ+13cMJAyVeRQ3/fOc1zGq/E7w3pwZYGe8lHAEYCJn3eUrx/ug0AdlVe91Cx06Hz7+4jt4ugaRguTjOFB5J9hzXkGrfFvVrkMlgqWqngeUN7D6yyqM/hGtcLf6vf6lMZ7yd5ZSMF3YsxHoWYk49ulK47Hs2q/Fjw/YMY7OOS9cfxL+7T82Bb/AMdrA/4XLdNL8umxCL+6XbP/AH2B/wCy15ZmpLaJ7idIU/iPJ9AOpoux6H0d4Y8T2fiiya5tkaGaIhbi2cgshOcHI6qcHB9q268U+HOqra+M1tEOIbyF7c+hdB5qn81IFe10ITCiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKxfFPia28Laet/cwvOHkEaxx8ckE5JwcAYqh4w8bQeEzbRtbPcy3O7BB2ogXH3mweTngV5ZrviXU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gAooooAKKKKACiiigCje6Jo2pOJNQsLa6kAwHmiR2x6bmUnFZWoeAfCWpTPcXGnIs0nLvEWjyfXajBcnucc10dFAHDy/CTwlIWKC5jJ7LLwPoGU1Tf4N6AxBjvbpFHUZjOR6ZKV6JRRYd2eaN8GNML5TVLgJn7pRCcemeP5VC3wXh3HZrDBM8BrcE49yJQM49q9RoosF2eXn4L2+47dXbZ2BgBb8SJQP0qZPgzpo+/qc5+kaD+ZavSqKVkF2cDB8IfDsZBnuLmYDqNyJn/vlM1rW3w68I2ziT7AJSCCold2UY5xtzgj2INdRRTsF2U7PR9J05i9hY29s54LwxIjH6lVBq5RRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';
  expectedResponseDto.productName = 'productName';
  expectedResponseDto.productSizeStandard = 'productSizeStandard';
  expectedResponseDto.productSeq = 1;
  expectedResponseDto.productUnitPrice = 1000;
  expectedResponseDto.updateDate = new Date();

  let component: ProductRegisteringPageComponent;
  let fixture: ComponentFixture<ProductRegisteringPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy; getProduct: jasmine.Spy; createProduct: jasmine.Spy; updateProduct: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres', 'getProduct', 'createProduct', 'updateProduct']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxUpperCaseDirectiveModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
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
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productCode: 'ABCD1234' }) } } },
        { provide: Router, useValue: { url: '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW, navigate(): void {} } }
      ],
      declarations: [ProductRegisteringPageComponent]
    }).compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(user);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    productServiceSpy.getProduct.and.returnValue(of(expectedResponseDto));
    fixture = TestBed.createComponent(ProductRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init create screen', () => {
      expect(productServiceSpy.getGenres.calls.count()).toEqual(1);
      expect(component.genres).toEqual(expectedGenres);
      expect(productServiceSpy.getProduct.calls.count()).toEqual(0);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickProductImageButton', () => {
    it('should return', () => {
      component.clickProductImageButton(Array());
      fixture.detectChanges();

      expect(component.productImage.value).toBeNull();
    });
    it('should return when not images', () => {
      const content = 'data:image/jpeg;base64,/9j/4QAYRXh';
      const data = new Blob([content]);
      const arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(data);
      const imageFile = new File(arrayOfBlob, 'test01.zip', { type: 'application/zip' });

      component.clickProductImageButton(Array(imageFile));
      fixture.detectChanges();

      expect(component.productImage.value).toBeNull();
    });
    it('should load image', () => {
      const mockFileReader: any = {
        target: { result: '' },
        readAsDataURL: blobInput => {},
        onload: () => {}
      };
      spyOn<any>(window, 'FileReader').and.returnValue(mockFileReader);
      spyOn<any>(mockFileReader, 'readAsDataURL').and.callFake(blobInput => {
        mockFileReader.onload({ target: { result: expectedResponseDto.productImage } });
      });
      // mockFileReader.onload.calls.argsFor(0)[1]('onload');

      // const mockFileReader = {
      //   result: '',
      //   readAsDataURL: blobInput => {
      //     console.log('readAsDataURL');
      //   },
      //   onload: () => {
      //     console.log('onload');
      //     return { result: 'data:image/jpeg;base64,/9j/4QAYRXh' };
      //   }
      // };

      // spyOn<any>(window, 'FileReader').and.returnValue(mockFileReader);
      // spyOn<any>(mockFileReader, 'readAsDataURL').and.callFake(blobInput => {
      //   console.log('readAsDataURL:' + blobInput.toString());
      //   mockFileReader.result = 'data:image/jpeg;base64,/9j/4QAYRXh';
      //   mockFileReader.onload();
      // });
      // spyOn<any>(mockFileReader, 'onload').and.callFake(blobInput => {
      //   console.log('onload:' + blobInput.toString());
      //   return { result: 'data:image/jpeg;base64,/9j/4QAYRXh' };
      // });

      // const eventListener = jasmine.createSpy();
      // const dummyFileReader: any = {
      //   addEventListener: eventListener
      //   // readAsDataURL: blobInput => {}
      //   // onload: () => {}
      // };

      // spyOn(window as any, 'FileReader').and.returnValue(dummyFileReader);
      // const reader = new FileReader();
      // // tslint:disable-next-line: only-arrow-functions
      // reader.addEventListener('load', function(e: any) {
      //   expect(e.target.result).toEqual('url');
      //   done();
      //   console.log('e:' + e.target.result);
      // });

      // expect(eventListener.calls.mostRecent().args[0]).toEqual('load');
      // const onloadHandler = eventListener.calls.mostRecent().args[1];
      // const event = { target: { result: 'url' } };
      // onloadHandler(event);

      // // tslint:disable-next-line: prefer-const
      // let mockFileReader: any = {
      //   target: { result: '' },
      //   readAsDataURL: blobInput => {},
      //   onload: () => {}
      // };
      // spyOn(window as any, 'FileReader').and.returnValue(mockFileReader);
      // spyOn(mockFileReader as FileReader, 'readAsDataURL').and.callFake(blobInput => {
      //   console.log('mockFileReader:' + blobInput);
      //   mockFileReader.onload({ target: { result: 'data:image/jpeg;base64,/9j/4QAYRXh' } });
      // });
      // spyOn(mockFileReader as FileReader, 'onload').and.returnValue({ target: { result: 'data:image/jpeg;base64,/9j/4QAYRXh' } });

      // spyOn(window as any, 'FileReader').and.returnValue({
      //   readAsDataURL(e) {
      //     console.log('readAsDataURL' + e);
      //   },

      //   onload() {
      //     console.log('onload');
      //     return of({ target: { result: 'data:image/jpeg;base64,/9j/4QAYRXh' } });
      //   }
      // });

      // spyOn(window as any, 'FileReader').and.returnValue({
      //   readAsDataURL(e) {
      //     console.log('readAsDataURL' + e);
      //     this.onload({
      //       target: {
      //         result: 'data:image/jpeg;base64,/9j/4QAYRXh'
      //       }
      //     });
      //   }
      // });

      const content = 'data:image/jpeg;base64,/9j/4QAYRXh';
      const data = new Blob([content]);
      const arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(data);
      const imageFile = new File(arrayOfBlob, 'test01.img', { type: 'application/image' });

      component.clickProductImageButton(Array(imageFile));
      fixture.detectChanges();

      // fixture.whenStable().then(() => {
      //   fixture.detectChanges();
      //   console.log('aaabbb');
      // });

      // const mockFileReader = {
      //   target: { result: '' },
      //   readAsDataURL: blobInput => {},
      //   onload: (e: any) => {}
      // };
      // spyOn(window, 'FileReader').and.callThrough();
      // spyOn(mockFileReader, 'readAsDataURL').and.callFake(blobInput => {
      //   mockFileReader.onload({ target: { result: 'data:image/jpeg;base64,/9j/4QAYRXh' } });
      // });
      // spyOn(window, 'FileReader').and.returnValue({onload: function() {},readAsDataURL:function() {}});
      // { url: '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW, navigate(): void {} }

      // component.productImage.setValue(expectedResponseDto.productImage);
      // component.clickClearButton();
      // expect(component.productImage.value).toBeNull();
    });
  });

  describe('#clickClearButton', () => {
    it('should clear', () => {
      component.productImage.setValue(expectedResponseDto.productImage);
      component.clickClearButton();
      expect(component.productImage.value).toBeNull();
    });
  });

  describe('#clickReturnButton', () => {
    it('should return', () => {
      spyOn(router, 'navigate').and.callThrough();
      component.clickReturnButton();
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.PATH_PRODUCT_LISTING]);
    });
  });

  describe('#clickSaveButton', () => {
    it('should crete data but response is null', async () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.createProduct.and.returnValue(of(null));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(1);
    });
    it('should create data', async () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.createProduct.and.returnValue(of(expectedResponseDto));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(1);
      expect(component.productSeq.value).toEqual(expectedResponseDto.productSeq);
      expect(component.productCode.value).toEqual(expectedResponseDto.productCode);
      expect(component.productName.value).toEqual(expectedResponseDto.productName);
      expect(component.productGenre.value).toEqual(expectedResponseDto.productGenre);
      expect(component.productSizeStandard.value).toEqual(expectedResponseDto.productSizeStandard);
      expect(component.productColor.value).toEqual(expectedResponseDto.productColor);
      expect(component.productUnitPrice.value).toEqual('1,000');
      expect(component.endOfSale.value).toEqual(expectedResponseDto.endOfSale);
      expect(component.endOfSaleDate.value).toEqual(expectedResponseDto.endOfSaleDate);
      expect(component.productImage.value).toEqual(expectedResponseDto.productImage);
      expect(component.updateDate.value).toEqual(expectedResponseDto.updateDate);
    });
    it('should not create data', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(false) });
      productServiceSpy.createProduct.and.returnValue(of(null));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(0);
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#title');
      expect(htmlInputElement.innerText).toContain('商品登録');
    });

    it('product code', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-code');
      expect(htmlInputElement.placeholder).toContain('商品コード');
    });
    it('product name', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-name');
      expect(htmlInputElement.placeholder).toContain('商品名');
    });
    it('product genre', () => {
      const hTMLLabelElement: HTMLLabelElement = fixture.nativeElement.querySelector('#product-genre-label');
      expect(hTMLLabelElement.innerText).toContain('ジャンル');
    });
    it('product size standard', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-size-standard');
      expect(htmlInputElement.placeholder).toContain('サイズ・規格');
    });
    it('product color', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-color');
      expect(htmlInputElement.placeholder).toContain('色');
    });
    it('product unit price', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#product-unit-price');
      expect(htmlInputElement.placeholder).toContain('単価');
    });
    it('product end of sale', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#end-of-sale');
      expect(htmlInputElement.innerText).toContain('終了');
    });
    it('product end of sale date', async () => {
      const htmlElement: HTMLElement = fixture.nativeElement.querySelector('#end-of-sale label');
      // Clicks checkbox's label
      htmlElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#end-of-sale-date');
        expect(htmlInputElement.placeholder).toContain('販売終了日');
      });
    });

    it('saveBtn', () => {
      const htmlInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#saveBtn');
      expect(htmlInputElement.innerText).toContain('登録');
    });
  });

  describe('DOM input test', () => {
    it('product code', () => {
      const expectedValue = 'PRODUCTCODE0001';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      expect(component.productCode.value).toEqual(expectedValue);
    });
    it('product name', () => {
      const expectedValue = 'productName';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product genre', () => {
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, '#product-genre', '.product-genre-option', 0);
      expect(component.productGenre.value).toEqual('1');
    });
    it('product size standard', () => {
      const expectedValue = 'productSizeStandard';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-size-standard', expectedValue);
      expect(component.productSizeStandard.value).toEqual(expectedValue);
    });
    it('product color', () => {
      const expectedValue = 'productColor';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-color', expectedValue);
      expect(component.productColor.value).toEqual(expectedValue);
    });
    it('product unit price', () => {
      const expectedValue = '12345';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-unit-price', expectedValue);
      expect(component.productUnitPrice.value).toEqual(expectedValue);
    });
    it('end of sale', () => {
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');
      expect(component.endOfSale.value).toEqual(true);
    });
  });

  describe('DOM input validation test', () => {
    it('product code', () => {
      const expectedValue = 'PRODUCT_';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('product name', () => {
      const expectedValue = '';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('product size standard', () => {
      const expectedValue = '';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-size-standard', expectedValue);
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('product unit price', () => {
      const expectedValue = '';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-unit-price', expectedValue);
      const validationError = fixture.nativeElement.querySelector('.validation-error');
      expect(validationError).toBeTruthy();
    });
    it('EndOfSaleEndOfSaleDateValidator', async () => {
      let expectedValue = 'PRODUCTCODE0001';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);

      expectedValue = 'productName';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);

      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, '#product-genre', '.product-genre-option', 0);

      expectedValue = 'productSizeStandard';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-size-standard', expectedValue);

      expectedValue = '12345';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-unit-price', expectedValue);

      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');
      component.receivedEventFromChild(null);
      fixture.detectChanges();

      expect(component.registeringForm.valid).toBeFalsy();
    });
  });

  describe('DOM input/output test', () => {
    it('Should Enter input and create product register request dto', () => {
      let expectedValue = expectedResponseDto.productCode;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);

      expectedValue = expectedResponseDto.productName;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);

      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, '#product-genre', '.product-genre-option', 0);

      expectedValue = expectedResponseDto.productSizeStandard;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-size-standard', expectedValue);

      expectedValue = expectedResponseDto.productColor;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-color', expectedValue);

      expectedValue = expectedResponseDto.productUnitPrice.toString();
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-unit-price', expectedValue);

      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');
      component.receivedEventFromChild(expectedResponseDto.endOfSaleDate.toString());
      fixture.detectChanges();

      // tslint:disable-next-line: no-string-literal
      const productStockRequestDto: ProductDto = component['createProductRegisterRequestDto'](true);
      expect(productStockRequestDto.productSeq).toBeNull();
      expect(productStockRequestDto.productName).toEqual(expectedResponseDto.productName);
      expect(productStockRequestDto.productGenre).toEqual('1');
      expect(productStockRequestDto.productSizeStandard).toEqual(expectedResponseDto.productSizeStandard);
      expect(productStockRequestDto.productColor).toEqual(expectedResponseDto.productColor);
      expect(productStockRequestDto.endOfSale).toBeTruthy();
      expect(productStockRequestDto.endOfSaleDate.toString()).toEqual(expectedResponseDto.endOfSaleDate.toString());
      // TODO
      // expect(productStockRequestDto.productImage).toEqual(expectedResponseDto.productImage);
      expect(productStockRequestDto.updateDate).toBeNull();
    });
    it('Should Enter product code and get product stock data then display screen', () => {
      // tslint:disable-next-line: no-string-literal
      component['extractGetProductResponse'](expectedResponseDto);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('#product-code').value).toEqual(expectedResponseDto.productCode);
        expect(fixture.nativeElement.querySelector('#product-name').value).toEqual(expectedResponseDto.productName);
        expect(fixture.nativeElement.querySelector('#product-genre').innerText).toContain('靴・スニーカー');
        expect(fixture.nativeElement.querySelector('#product-size-standard').value).toEqual(expectedResponseDto.productSizeStandard);
        expect(fixture.nativeElement.querySelector('#product-color').value).toEqual(expectedResponseDto.productColor);
        expect(fixture.nativeElement.querySelector('#product-unit-price').value).toEqual('1,000');
        //
        expect(fixture.nativeElement.querySelector('#end-of-sale-input').checked).toBeTruthy();
        expect(fixture.nativeElement.querySelector('#product-image').src).toEqual(expectedResponseDto.productImage);
      });
    });
  });
});
