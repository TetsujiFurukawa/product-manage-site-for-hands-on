import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { HeaderComponent } from './component/common/header/header.component';
import {
  DummyPurchasingPageComponent
} from './component/pages/dummy-purchasing-page/dummy-purchasing-page.component';
import {
  ProductListingComponent
} from './component/pages/product-listing/product-listing.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInPageComponent,
    ProductListingComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
    DummyPurchasingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
