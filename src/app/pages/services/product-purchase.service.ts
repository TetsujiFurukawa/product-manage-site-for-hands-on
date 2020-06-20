import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ProductPurchaseRequestDto } from '../models/interfaces/requests/product-purchase-request';
import {
    ProductPurchaseHistorySearchListResponseDto
} from '../models/interfaces/responses/product-purchase-history-search-list-response';
import {
    ProductPurchaseResponseDto
} from '../models/interfaces/responses/product-purchase-response';

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {
  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) {}

  /**
   * Gets product purchase history list
   * @param httpParams search params
   * @returns product purchase history list
   */
  getProductPurchaseHistoryList(httpParams: HttpParams): Observable<ProductPurchaseHistorySearchListResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;
    this.clearMessageProperty();

    return this.http
      .get<ProductPurchaseHistorySearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductPurchaseHistorySearchListResponseDto);
        })
      );
  }

  /**
   * Gets product purchase
   * @param productCode product code
   * @returns product purchase response
   */
  getProductPurchase(productCode: string): Observable<ProductPurchaseResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http
      .get<ProductPurchaseResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductPurchaseResponseDto);
        })
      );
  }

  /**
   * Creates product purchase
   * @param productPurchaseRequestDto product purchase request
   * @returns product purchase response
   */
  createProductPurchase(productPurchaseRequestDto: ProductPurchaseRequestDto): Observable<ProductPurchaseResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.post<ProductPurchaseResponseDto>(webApiUrl, productPurchaseRequestDto).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductPurchaseResponseDto);
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
