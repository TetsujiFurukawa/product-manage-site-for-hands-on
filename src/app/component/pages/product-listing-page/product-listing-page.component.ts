import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/service/common/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { LoadingService } from 'src/app/service/common/loading.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ProductListingPageService } from 'src/app/service/pages/product-listing-page.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

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
    private accountService: AccountService,
    public translateService: TranslateService
  ) { }

  // product name
  productName = new FormControl('', []);

  // product code
  productCode = new FormControl('', []);

  // product genre
  productGenre = new FormControl('', []);

  // product end
  productEnd = new FormControl(false, []);

  searchForm = this.formBuilder.group({
    productName: this.productName,
    productCode: this.productCode,
    productGenre: this.productGenre,
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
    'productSizeStandard',
    'productColor',
    'productUnitPrice',
    'productStockQuantity',
    'productEnd'
  ];

  // Search result
  productResponseDtos: ProductResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {
    this.setupLangage();

  }

  private setupLangage() {
    const lang = this.accountService.getUser().userLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  onNew() {
    this.productListingPageService.onNew();
  }

  onClear() {
    this.clearSearchCondition();
    this.clearSearchResultList();
  }

  private clearSearchCondition() {
    this.productName.setValue('');
    this.productCode.setValue('');
    this.productGenre.setValue('');
    this.productEnd.setValue(false);
  }

  private clearSearchResultList() {
    this.productResponseDtos = null;
    this.resultsLength = 0;
  }

  onSearch() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          return this.productListingPageService.getProductList(this.createHttpParams());
        }),
        map(data => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productResponseDtos;
        })
      ).subscribe(data => this.productResponseDtos = data);
  }

  onRowClicked(productResponseDto: ProductResponseDto) {
    this.productListingPageService.onRowClicked(productResponseDto);
  }

  /**
   * Creates search criterias.
   */
  private createHttpParams(): HttpParams {
    return this.productListingPageService.createHttpParams(
      this.productName.value,
      this.productCode.value,
      this.productGenre.value,
      this.productEnd.value.toString(),
      this.paginator.pageSize,
      this.paginator.pageIndex);
  }

}
