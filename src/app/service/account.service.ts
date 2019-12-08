import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConst } from 'src/app/const/api-const';
import { AppConst } from 'src/app/const/app-const';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { User } from 'src/app/entity/user';
import { ErrorMessagingService } from './common/error-messaging.service';
import { SessionStrageService } from './common/session-strage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private errorMessageService: ErrorMessagingService,
  ) { }

  public signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_IN;

    const headers = new HttpHeaders(signInRequestDto ? {
      authorization: 'Basic ' + btoa(signInRequestDto.Username + ':' + signInRequestDto.Password)
    } : {});

    return this.http.post<SignInResponseDto>(webApiUrl, signInRequestDto, { headers })
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as SignInResponseDto);
        })
      );
  }

  public getMenu(): Observable<MenuListResponseDto[]> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_MENU;

    return this.http.get<MenuListResponseDto[]>(webApiUrl)
      .pipe(
        catchError(error => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as MenuListResponseDto[]);
        })
      );
  }

  public getUser(): User {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_USER, new User());
  }

  public setUser(user: User): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_USER, user);
  }

  public removeUser(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_USER);
  }

  signOut(): Observable<any> {
    const webApiUrl = UrlConst.PATH_API_FOLDER + ApiConst.PATH_SIGN_OUT;
    return this.http.post(webApiUrl, {}).pipe(
      map(res => {
        this.removeUser();
        return res;
      })
    );
  }

}
