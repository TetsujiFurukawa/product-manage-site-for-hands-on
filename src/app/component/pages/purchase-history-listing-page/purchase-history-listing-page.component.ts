import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { AccountService } from 'src/app/service/common/account.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { Router } from '@angular/router';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { TranslateService } from '@ngx-translate/core';
import { ProductResponseDto } from 'src/app/entity/dto/response/product-response-dto';
import { MatPaginator } from '@angular/material/paginator';
import { UrlConst } from 'src/app/const/url-const';
import { ProductListingSearchParams } from 'src/app/entity/product-listing-search-params';
import { startWith, switchMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ProductService } from 'src/app/service/common/product.service';
import { HttpParams } from '@angular/common/http';

export interface Genre {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-purchase-history-listing-page',
  templateUrl: './purchase-history-listing-page.component.html',
  styleUrls: ['./purchase-history-listing-page.component.scss']
})

export class PurchaseHistoryListingPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private accountService: AccountService,
    private searchParamsService: SearchParamsService,
    private router: Router,
    public currencyToNumberPipe: CurrencyToNumberPipe,
    public translateService: TranslateService,
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

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

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
    this.setupLanguage();
    this.initSearchCriteria();
  }

  onNew() {
    this.searchParamsService.removeProductListingSearchParam();
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING + '/new']);
  }

  onClear() {
    this.searchParamsService.removeProductListingSearchParam();
    this.clearSearchCondition();
    this.clearSearchResultList();
  }

  onSearch() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          const productListingSearchParams: ProductListingSearchParams = this.createSearchParams();
          this.searchParamsService.setProductListingSearchParam(productListingSearchParams);

          return this.productService.getProductList(this.createHttpParams(productListingSearchParams));
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
    this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLanguage() {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private initSearchCriteria() {
    let productListingSearchParams: ProductListingSearchParams = new ProductListingSearchParams();
    productListingSearchParams = this.searchParamsService.getProductListingSearchParam(productListingSearchParams);
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

  private createHttpParams(productListingSearchParams: ProductListingSearchParams) {
    const conditions = {
      productName: productListingSearchParams.productName,
      productCode: productListingSearchParams.productCode,
      productGenre: productListingSearchParams.productGenre,
      endOfSale: productListingSearchParams.endOfSale,
      pageSize: productListingSearchParams.pageSize,
      pageIndex: productListingSearchParams.pageIndex
    };
    const paramsOptions = { fromObject: conditions } as any;
    const params = new HttpParams(paramsOptions);
    return params;
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

}
