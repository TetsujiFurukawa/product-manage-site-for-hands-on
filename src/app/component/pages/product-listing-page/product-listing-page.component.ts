import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/service/common/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { Router } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';

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
    private router: Router
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

  // Material table's header
  displayColumns: string[] = [
    'No',
    'productName',
    'productCode',
    'productGenre',
    'productImage',
    'productSize',
    'productColor',
    'productUnitPrice',
    'productStock',
    'productEnd'
  ];

  // Search result
  productResponseDtos: ProductResponseDto[];

  // Loading and pagenation
  isLoadingResults = false;
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {

  }

  onNew() {
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING]);
  }

  onClear() {

  }

  onSearch() {

  }

}
