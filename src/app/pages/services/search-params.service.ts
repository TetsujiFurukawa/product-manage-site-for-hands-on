import { AppConst } from 'src/app/pages/constants/app-const';

import { Injectable } from '@angular/core';

import { SessionStrageService } from '../../core/services/session-strage.service';
import {
    ProductListingSearchParamsDto
} from '../models/dtos/requests/product-listing-search-params-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  constructor() {}

  /** Product */
  setProductListingSearchParam(productListingSearchParamsDto: ProductListingSearchParamsDto): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParamsDto);
  }

  getProductListingSearchParam(
    productListingSearchParamsDto: ProductListingSearchParamsDto
  ): ProductListingSearchParamsDto {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParamsDto);
  }

  removeProductListingSearchParam(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }
}
