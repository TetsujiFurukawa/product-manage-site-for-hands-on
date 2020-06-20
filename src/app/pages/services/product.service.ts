import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';
import { Product } from 'src/app/pages/models/interfaces/product';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import {
    ProductSearchListResponseDto
} from '../models/interfaces/responses/product-search-list-response';

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
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT_SEARCH;
    this.clearMessageProperty();

    return this.http
      .get<ProductSearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError((error) => {
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
  getProduct(productCode: string): Observable<Product> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http
      .get<Product>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as Product);
        })
      );
  }

  /**
   * Creates product
   * @param product product request
   * @returns producr response
   */
  createProduct(product: Product): Observable<Product> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.post<Product>(webApiUrl, product).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as Product);
      })
    );
  }

  /**
   * Updates product
   * @param product  product request
   * @returns producr response
   */
  updateProduct(product: Product): Observable<Product> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.put<Product>(webApiUrl, product).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as Product);
      })
    );
  }

  /**
   * Gets genres
   * @returns genres
   */
  getGenres(): Observable<string[]> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_GENRE;
    this.clearMessageProperty();

    return this.http.get<string[]>(webApiUrl).pipe(
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as string[]);
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
