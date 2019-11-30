import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConst } from 'src/app/const/app-const';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ErrorMessagingService } from './error-messaging.service';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { SessionStrageService } from './session-strage.service';
import { User } from 'src/app/entity/user';
import { ApiConst } from 'src/app/const/api-const';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private server = environment.production ? AppConst.URL_PROD_SERVER : AppConst.URL_DEV_SERVER;

  constructor(
    private http: HttpClient,
    private errorMessageService: ErrorMessagingService,
    private readonly translateService: TranslateService,
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

}
