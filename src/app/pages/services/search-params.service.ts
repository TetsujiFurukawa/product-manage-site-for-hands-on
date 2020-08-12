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

  /**
   * Sets product listing search params
   * @param productListingSearchParamsDto product listing search params
   */
  setProductListingSearchParamsDto(productListingSearchParamsDto: ProductListingSearchParamsDto): void {
    SessionStorageService.setItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParamsDto);
  }

  /**
   * Gets product listing search params
   * @param productListingSearchParamsDto product listing search params
   * @returns product listing search params
   */
  getProductListingSearchParamsDto(
    productListingSearchParamsDto: ProductListingSearchParamsDto
  ): ProductListingSearchParamsDto {
    return SessionStorageService.getItem(
      AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST,
      productListingSearchParamsDto
    );
  }

  /**
   * Removes product listing search params
   */
  removeProductListingSearchParamsDto(): void {
    SessionStorageService.removeItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }
}
