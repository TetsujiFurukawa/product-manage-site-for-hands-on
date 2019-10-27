import { Injectable, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { ProductListresponseDto } from 'src/app/entity/dto/response/product-listresponse-dto';
import { merge, of, Observable } from 'rxjs';
import { startWith, switchMap, catchError, map } from 'rxjs/operators';
import { ProductService } from '../common/product.service';
import { Router } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { ProductListingSearchParams } from 'src/app/entity/product-listing-search-params';

@Injectable({
  providedIn: 'root'
})
export class ProductListingPageService {
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onNew() {

    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING]);

  }

  getProductList(productListingSearchParams: ProductListingSearchParams): Observable<ProductListresponseDto> {
    return this.productService.getProductList(this.createHttpParams(productListingSearchParams));
  }

  onRowClicked(productResponseDto: ProductResponseDto) {
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);

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
