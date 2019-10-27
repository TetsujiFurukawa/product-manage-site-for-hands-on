import { BaseSearchParams } from './base-search-params';
import { Optional } from '@angular/core';

export class ProductListingSearchParams extends BaseSearchParams {

  productName: string;
  productCode: string;
  productGenre: string;
  endOfSale: boolean;

}
