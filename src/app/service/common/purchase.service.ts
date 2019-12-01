import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/const/api-const';
import { UrlConst } from 'src/app/const/url-const';
import { PurchaseRequestDto } from 'src/app/entity/dto/request/purchase-request-dto';
import {
  PurchaseHistorySearchListResponseDto
} from 'src/app/entity/dto/response/purchase-history-search-list-response-dto';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from './error-messaging.service';
import { SuccessMessagingService } from './success-messaging.service';
import { PurchaseResponseDto } from 'src/app/entity/dto/response/purchase-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  createPurchase(purchaseDto: PurchaseRequestDto): Observable<PurchaseResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.post<PurchaseResponseDto>(webApiUrl, purchaseDto)
      .pipe(
        map(res => {
          this.successMessagingService.setMessageProperty('successMessage.http');
          return res;
        }),
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as PurchaseResponseDto);
        })
      );

  }

  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) { }

  getPurchaseHistoryList(httpParams: HttpParams): Observable<PurchaseHistorySearchListResponseDto> {

    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE_HISTORY_SEARCH;
    this.clearMessageProperty();

    return this.http.get<PurchaseHistorySearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as PurchaseHistorySearchListResponseDto);
        })
      );

  }

  getPurchase(productCode: string): Observable<PurchaseResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_PURCHASE;
    this.clearMessageProperty();

    return this.http.get<PurchaseResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as PurchaseResponseDto);
        })
      );
  }

  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }
}
