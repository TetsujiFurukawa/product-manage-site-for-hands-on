import { BaseSearchListResponseDto } from './base-search-list-response';
import {
    ProductPurchaseHistorySearchResponseDto
} from './product-purchase-history-search-response';

export interface ProductPurchaseHistorySearchListResponseDto extends BaseSearchListResponseDto {
  productPurchaseHistorySearchResponseDtos: ProductPurchaseHistorySearchResponseDto[];
}
