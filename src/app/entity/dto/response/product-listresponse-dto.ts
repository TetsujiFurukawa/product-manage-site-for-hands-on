import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { ProductResponseDto } from './product-response-dto';

export class ProductListresponseDto extends BaseSearchListResponseDto {

  productResponseDto: ProductResponseDto[];

}
