import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { FormattedCurrencyPipe } from '../core/pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from '../core/pipes/formatted-number.pipe';
import { MatPaginatorI18nService } from '../core/services/mat-paginator-i18n.service';
import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListingPageComponent } from './components/product-listing-page/product-listing-page.component';
import { ProductRegisteringPageComponent } from './components/product-registering-page/product-registering-page.component';
import { PurchaseHistoryListingPageComponent } from './components/purchase-history-listing-page/purchase-history-listing-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { StockRegisteringPageComponent } from './components/stock-registering-page/stock-registering-page.component';

@NgModule({
  declarations: [
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
    SignInPageComponent,
    StockRegisteringPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgxUpperCaseDirectiveModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    SharedModule,
    NgxTranslateModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService },
    FormattedCurrencyPipe,
    FormattedNumberPipe
  ],
  exports: [
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
    SignInPageComponent,
    StockRegisteringPageComponent
  ]
})
export class PagesModule {}
