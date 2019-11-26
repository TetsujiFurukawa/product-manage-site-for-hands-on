import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { PurchaseHistorySearchResponseDto } from './purchase-history-search-response-dto';

export class PurchaseHistorySearchListResponseDto extends BaseSearchListResponseDto {

    purchaseHistorySearchResponseDtos: PurchaseHistorySearchResponseDto[];

}
