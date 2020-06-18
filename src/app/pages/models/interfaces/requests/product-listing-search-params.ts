import { Optional } from '@angular/core';

import { BaseSearchParams } from './base-search-params';

export interface ProductListingSearchParams extends BaseSearchParams {
  productName: string;
  productCode: string;
  productGenre: string;
  endOfSale: boolean;
}
