import { BaseSearchListResponse } from './base-search-list-response';
import { ProductSearchResponse } from './product-search-response';

export class ProductSearchListResponse extends BaseSearchListResponse {
  productSearchResponses: ProductSearchResponse[];
}
