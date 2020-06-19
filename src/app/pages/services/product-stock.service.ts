import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';
import { ProductStockRequest } from '../models/interfaces/requests/product-stock-request';
import { ProductStockResponse } from '../models/interfaces/responses/product-stock-response';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {
  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) {}

  /**
   * Gets product stock
   * @param productCode  product code
   * @returns product stock response
   */
  getProductStock(productCode: string): Observable<ProductStockResponse> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http
      .get<ProductStockResponse>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductStockResponse);
        })
      );
  }

  /**
   * Updates product stock
   * @param productStockRequest product Stock request
   * @returns product stock response
   */
  updateProductStock(productStockRequest: ProductStockRequest): Observable<ProductStockResponse> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http.put<ProductStockResponse>(webApiUrl, productStockRequest).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductStockResponse);
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
