import { Injectable } from '@angular/core';

const INTERVAL_TIME = 8000;

@Injectable({
  providedIn: 'root'
})
export class SuccessMessagingService {

  private message: string;

  constructor() { }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
    this.hideStart();
  }

  public clearMessage(): void {
    this.message = '';
  }

  public hideStart() {
    setTimeout(() => {
      this.clearMessage();
    }, INTERVAL_TIME);
  }

}
