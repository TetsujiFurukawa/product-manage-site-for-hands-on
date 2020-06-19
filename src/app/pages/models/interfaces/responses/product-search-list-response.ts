import { BaseSearchListResponse } from './base-search-list-response';
import { ProductSearchResponse } from './product-search-response';

export interface ProductSearchListResponse extends BaseSearchListResponse {
  productSearchResponses: ProductSearchResponse[];
}
