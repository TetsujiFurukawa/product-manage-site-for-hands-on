import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { User } from 'src/app/entity/user';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { ProductService } from 'src/app/service/product.service';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

describe('DummyPurchasingPageComponent', () => {
  const expectedGenres = Array(1, 2, 3);
  let component: DummyPurchasingPageComponent;
  let fixture: ComponentFixture<DummyPurchasingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy };
  // let translateServiceSpy: { use: jasmine.Spy; setDefaultLang: jasmine.Spy; get: jasmine.Spy };

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres']);
    // translateServiceSpy = jasmine.createSpyObj('ProductService', ['use', 'setDefaultLang', 'get']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        FormBuilder,
        CurrencyToNumberPipe,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy }
        // { provide: TranslateService, useValue: translateServiceSpy }
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
      // expect(translateServiceSpy.use.calls.count()).toEqual(1);
    });
  });

  describe('#ngOnInit', () => {
    it('should init', () => {
      component.ngOnInit();
      // expect(translateServiceSpy.use.calls.count()).toEqual(2);
    });
  });
});

function createUser() {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'js-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';
  return user;
}
