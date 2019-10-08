import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagingService {

  private errorMessage: string;

  constructor() { }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public clearErrorMessage(): void {
    this.errorMessage = '';
  }

}
