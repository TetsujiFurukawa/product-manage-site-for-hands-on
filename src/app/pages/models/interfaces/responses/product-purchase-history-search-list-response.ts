import { BaseSearchListResponse } from './base-search-list-response';
import { ProductPurchaseHistorySearchResponse } from './product-purchase-history-search-response';

export interface ProductPurchaseHistorySearchListResponse extends BaseSearchListResponse {
  productPurchaseHistorySearchResponses: ProductPurchaseHistorySearchResponse[];
}
