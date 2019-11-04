import { Observable } from 'rxjs';
import { ProductListresponseDto } from 'src/app/entity/dto/response/product-listresponse-dto';
import { ProductListingSearchParams } from 'src/app/entity/product-listing-search-params';

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductService } from '../common/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListingPageService {
  constructor(
    private productService: ProductService
  ) { }

  getProductList(productListingSearchParams: ProductListingSearchParams): Observable<ProductListresponseDto> {
    return this.productService.getProductList(this.createHttpParams(productListingSearchParams));
  }

  private createHttpParams(productListingSearchParams: ProductListingSearchParams) {
    const conditions = {
      productName: productListingSearchParams.productName,
      productCode: productListingSearchParams.productCode,
      productGenre: productListingSearchParams.productGenre,
      endOfSale: productListingSearchParams.endOfSale,
      pageSize: productListingSearchParams.pageSize,
      pageIndex: productListingSearchParams.pageIndex
    };
    const paramsOptions = { fromObject: conditions } as any;
    const params = new HttpParams(paramsOptions);
    return params;
  }
}
