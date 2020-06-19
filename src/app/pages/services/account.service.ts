import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';
import { AppConst } from 'src/app/pages/constants/app-const';
import { User } from 'src/app/pages/models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SessionStrageService } from '../../core/services/session-strage.service';
import { SignInRequest } from '../models/interfaces/requests/sign-in-request';
import { MenuListResponse } from '../models/interfaces/responses/menu-list-response';
import { SignInResponse } from '../models/interfaces/responses/sign-in-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private errorMessageService: ErrorMessagingService) {}

  /**
   * Signs in
   * @param SignInRequest sign in request
   * @returns sign in response
   */
  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(signInRequest.Username + ':' + signInRequest.Password)
    });

    return this.http
      .post<SignInResponse>(webApiUrl, signInRequest, { headers })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as SignInResponse);
        })
      );
  }

  /**
   * Gets menu
   * @returns menu response
   */
  getMenu(): Observable<MenuListResponse[]> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_MENU;

    return this.http.get<MenuListResponse[]>(webApiUrl).pipe(
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as MenuListResponse[]);
      })
    );
  }

  /**
   * Gets available pages
   * @returns available pages response
   */
  getAvailablePages(): Observable<string[]> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_AVAILABLE_PAGES;

    return this.http.get<string[]>(webApiUrl).pipe(
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as string[]);
      })
    );
  }

  /**
   * Signs out
   * @returns nothing
   */
  signOut(): Observable<void> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_OUT;
    return this.http.post(webApiUrl, {}).pipe(
      map((res) => {
        this.removeUser();
        return;
      })
    );
  }

  /**
   * Gets user
   * @returns user informations from session strage
   */
  getUser(): User {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_USER, new User());
  }

  /**
   * Sets user
   * @param user infomatios to save session strage
   */
  setUser(user: User): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_USER, user);
  }

  /**
   * Removes user
   */
  removeUser(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_USER);
  }
}
