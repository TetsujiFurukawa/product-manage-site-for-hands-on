import { Injectable } from '@angular/core';
import { ErrorMessagingService } from './common/error-messaging.service';
import { UrlConst } from 'src/app/const/url-const';
import { ApiConst } from 'src/app/const/api-const';
import { ProductStockResponseDto } from 'src/app/entity/dto/response/product-stock-response-dto';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductStockRequestDto } from 'src/app/entity/dto/request/product-stock-request-dto';
import { SuccessMessagingService } from './common/success-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) { }

  getProductStock(productCode: string): Observable<ProductStockResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http.get<ProductStockResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductStockResponseDto);
        })
      );
  }

  updateProductStock(productStockRequestDto: ProductStockRequestDto): Observable<ProductStockResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http.put<ProductStockResponseDto>(webApiUrl, productStockRequestDto)
      .pipe(
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

  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }

}
