import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

export interface Genre {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  // product name
  productName = new FormControl('', []);

  // product code
  productCode = new FormControl('', []);

  // deleted
  deleted = new FormControl('', []);

  searchForm = this.formBuilder.group({
    productName: this.productName,
    productCode: this.productCode,
    deleted: this.deleted
  });

  genres: Genre[] = [
    { value: '1', viewValue: '靴・スニーカー' },
    { value: '2', viewValue: 'トップス' },
    { value: '3', viewValue: 'バッグ' }
  ];

  ngOnInit() {
  }
}
