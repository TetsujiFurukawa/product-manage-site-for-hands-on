import { AppConst } from 'src/app/pages/constants/app-const';

import { Injectable } from '@angular/core';

import { SessionStrageService } from '../../core/services/session-strage.service';
import {
    ProductListingSearchParams
} from '../models/interfaces/requests/product-listing-search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  constructor() {}

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
}
