import { CommonModule, CurrencyPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../app.module';
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
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
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
