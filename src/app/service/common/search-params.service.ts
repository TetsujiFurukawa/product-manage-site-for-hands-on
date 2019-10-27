import { Injectable } from '@angular/core';
import { SessionStrageService } from './session-strage.service';
import { ProductListingSearchParams } from 'src/app/entity/product-listing-search-params';
import { AppConst } from 'src/app/const/app-const';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {

  constructor(
  ) { }

  setProductListingSearchParam(productListingSearchParams: ProductListingSearchParams): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParams);
  }

  getProductListingSearchParam(productListingSearchParams: ProductListingSearchParams): ProductListingSearchParams {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParams);
  }

  removeProductListingSearchParam(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }

}
