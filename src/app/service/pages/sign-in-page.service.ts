import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { AccountService } from '../common/account.service';
import { RoutingService } from '../common/routing.service';

@Injectable({
  providedIn: 'root'
})
export class SignInPageService {

  constructor(

    private accountService: AccountService,
    private translateService: TranslateService,
    private routingService: RoutingService

  ) { }

  signIn(signInRequestDto: SignInRequestDto) {

    // Sign in and gets response d
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((responseDto) => {

      if (responseDto != null) {

        // Sets account information.
        this.setUpAccount(responseDto);

        // Sets lang.
        this.translateService.use(responseDto.userLang);

        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);

      }

    });

  }

  private setUpAccount(responseDto: SignInResponseDto) {

    this.accountService.userAccount = responseDto.userAccount;
    this.accountService.userName = responseDto.userName;
    this.accountService.userLang = responseDto.userLang;
    this.accountService.userTimezone = responseDto.userTimezone;

  }

}
