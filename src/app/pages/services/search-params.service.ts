import { AppConst } from 'src/app/pages/constants/app-const';

import { Injectable } from '@angular/core';

import { SessionStorageService } from '../../core/services/session-storage.service';
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
    SessionStorageService.setItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParamsDto);
  }

  getProductListingSearchParam(
    productListingSearchParamsDto: ProductListingSearchParamsDto
  ): ProductListingSearchParamsDto {
    return SessionStorageService.getItem(
      AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST,
      productListingSearchParamsDto
    );
  }

  removeProductListingSearchParam(): void {
    SessionStorageService.removeItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }
}
