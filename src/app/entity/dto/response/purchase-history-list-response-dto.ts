import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { PurchaseHistoryResponseDto } from './purchase-history-response-dto';

export class PurchaseHistoryListResponseDto extends BaseSearchListResponseDto {

    purchaseHistoryResponseDtos: PurchaseHistoryResponseDto[];

}
