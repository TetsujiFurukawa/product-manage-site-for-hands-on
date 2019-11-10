import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagingService {

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
