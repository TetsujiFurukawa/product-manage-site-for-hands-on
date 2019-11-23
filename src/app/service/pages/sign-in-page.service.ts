import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { AccountService } from '../common/account.service';
import { RoutingService } from '../common/routing.service';
import { LoadingService } from '../common/loading.service';
import { User } from 'src/app/entity/user';

@Injectable({
  providedIn: 'root'
})
export class SignInPageService {

  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private routingService: RoutingService
  ) { }

  signIn(signInRequestDto: SignInRequestDto) {
    // Starts Loading.
    this.loadingService.startLoading();

    // Signs in and gets response dto.
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((responseDto) => {

      if (responseDto != null) {

        // Sets account information.
        this.setUpAccount(responseDto);

        // Sets langage.
        this.setupLanguage(responseDto);

        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);

      }

      // Stops Loading.
      this.loadingService.stopLoading();
    });
  }

  private setupLanguage(responseDto: SignInResponseDto) {
    // Sets langage.
    this.translateService.setDefaultLang(responseDto.userLanguage);
    this.translateService.use(responseDto.userLanguage);
  }

  private setUpAccount(responseDto: SignInResponseDto) {
    const user: User = new User();
    user.userAccount = responseDto.userAccount;
    user.userName = responseDto.userName;
    user.userLocale = responseDto.userLocale;
    user.userLanguage = responseDto.userLanguage;
    user.userTimezone = responseDto.userTimezone;
    user.userCurrency = responseDto.userCurrency;

    this.accountService.setUser(user);
  }
}
