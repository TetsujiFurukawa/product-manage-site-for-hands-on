import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { ProductSearchResponseDto } from './product-search-response-dto';

export class ProductSearchListResponseDto extends BaseSearchListResponseDto {
  productSearchResponseDtos: ProductSearchResponseDto[];
}
