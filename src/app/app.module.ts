import { HttpClient, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { HeaderComponent } from './component/common/header/header.component';
import { SidenavComponent } from './component/common/sidenav/sidenav.component';
import {
  DummyPurchasingPageComponent
} from './component/pages/dummy-purchasing-page/dummy-purchasing-page.component';
import {
  ProductListingPageComponent
} from './component/pages/product-listing-page/product-listing-page.component';
import {
  ProductRegisteringPageComponent
} from './component/pages/product-registering-page/product-registering-page.component';
import {
  PurchaseHistoryListingPageComponent
} from './component/pages/purchase-history-listing-page/purchase-history-listing-page.component';
import { SignInPageComponent } from './component/pages/sign-in-page/sign-in-page.component';
import {
  StockRegisteringPageComponent
} from './component/pages/stock-registering-page/stock-registering-page.component';
import { MaterialModule } from './utils/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { XhrInterceptor } from './intercepter/xhr-interceptor';
import { ErrorMessagingComponent } from './component/common/error-messaging/error-messaging.component';
import { HttpXsrfInterceptor } from './intercepter/http-xsrf-interceptor';
import { LoadingComponent } from './component/common/loading/loading.component';
import { YesNoDialogComponent } from './component/common/yes-no-dialog/yes-no-dialog.component';
import { SuccessMessagingComponent } from './component/common/success-messaging/success-messaging.component';
import { MatDatePickerComponent } from './component/common/mat-date-picker/mat-date-picker.component';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { CurrencyToNumberPipe } from './pipe/currency-to-number.pipe';
import { NumberInputDirective } from './directive/number-input.directive';

// 他言語化の設定
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
    DummyPurchasingPageComponent,
    ProductListingPageComponent,
    SidenavComponent,
    ErrorMessagingComponent,
    LoadingComponent,
    YesNoDialogComponent,
    SuccessMessagingComponent,
    MatDatePickerComponent,
    CurrencyToNumberPipe,
    NumberInputDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  entryComponents: [
    YesNoDialogComponent
  ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
      CurrencyPipe,
      CurrencyToNumberPipe,
      // The locale to use for this system
      { provide: LOCALE_ID, useValue: 'ja-JP' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
