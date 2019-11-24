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

  // product purchase name
  productPurchaseName = new FormControl('', []);

  // product purchase date from
  productPurchaseDateFrom = new FormControl('', []);

  // product purchase date to
  productPurchaseDateTo = new FormControl('', []);

  // product name
  productName = new FormControl('', []);

  // product code
  productCode = new FormControl('', []);

  searchForm = this.formBuilder.group({
    productName: this.productName,
    productPurchaseDateFrom: this.productPurchaseDateFrom,
    productPurchaseDateTo: this.productPurchaseDateTo,
    productCode: this.productCode
  });

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  // Material table's header
  displayColumns: string[] = [
    'No',
    'productName',
    'productCode',
    'productPurchaseName',
    'productImage',
    'productPurchaseDate',
    'productPurchaseUnitPrice',
    'productPurchaseQuantity',
    'productPurchaseAmount'
  ];

  // Search result
  productResponseDtos: ProductResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {
    this.setupLanguage();
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
          const purchaseHistoryListingSearchParams: ProductListingSearchParams = this.createSearchParams();
          this.searchParamsService.setProductListingSearchParam(purchaseHistoryListingSearchParams);

          return this.productService.getProductList(this.createHttpParams(purchaseHistoryListingSearchParams));
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

  onReceiveEventFromChildFrom(eventData: string) {
    this.productPurchaseDateFrom.setValue(eventData);
  }
  onReceiveEventFromChildTo(eventData: string) {
    this.productPurchaseDateTo.setValue(eventData);
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLanguage() {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private createSearchParams(): ProductListingSearchParams {
    const productListingSearchParams: ProductListingSearchParams = new ProductListingSearchParams();
    productListingSearchParams.productName = this.productName.value;
    productListingSearchParams.productCode = this.productCode.value;
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
  }

  private clearSearchResultList() {
    this.productResponseDtos = null;
    this.resultsLength = 0;
  }


}
