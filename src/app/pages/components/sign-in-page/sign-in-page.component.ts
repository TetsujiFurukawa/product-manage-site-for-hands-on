import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { User } from 'src/app/pages/models/user';
import { AccountService } from 'src/app/pages/services/account.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { SignInRequestDto } from '../../models/interfaces/requests/sign-in-request';
import { SignInResponseDto } from '../../models/interfaces/responses/sign-in-response';

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
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private routingService: RoutingService,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

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
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Clicks sign in button
   */
  clickSignInButton() {
    // Creates request.
    const signInRequestDto: SignInRequestDto = this.createSignInRequestDto();

    // Signs in using sign in request.
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

  private getLangage(language: string): string {
    console.log('SignInPageComponent #getLangage() language:' + language);

    const CHAR_HYPHEN = '-';
    if (language.indexOf(CHAR_HYPHEN) > 0) {
      const splittedLanguage: string[] = language.split(CHAR_HYPHEN);
      console.log('SignInPageComponent #getLangage() splittedLanguage[0]:' + splittedLanguage[0]);

      return splittedLanguage[0];
    }
    return language;
  }

  private signIn(signInRequestDto: SignInRequestDto) {
    // Starts Loading.
    this.loadingService.startLoading();

    // Signs in and gets response.
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((response) => {
      if (response != null) {
        // Sets account information.
        this.setUpUserAccount(response);
        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);
      }
      // Stops Loading.
      this.loadingService.stopLoading();
    });
  }

  private createSignInRequestDto(): SignInRequestDto {
    // Creates Request.
    const signInRequestDto: SignInRequestDto = {
      Username: this.signInUserAccount.value,
      Password: this.signInUserPassword.value
    };
    return signInRequestDto;
  }

  private setUpUserAccount(response: SignInResponseDto) {
    const user: User = new User();
    user.userAccount = response.userAccount;
    user.userName = response.userName;
    user.userLocale = response.userLocale;
    user.userLanguage = response.userLanguage;
    user.userTimezone = response.userTimezone;
    user.userTimezoneOffset = response.userTimezoneOffset;
    user.userCurrency = response.userCurrency;
    this.accountService.setUser(user);

    console.log('SignInPageComponent #setUpUserAccount() user.userAccount:' + user.userAccount);
    console.log('SignInPageComponent #setUpUserAccount() user.userName:' + user.userName);
    console.log('SignInPageComponent #setUpUserAccount() user.userLocale:' + user.userLocale);
    console.log('SignInPageComponent #setUpUserAccount() user.userLanguage:' + user.userLanguage);
    console.log('SignInPageComponent #setUpUserAccount() user.userTimezone:' + user.userTimezone);
    console.log('SignInPageComponent #setUpUserAccount() user.userTimezoneOffset:' + user.userTimezoneOffset);
    console.log('SignInPageComponent #setUpUserAccount() user.userCurrency:' + user.userCurrency);
  }
}
