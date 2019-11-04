import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductListresponseDto } from 'src/app/entity/dto/response/product-listresponse-dto';
import { environment } from 'src/environments/environment';
import { AppConst } from 'src/app/const/app-const';
import { catchError } from 'rxjs/operators';
import { ErrorMessagingService } from './error-messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private server = environment.production ? AppConst.URL_PROD_SERVER : AppConst.URL_DEV_SERVER;

  constructor(
    private http: HttpClient,
    private errorMessageService: ErrorMessagingService,
    private readonly translateService: TranslateService,
    private loadingService: LoadingService,

  ) { }

  getProductList(httpParams: HttpParams): Observable<ProductListresponseDto> {

    const webApiUrl = this.server + UrlConst.PATH_PRODUCT_LISTING;

    return this.http.get<ProductListresponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setErrorMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductListresponseDto);
        })
      );

  }

  getProduct(productCode: string): Observable<ProductDto> {
    const webApiUrl = this.server + UrlConst.PATH_PRODUCT_REGISTERING;

    return this.http.get<ProductDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setErrorMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }

  createProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = this.server + UrlConst.PATH_PRODUCT_REGISTERING;

    return this.http.post<ProductDto>(webApiUrl, productDto)
      .pipe(
        catchError(error => {
          this.errorMessageService.setErrorMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }

  updateProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = this.server + UrlConst.PATH_PRODUCT_REGISTERING;

    return this.http.put<ProductDto>(webApiUrl, productDto)
      .pipe(
        catchError(error => {
          this.errorMessageService.setErrorMessage(this.translateService.instant('errMessage.http'));
          return of(null as ProductDto);
        })
      );
  }
}
