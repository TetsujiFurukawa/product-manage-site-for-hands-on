import { Injectable } from '@angular/core';

const INTERVAL_TIME = 5000;

@Injectable({
  providedIn: 'root'
})
export class SuccessMessagingService {
  private messageProperty: string;

  constructor() {}

  public getMessageProperty(): string {
    return this.messageProperty;
  }

  public setMessageProperty(message: string): void {
    this.messageProperty = message;
    this.hideStart();
  }

  public clearMessageProperty(): void {
    this.messageProperty = '';
  }

  public hideStart() {
    setTimeout(() => {
      this.clearMessageProperty();
    }, INTERVAL_TIME);
  }
}
