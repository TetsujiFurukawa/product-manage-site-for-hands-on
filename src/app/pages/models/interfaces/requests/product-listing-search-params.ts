import { Optional } from '@angular/core';

import { BaseSearchParamsDto } from './base-search-params';

export interface ProductListingSearchParamsDto extends BaseSearchParamsDto {
  productName: string;
  productCode: string;
  productGenre: string;
  endOfSale: boolean;
}
