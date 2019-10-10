import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInPageService } from 'src/app/service/pages/sign-in-page.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  // account
  signInUserAccount = new FormControl('', [
    Validators.required
  ]);

  // pwd
  signInUserPassword = new FormControl('', [
    Validators.required
  ]);

  // form group setting
  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword
  });

  constructor(
    private formBuilder: FormBuilder,
    private signInPageService: SignInPageService,
    public translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    // Sets default language to ja.
    this.setupLangage();
  }

  private setupLangage() {
    this.translateService.setDefaultLang(navigator.language);
    // Sets using language.
    this.translateService.use(navigator.language);
  }

  singnIn() {
    // Creates request dto.
    const signInRequestDto = this.createSignInRequestDto();

    // Signs in using dto.
    this.signInPageService.signIn(signInRequestDto);
  }

  private createSignInRequestDto(): SignInRequestDto {
    // Creates Request dto.
    const signInRequestDto = new SignInRequestDto();
    signInRequestDto.Username = this.signInUserAccount.value;
    signInRequestDto.Password = this.signInUserPassword.value;

    return signInRequestDto;
  }
}
