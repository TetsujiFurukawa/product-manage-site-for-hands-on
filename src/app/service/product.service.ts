import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/const/api-const';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import {
    ProductSearchListResponseDto
} from 'src/app/entity/dto/response/product-search-list-response-dto';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from './common/error-messaging.service';
import { SuccessMessagingService } from './common/success-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) {}

  /**
   * Gets product list
   * @param httpParams search params
   * @returns product search response
   */
  getProductList(httpParams: HttpParams): Observable<ProductSearchListResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PRODUCT_SEARCH;
    this.clearMessageProperty();

    return this.http
      .get<ProductSearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductSearchListResponseDto);
        })
      );
  }

  /**
   * Gets product
   * @param productCode product code
   * @returns product response
   */
  getProduct(productCode: string): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http
      .get<ProductDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductDto);
        })
      );
  }

  /**
   * Creates product
   * @param productDto product request
   * @returns producr response
   */
  createProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.post<ProductDto>(webApiUrl, productDto).pipe(
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

  /**
   * Updates product
   * @param productDto  product request
   * @returns producr response
   */
  updateProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.put<ProductDto>(webApiUrl, productDto).pipe(
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

  /**
   * Gets genres
   * @returns genres
   */
  getGenres(): Observable<number[]> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_GENRE;
    this.clearMessageProperty();

    return this.http.get<number[]>(webApiUrl).pipe(
      catchError(error => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as number[]);
      })
    );
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }
}
