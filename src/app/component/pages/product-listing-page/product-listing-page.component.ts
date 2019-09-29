import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit {

  searchForm = this.formBuilder.group({
    // signInEMailAddress: this.signInUserAccount,
    // signInPassword: this.signInPassword
  });

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
  }

}
