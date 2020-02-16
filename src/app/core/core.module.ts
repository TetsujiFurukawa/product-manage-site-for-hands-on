import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeJa from '@angular/common/locales/ja';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaterialModule } from '../material/material.module';
import { ErrorMessagingComponent } from './components/error-messaging/error-messaging.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatDatePickerComponent } from './components/mat-date-picker/mat-date-picker.component';
import {
    SuccessMessagingComponent
} from './components/success-messaging/success-messaging.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { FormattedCurrencyInputDirective } from './directives/formatted-currency-input.directive';
import { FormattedNumberInputDirective } from './directives/formatted-number-input.directive';
import { HttpXsrfInterceptor } from './interceptors/http-xsrf-interceptor';
import { XhrInterceptor } from './interceptors/xhr-interceptor';
import { FormattedCurrencyPipe } from './pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from './pipes/formatted-number.pipe';

// 他言語化の設定
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeJa);
registerLocaleData(localeFr);
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    ErrorMessagingComponent,
    LoadingComponent,
    MatDatePickerComponent,
    SuccessMessagingComponent,
    YesNoDialogComponent,
    FormattedCurrencyPipe,
    FormattedCurrencyInputDirective,
    FormattedNumberPipe,
    FormattedNumberInputDirective
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
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    CurrencyPipe,
    FormattedCurrencyPipe,
    FormattedNumberPipe
  ],
  entryComponents: [YesNoDialogComponent],
  exports: [
    ErrorMessagingComponent,
    LoadingComponent,
    MatDatePickerComponent,
    SuccessMessagingComponent,
    YesNoDialogComponent,
    FormattedCurrencyPipe,
    FormattedCurrencyInputDirective,
    FormattedNumberPipe,
    FormattedNumberInputDirective
  ]
})
export class CoreModule {}
