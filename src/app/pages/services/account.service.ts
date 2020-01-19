import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/pages/constants/api-const';
import { AppConst } from 'src/app/pages/constants/app-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { SignInRequestDto } from 'src/app/pages/models/dtos/requests/sign-in-request-dto';
import { MenuListResponseDto } from 'src/app/pages/models/dtos/responses/menu-list-response-dto';
import { SignInResponseDto } from 'src/app/pages/models/dtos/responses/sign-in-response-dto';
import { User } from 'src/app/pages/models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorMessagingService } from '../../core/services/error-messaging.service';
import { SessionStrageService } from '../../core/services/session-strage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private errorMessageService: ErrorMessagingService) {}

  /**
   * Signs in
   * @param signInRequestDto sign in request
   * @returns sign in response
   */
  signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(signInRequestDto.Username + ':' + signInRequestDto.Password)
    });

    return this.http
      .post<SignInResponseDto>(webApiUrl, signInRequestDto, { headers })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as SignInResponseDto);
        })
      );
  }

  /**
   * Gets menu
   * @returns menu response
   */
  getMenu(): Observable<MenuListResponseDto[]> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_MENU;

    return this.http.get<MenuListResponseDto[]>(webApiUrl).pipe(
      catchError(error => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as MenuListResponseDto[]);
      })
    );
  }

  /**
   * Signs out
   * @returns nothing
   */
  signOut(): Observable<void> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_OUT;
    return this.http.post(webApiUrl, {}).pipe(
      map(res => {
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