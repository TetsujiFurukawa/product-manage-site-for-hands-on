import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SuccessMessagingService } from './success-messaging.service';
import { ErrorMessagingService } from './error-messaging.service';
import { UrlConst } from 'src/app/const/url-const';
import { PurchaseHistorySearchListResponseDto } from 'src/app/entity/dto/response/purchase-history-search-list-response-dto';
import { PurchaseDto } from 'src/app/entity/dto/purchase-dto';

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

    const webApiUrl = UrlConst.PATH_API_FOLDER + UrlConst.PATH_PURCHASE_HISTORY_LISTING;
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
