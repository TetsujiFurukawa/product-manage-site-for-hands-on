import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/service/common/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { Router } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';
import { LoadingService } from 'src/app/service/common/loading.service';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { ProductListingPageService } from 'src/app/service/pages/product-listing-page.service';
import { ProductService } from 'src/app/service/common/product.service';
import { HttpParams } from '@angular/common/http';

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
    private loadingService: LoadingService,
    private productListingPageService: ProductListingPageService,
    private productService: ProductService,
    private router: Router
  ) { }

  // product name
  productName = new FormControl('', []);

  // product code
  productCode = new FormControl('', []);

  // deleted
  productEnd = new FormControl(false, []);

  searchForm = this.formBuilder.group({
    productName: this.productName,
    productCode: this.productCode,
    productEnd: this.productEnd
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
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {

  }

  onNew() {
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING]);
  }

  onClear() {

  }

  onSearch() {

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          return this.productService.getProductList(this.createHttpParams());
        }),

        map(data => {
          // Flip flag to show that loading has finished.
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productResponseDto;
        }),

        catchError(() => {
          this.loadingService.stopLoading();
          return of(null as ProductResponseDto[]);
        })

      ).subscribe(data => this.productResponseDtos = data);

  }

  onRowClicked(productResponseDto: ProductResponseDto) {
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);
  }

  /**
   * Creates search criterias.
   */
  private createHttpParams(): HttpParams {
    const conditions = {
      // companyName: this.companyName.value,
      // companyKana: this.companyKana.value,
      deleted: this.productEnd.value.toString(),
      pageSize: this.paginator.pageSize.toString(),
      pageIndex: this.paginator.pageIndex.toString()
    };

    const paramsOptions = { fromObject: conditions };
    const params = new HttpParams(paramsOptions);

    return params;
  }

}
