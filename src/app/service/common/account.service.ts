import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConst } from 'src/app/const/app-const';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ErrorMessagingService } from './error-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private server = environment.production ? AppConst.URL_PROD_SERVER : AppConst.URL_DEV_SERVER;

  constructor(
    private http: HttpClient,
    private errorMessageService: ErrorMessagingService,
    private readonly translateService: TranslateService
  ) { }

  public signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = this.server + UrlConst.URL_SIGN_IN;

    return this.http.post<SignInResponseDto>(webApiUrl, signInRequestDto)
      .pipe(
        catchError(error => {
          // this.errorMessageService.add(this.translateService.instant('errMessage.http'));
          return of(null as SignInResponseDto);
        })
      );
  }
}
