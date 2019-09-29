import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-registering-page',
  templateUrl: './product-registering-page.component.html',
  styleUrls: ['./product-registering-page.component.scss']
})
export class ProductRegisteringPageComponent implements OnInit {

  registerForm = this.formBuilder.group({
    // signInEMailAddress: this.signInUserAccount,
    // signInPassword: this.signInPassword
  });

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
  }

}
