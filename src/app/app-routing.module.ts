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

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'product-listing', component: ProductListingPageComponent },
  { path: 'product-registering', component: ProductRegisteringPageComponent },
  { path: 'purchase-history-Listing', component: PurchaseHistoryListingPageComponent },
  { path: 'stock-registering', component: StockRegisteringPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
