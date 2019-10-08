import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private message: string;

  constructor() { }

  public setMessage(message: string): void {
    this.message = message;
  }

}
