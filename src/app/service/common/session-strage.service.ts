import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStrageService {

  constructor() { }

  public static setItem<T>(key: string, t: T): void {
    sessionStorage.setItem(key, JSON.stringify(t));
  }

  public static getItem<T>(key: string, t: T): T {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

}
