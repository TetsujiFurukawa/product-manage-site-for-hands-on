import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

// 他言語化の設定
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    SidenavComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
