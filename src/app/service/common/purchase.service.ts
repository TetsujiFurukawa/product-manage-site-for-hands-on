import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConst } from 'src/app/const/api-const';
import { UrlConst } from 'src/app/const/url-const';
import { PurchaseDto } from 'src/app/entity/dto/purchase-dto';
import {
  PurchaseHistorySearchListResponseDto
} from 'src/app/entity/dto/response/purchase-history-search-list-response-dto';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from './error-messaging.service';
import { SuccessMessagingService } from './success-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  createPurchase(purchaseDto: PurchaseDto): Observable<any> {
    throw new Error("Method not implemented.");
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

  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }
}
