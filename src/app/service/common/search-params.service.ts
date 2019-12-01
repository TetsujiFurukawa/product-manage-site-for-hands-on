import { Injectable } from '@angular/core';
import { SessionStrageService } from './session-strage.service';
import { ProductListingSearchParams } from 'src/app/entity/dto/request/product-listing-search-params';
import { AppConst } from 'src/app/const/app-const';
import { PurchaseHistoryListingSearchParams } from 'src/app/entity/dto/request/purchase-history-listing-search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {

  constructor(
  ) { }

  /** Product */
  setProductListingSearchParam(productListingSearchParams: ProductListingSearchParams): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParams);
  }

  getProductListingSearchParam(productListingSearchParams: ProductListingSearchParams): ProductListingSearchParams {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParams);
  }

  removeProductListingSearchParam(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }

  /** Purchase history */
  setPurchaseHistoryListingSearchParam(purchaseHistoryListingSearchParams: PurchaseHistoryListingSearchParams): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PURCHASE_HISTORY_LIST, purchaseHistoryListingSearchParams);
  }

  getPurchaseHistoryListingSearchParam(purchaseHistoryListingSearchParams: PurchaseHistoryListingSearchParams)
    : PurchaseHistoryListingSearchParams {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PURCHASE_HISTORY_LIST, purchaseHistoryListingSearchParams);
  }

  removePurchaseHistoryListingSearchParam(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PURCHASE_HISTORY_LIST);
  }
}
