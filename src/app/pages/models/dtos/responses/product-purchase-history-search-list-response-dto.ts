import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { ProductPurchaseHistorySearchResponseDto } from './product-purchase-history-search-response-dto';

export class ProductPurchaseHistorySearchListResponseDto extends BaseSearchListResponseDto {

    productPurchaseHistorySearchResponseDtos: ProductPurchaseHistorySearchResponseDto[];

}
