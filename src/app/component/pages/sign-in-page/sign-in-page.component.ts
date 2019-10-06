import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInPageService } from 'src/app/service/pages/sign-in-page.service';

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
  signInPassword = new FormControl('', [
    Validators.required
  ]);

  // サインインのフォーム設定
  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInPassword: this.signInPassword
  });

  constructor(
    private formBuilder: FormBuilder,
    private signInPageService: SignInPageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  singnIn() {


    this.router.navigate(['/product-listing']);
  }
}
