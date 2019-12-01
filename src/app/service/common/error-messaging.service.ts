import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagingService {
  private messageProperty: string;

  constructor() { }

  public getMessageProperty(): string {
    return this.messageProperty;
  }

  public setMessageProperty(message: string): void {
    this.messageProperty = message;
  }

  public clearMessageProperty(): void {
    this.messageProperty = '';
  }

  public setupPageErrorMessageFromResponse(error: any) {
    switch (error.status) {
      case 400:
        this.setMessageProperty('errMessage.http.badRequest');
        break;
      case 401:
        this.setMessageProperty('errMessage.http.unAuthorized');
        break;
      case 404:
        this.setMessageProperty('errMessage.http.notFound');
        break;
      case 500:
        if ('Duplicated key.' === error.error.message) {
          this.setMessageProperty('errMessage.http.duplicateKeyException');
        } else if ('Exclusive error occurred.' === error.error.message) {
          this.setMessageProperty('errMessage.http.exclusiveProcessingException');
        } else if ('There is no stock.' === error.error.message) {
          this.setMessageProperty('errMessage.http.outOfStockException');
        } else {
          this.setMessageProperty('errMessage.http.internalServerError');
        }
        break;
      default:
        this.setMessageProperty('errMessage.http.GenericError');
        break;
    }
  }

}
