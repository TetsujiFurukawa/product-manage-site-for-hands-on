import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';
import {
    ProductStockRequestDto
} from 'src/app/pages/models/dtos/requests/product-stock-request-dto';
import {
    ProductStockResponseDto
} from 'src/app/pages/models/dtos/responses/product-stock-response-dto';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SuccessMessagingService } from '../../core/services/success-messaging.service';

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
  getProductStock(productCode: string): Observable<ProductStockResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http
      .get<ProductStockResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductStockResponseDto);
        })
      );
  }

  /**
   * Updates product stock
   * @param productStockRequestDto product Stock request
   * @returns product stock response
   */
  updateProductStock(productStockRequestDto: ProductStockRequestDto): Observable<ProductStockResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http.put<ProductStockResponseDto>(webApiUrl, productStockRequestDto).pipe(
      map(res => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError(error => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductStockResponseDto);
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
