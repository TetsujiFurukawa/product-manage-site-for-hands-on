import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import {
    HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule
} from '@angular/common/http';
import localeJa from '@angular/common/locales/ja';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../utils/material/material.module';
import { ErrorMessagingComponent } from './components/error-messaging/error-messaging.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatDatePickerComponent } from './components/mat-date-picker/mat-date-picker.component';
import {
    SuccessMessagingComponent
} from './components/success-messaging/success-messaging.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { CurrencyCommaInputDirective } from './directives/currency-comma-input.directive';
import { NumberCommaInputDirective } from './directives/number-comma-input.directive';
import { HttpXsrfInterceptor } from './interceptors/http-xsrf-interceptor';
import { XhrInterceptor } from './interceptors/xhr-interceptor';
import { CurrencyCommaPipe } from './pipes/currency-comma.pipe';
import { NumberCommaPipe } from './pipes/number-comma.pipe';

// 他言語化の設定
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeJa);
@NgModule({
  declarations: [
    ErrorMessagingComponent,
    LoadingComponent,
    MatDatePickerComponent,
    SuccessMessagingComponent,
    YesNoDialogComponent,
    CurrencyCommaPipe,
    CurrencyCommaInputDirective,
    NumberCommaPipe,
    NumberCommaInputDirective
  ],
  imports: [
    CommonModule,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: LOCALE_ID, useValue: 'en-US' },
    CurrencyPipe,
    CurrencyCommaPipe,
    NumberCommaPipe
  ],
  entryComponents: [YesNoDialogComponent],
  exports: [
    ErrorMessagingComponent,
    LoadingComponent,
    MatDatePickerComponent,
    SuccessMessagingComponent,
    YesNoDialogComponent,
    CurrencyCommaPipe,
    CurrencyCommaInputDirective,
    NumberCommaPipe,
    NumberCommaInputDirective
  ]
})
export class CoreModule {}
