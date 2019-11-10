import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductListresponseDto } from 'src/app/entity/dto/response/product-listresponse-dto';
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

  getProductList(httpParams: HttpParams): Observable<ProductListresponseDto> {

    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_LISTING;
    this.errorMessageService.clearMessage();

    return this.http.get<ProductListresponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductListresponseDto);
        })
      );

  }

  getProduct(productCode: string): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.errorMessageService.clearMessage();

    return this.http.get<ProductDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }

  createProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.errorMessageService.clearMessage();

    return this.http.post<ProductDto>(webApiUrl, productDto)
      .pipe(
        map(res => {
          this.successMessagingService.setMessage(this.translateService.instant('successMessage.http'));
          return res;
        }),
        catchError(error => {
          this.errorMessageService.setMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }

  updateProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PRODUCT_REGISTERING;
    this.errorMessageService.clearMessage();

    return this.http.put<ProductDto>(webApiUrl, productDto)
      .pipe(
        map(res => {
          this.successMessagingService.setMessage(this.translateService.instant('successMessage.http'));
          return res;
        }),
        catchError(error => {
          this.errorMessageService.setMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }
}
