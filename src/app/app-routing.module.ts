import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { UrlConst } from './const/url-const';

const routes: Routes = [
  { path: '', redirectTo: '/' + UrlConst.PATH_SIGN_IN, pathMatch: 'full' },
  { path: UrlConst.PATH_SIGN_IN, component: SignInPageComponent },
  { path: UrlConst.PATH_PRODUCT_LISTING, component: ProductListingPageComponent },
  { path: UrlConst.PATH_PRODUCT_REGISTERING, component: ProductRegisteringPageComponent },
  { path: UrlConst.PATH_PURCHASE_HISTORY_LISTING, component: PurchaseHistoryListingPageComponent },
  { path: UrlConst.PATH_STOCK_REGISTERING, component: StockRegisteringPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
