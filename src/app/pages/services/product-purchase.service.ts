import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import {
    ProductPurchaseRequestDto
} from 'src/app/pages/models/dtos/requests/product-purchase-request-dto';
import {
    ProductPurchaseHistorySearchListResponseDto
} from 'src/app/pages/models/dtos/responses/product-purchase-history-search-list-response-dto';
import {
    ProductPurchaseResponseDto
} from 'src/app/pages/models/dtos/responses/product-purchase-response-dto';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {
  constructor(private http: HttpClient, private successMessagingService: SuccessMessagingService, private errorMessageService: ErrorMessagingService) {}

  /**
   * Gets product purchase history list
   * @param httpParams search params
   * @returns product purchase history list
   */
  getProductPurchaseHistoryList(httpParams: HttpParams): Observable<ProductPurchaseHistorySearchListResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;
    this.clearMessageProperty();

    return this.http
      .get<ProductPurchaseHistorySearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
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
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http
      .get<ProductPurchaseResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
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
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.post<ProductPurchaseResponseDto>(webApiUrl, productPurchaseRequestDto).pipe(
      map(res => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError(error => {
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