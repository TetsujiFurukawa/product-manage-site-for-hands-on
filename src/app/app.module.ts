import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { CurrencyPipe, registerLocaleData } from '@angular/common';
import {
    HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule
} from '@angular/common/http';
import localeJa from '@angular/common/locales/ja';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    ErrorMessagingComponent
} from './core/components/error-messaging/error-messaging.component';
import { LoadingComponent } from './core/components/loading/loading.component';
import {
    MatDatePickerComponent
} from './core/components/mat-date-picker/mat-date-picker.component';
import {
    SuccessMessagingComponent
} from './core/components/success-messaging/success-messaging.component';
import { YesNoDialogComponent } from './core/components/yes-no-dialog/yes-no-dialog.component';
import { CurrencyCommaInputDirective } from './core/directives/currency-comma-input.directive';
import { NumberCommaInputDirective } from './core/directives/number-comma-input.directive';
import { HttpXsrfInterceptor } from './core/interceptors/http-xsrf-interceptor';
import { XhrInterceptor } from './core/interceptors/xhr-interceptor';
import { CurrencyCommaPipe } from './core/pipes/currency-comma.pipe';
import { NumberCommaPipe } from './core/pipes/number-comma.pipe';
import { MatPaginatorI18nService } from './core/services/mat-paginator-i18n.service';
import {
    ProductListingPageComponent
} from './pages/components/product-listing-page/product-listing-page.component';
import {
    ProductRegisteringPageComponent
} from './pages/components/product-registering-page/product-registering-page.component';
import {
    PurchaseHistoryListingPageComponent
} from './pages/components/purchase-history-listing-page/purchase-history-listing-page.component';
import { SignInPageComponent } from './pages/components/sign-in-page/sign-in-page.component';
import {
    StockRegisteringPageComponent
} from './pages/components/stock-registering-page/stock-registering-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import {
    DummyPurchasingPageComponent
} from './superUserPages/dummy-purchasing-page/dummy-purchasing-page.component';
import { MaterialModule } from './utils/material/material.module';

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
    CurrencyCommaPipe,
    CurrencyCommaInputDirective,
    NumberCommaPipe,
    NumberCommaInputDirective
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
    }),
    NgxUpperCaseDirectiveModule
  ],
  entryComponents: [YesNoDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    CurrencyPipe,
    CurrencyCommaPipe,
    NumberCommaPipe,
    // The locale to use for this system
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
