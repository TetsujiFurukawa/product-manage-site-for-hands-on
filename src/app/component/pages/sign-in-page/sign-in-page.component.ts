import { SignInRequestDto } from 'src/app/entity/dto/request/sign-in-request-dto';
import { SignInPageService } from 'src/app/service/pages/sign-in-page.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  // E-Mailアドレス
  signInUserAccount = new FormControl('', [
    Validators.required
  ]);

  // パスワード
  signInUserPassword = new FormControl('', [
    Validators.required
  ]);

  // サインインのフォーム設定
  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword
  });

  constructor(
    private formBuilder: FormBuilder,
    private signInPageService: SignInPageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  singnIn() {
    // Creates request dto.
    const signInRequestDto = this.createSignInRequestDto();

    // Sign in using dto.
    this.signInPageService.signIn(signInRequestDto);
  }

  private createSignInRequestDto(): SignInRequestDto {
    // Create Request dto.
    const signInRequestDto = new SignInRequestDto();
    signInRequestDto.Username = this.signInUserAccount.value;
    signInRequestDto.Password = this.signInUserPassword.value;

    return signInRequestDto;
  }
}
