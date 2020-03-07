import { CommonModule, CurrencyPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
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
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, NgxTranslateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
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
