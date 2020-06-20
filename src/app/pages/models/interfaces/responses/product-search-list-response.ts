import { BaseSearchListResponseDto } from './base-search-list-response';
import { ProductSearchResponseDto } from './product-search-response';

export interface ProductSearchListResponseDto extends BaseSearchListResponseDto {
  productSearchResponseDtos: ProductSearchResponseDto[];
}
