import { Injectable } from '@angular/core';

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
  }

  public clearMessage(): void {
    this.message = '';
  }

}
