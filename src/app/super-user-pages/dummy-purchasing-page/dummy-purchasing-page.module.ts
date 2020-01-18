import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/utils/material/material.module';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeJa from '@angular/common/locales/ja';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DummyPurchasingPageRoutingModule } from './dummy-purchasing-page-routing.module';
import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

// 他言語化の設定
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeJa);
@NgModule({
  declarations: [DummyPurchasingPageComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    SharedModule,
    CommonModule,
    DummyPurchasingPageRoutingModule
  ],
  providers: [
    // The locale to use for this system
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  exports: [DummyPurchasingPageComponent]
})
export class DummyPurchasingPageModule {}
