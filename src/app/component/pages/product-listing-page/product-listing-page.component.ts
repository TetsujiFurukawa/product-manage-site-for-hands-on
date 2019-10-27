import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/service/common/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { LoadingService } from 'src/app/service/common/loading.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ProductListingPageService } from 'src/app/service/pages/product-listing-page.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { ProductListingSearchParams } from 'src/app/entity/product-listing-search-params';

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
    private searchParamsService: SearchParamsService,
    public translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  // product name
  productName = new FormControl('', []);

  // product code
  productCode = new FormControl('', []);

  // product genre
  productGenre = new FormControl('', []);

  // End of sale
  endOfSale = new FormControl(false, []);

  searchForm = this.formBuilder.group({
    productName: this.productName,
    productCode: this.productCode,
    productGenre: this.productGenre,
    endOfSale: this.endOfSale
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
    'endOfSale'
  ];

  // Search result
  productResponseDtos: ProductResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {
    this.setupLangage();

    let productListingSearchParams: ProductListingSearchParams = new ProductListingSearchParams();
    productListingSearchParams = this.searchParamsService.getProductListingSearchParam(productListingSearchParams);

    console.log('productListingSearchParams:' + productListingSearchParams);

    if (productListingSearchParams !== null) {
      if (productListingSearchParams.productName !== undefined) {
        this.productName.setValue(productListingSearchParams.productName);
      }
      if (productListingSearchParams.productCode !== undefined) {
        this.productCode.setValue(productListingSearchParams.productCode);
      }
      if (productListingSearchParams.productGenre !== undefined) {
        this.productGenre.setValue(productListingSearchParams.productGenre);
      }
      // Observes pagenator change events.
      this.paginator.pageIndex = productListingSearchParams.pageIndex;
      this.paginator.pageSize = productListingSearchParams.pageSize;
      setTimeout(() => {
        this.paginator._changePageSize(productListingSearchParams.pageSize);
      }, 0);

      this.endOfSale.setValue(productListingSearchParams.endOfSale);
      this.onSearch();

    }

  }

  private setupLangage() {
    const lang = this.accountService.getUser().userLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  onNew() {
    this.searchParamsService.removeProductListingSearchParam();
    this.productListingPageService.onNew();
  }

  onClear() {
    this.searchParamsService.removeProductListingSearchParam();
    this.clearSearchCondition();
    this.clearSearchResultList();
  }

  private clearSearchCondition() {
    this.productName.setValue('');
    this.productCode.setValue('');
    this.productGenre.setValue('');
    this.endOfSale.setValue(false);
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
          console.log('paginator.pageSize:' + this.paginator.pageSize);
          console.log('endOfSale:' + this.endOfSale.value);

          this.loadingService.startLoading();
          const productListingSearchParams: ProductListingSearchParams = this.createSearchParams();
          this.searchParamsService.setProductListingSearchParam(productListingSearchParams);

          return this.productListingPageService.getProductList(productListingSearchParams);
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
  private createSearchParams(): ProductListingSearchParams {
    const productListingSearchParams: ProductListingSearchParams = new ProductListingSearchParams();
    productListingSearchParams.productName = this.productName.value;
    productListingSearchParams.productCode = this.productCode.value;
    productListingSearchParams.productGenre = this.productGenre.value;
    productListingSearchParams.endOfSale = this.endOfSale.value;
    productListingSearchParams.pageSize = this.paginator.pageSize;
    productListingSearchParams.pageIndex = this.paginator.pageIndex;

    return productListingSearchParams;
  }

}
