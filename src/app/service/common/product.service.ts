import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductSearchListResponseDto } from 'src/app/entity/dto/response/product-search-list-response-dto';
import { catchError, map } from 'rxjs/operators';
import { ErrorMessagingService } from './error-messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { LoadingService } from './loading.service';
import { SuccessMessagingService } from './success-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService,
    private readonly translateService: TranslateService,
  ) { }

  getProductList(httpParams: HttpParams): Observable<ProductSearchListResponseDto> {

    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_LISTING;
    this.clearMessageProperty();

    return this.http.get<ProductSearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductSearchListResponseDto);
        })
      );

  }

  getProduct(productCode: string): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.clearMessageProperty();

    return this.http.get<ProductDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductDto);
        })
      );
  }

  createProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.clearMessageProperty();

    return this.http.post<ProductDto>(webApiUrl, productDto)
      .pipe(
        map(res => {
          this.successMessagingService.setMessageProperty('successMessage.http');
          return res;
        }),
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductDto);
        })
      );
  }

  updateProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.clearMessageProperty();

    return this.http.put<ProductDto>(webApiUrl, productDto)
      .pipe(
        map(res => {
          this.successMessagingService.setMessageProperty('successMessage.http');
          return res;
        }),
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductDto);
        })
      );
  }

  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }

}
