import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UrlConst } from 'src/app/const/url-const';
import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInResponseDto } from 'src/app/entity/dto/response/sign-in-response-dto';
import { User } from 'src/app/entity/user';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { RoutingService } from 'src/app/service/common/routing.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, AfterViewChecked {
  signInUserAccount = new FormControl('', [Validators.required]);
  signInUserPassword = new FormControl('', [Validators.required]);

  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private routingService: RoutingService,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    // Sets default language to ja.
    this.setupLangage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_SIGN_IN);
  }

  /**
   * Clicks sign in button
   */
  clickSignInButton() {
    // Creates request dto.
    const signInRequestDto = this.createSignInRequestDto();

    // Signs in using dto.
    this.signIn(signInRequestDto);
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLangage() {
    // Setups language using browser settings.
    this.translateService.setDefaultLang(this.getLangage(navigator.language));
    this.translateService.use(this.getLangage(navigator.language));
  }

  private getLangage(locale: string): string {
    const CHAR_HYPHEN = '-';
    if (locale.indexOf(CHAR_HYPHEN) > 0) {
      const lang: string[] = locale.split(CHAR_HYPHEN);
      return lang[0];
    }
    return locale;
  }

  private signIn(signInRequestDto: SignInRequestDto) {
    // Starts Loading.
    this.loadingService.startLoading();

    // Signs in and gets response dto.
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe(responseDto => {
      if (responseDto != null) {
        // Sets account information.
        this.setUpUserAccount(responseDto);
        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);
      }
      // Stops Loading.
      this.loadingService.stopLoading();
    });
  }

  private createSignInRequestDto(): SignInRequestDto {
    // Creates Request dto.
    const signInRequestDto = new SignInRequestDto();
    signInRequestDto.Username = this.signInUserAccount.value;
    signInRequestDto.Password = this.signInUserPassword.value;
    return signInRequestDto;
  }

  private setUpUserAccount(responseDto: SignInResponseDto) {
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
