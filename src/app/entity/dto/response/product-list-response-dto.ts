import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { ProductResponseDto } from './product-response-dto';

export class ProductListResponseDto extends BaseSearchListResponseDto {

  productResponseDtos: ProductResponseDto[];

}
