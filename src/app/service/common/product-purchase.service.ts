import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/const/api-const';
import { UrlConst } from 'src/app/const/url-const';
import { ProductPurchaseRequestDto } from 'src/app/entity/dto/request/product-purchase-request-dto';
import {
  ProductPurchaseHistorySearchListResponseDto
} from 'src/app/entity/dto/response/product-purchase-history-search-list-response-dto';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from './error-messaging.service';
import { SuccessMessagingService } from './success-messaging.service';
import { ProductPurchaseResponseDto } from 'src/app/entity/dto/response/product-purchase-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {

  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) { }

  getProductPurchaseHistoryList(httpParams: HttpParams): Observable<ProductPurchaseHistorySearchListResponseDto> {

    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;
    this.clearMessageProperty();

    return this.http.get<ProductPurchaseHistorySearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductPurchaseHistorySearchListResponseDto);
        })
      );

  }

  getProductPurchase(productCode: string): Observable<ProductPurchaseResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.get<ProductPurchaseResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductPurchaseResponseDto);
        })
      );
  }

  createProductPurchase(productPurchaseRequestDto: ProductPurchaseRequestDto): Observable<ProductPurchaseResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.post<ProductPurchaseResponseDto>(webApiUrl, productPurchaseRequestDto)
      .pipe(
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

  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }

}
