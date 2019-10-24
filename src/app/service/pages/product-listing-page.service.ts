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

  createHttpParams(productName: string, productCode: string, productGenre: string, endOfSale: string, pageSize: number, pageIndex: number) {
    const conditions = {
      productName,
      productCode,
      productGenre,
      endOfSale,
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString()
    };
    const paramsOptions = { fromObject: conditions };
    const params = new HttpParams(paramsOptions);
    return params;
  }

  getProductList(httpParams: HttpParams): Observable<ProductListresponseDto> {
    return this.productService.getProductList(httpParams);
  }

  onRowClicked(productResponseDto: ProductResponseDto) {
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);

  }
}
