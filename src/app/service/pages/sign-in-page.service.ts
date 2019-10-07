import { Injectable } from '@angular/core';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { AccountService } from '../common/account.service';
import { RoutingService } from '../common/routing.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UrlConst } from 'src/app/const/url-const';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInPageService {
  constructor(

    // private http: HttpClient,
    private accountService: AccountService,
    private routingService: RoutingService

  ) { }

  signIn(signInRequestDto: SignInRequestDto) {

    // Sign in and gets response d
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((responseDto) => {
      if (responseDto != null) {
        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);
      }
    });


  }

}
