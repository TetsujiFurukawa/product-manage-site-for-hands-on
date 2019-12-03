import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { AccountService } from 'src/app/service/common/account.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { Router } from '@angular/router';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { TranslateService } from '@ngx-translate/core';
import { ProductSearchResponseDto } from 'src/app/entity/dto/response/product-search-response-dto';
import { MatPaginator } from '@angular/material/paginator';
import { UrlConst } from 'src/app/const/url-const';
import { startWith, switchMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProductPurchaseService } from 'src/app/service/common/product-purchase.service';
import { ProductPurchaseHistorySearchResponseDto } from 'src/app/entity/dto/response/product-purchase-history-search-response-dto';
import { ProductPurchaseHistoryListingSearchParams } from 'src/app/entity/dto/request/product-purchase-history-listing-search-params';
import { MatDatePickerComponent } from '../../common/mat-date-picker/mat-date-picker.component';

@Component({
  selector: 'app-purchase-history-listing-page',
  templateUrl: './purchase-history-listing-page.component.html',
  styleUrls: ['./purchase-history-listing-page.component.scss']
})

export class PurchaseHistoryListingPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private purchaseService: ProductPurchaseService,
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
    productPurchaseName: this.productPurchaseName,
    productName: this.productName,
    productPurchaseDateFrom: this.productPurchaseDateFrom,
    productPurchaseDateTo: this.productPurchaseDateTo,
    productCode: this.productCode
  });

  test: Date = new Date();
  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;
  timezone: string = this.accountService.getUser().userTimezone;


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
  purchaseHistorySearchResponseDtos: ProductPurchaseHistorySearchResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChildren(MatDatePickerComponent) matDatePickerComponents!: QueryList<MatDatePickerComponent>;

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
          const purchaseHistoryListingSearchParams: ProductPurchaseHistoryListingSearchParams = this.createSearchParams();
          this.searchParamsService.setPurchaseHistoryListingSearchParam(purchaseHistoryListingSearchParams);
          return this.purchaseService.getProductPurchaseHistoryList(this.createHttpParams(purchaseHistoryListingSearchParams));
        }),
        map(data => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productPurchaseHistorySearchResponseDtos;
        })
      ).subscribe(data => this.purchaseHistorySearchResponseDtos = data);
  }

  // onRowClicked(productResponseDto: ProductSearchResponseDto) {
  //   this.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);
  // }

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

  private createSearchParams(): ProductPurchaseHistoryListingSearchParams {
    const purchaseHistoryListingSearchParams: ProductPurchaseHistoryListingSearchParams = new ProductPurchaseHistoryListingSearchParams();
    purchaseHistoryListingSearchParams.productPurchaseName = this.productPurchaseName.value;
    purchaseHistoryListingSearchParams.productPurchaseDateFrom = this.productPurchaseDateFrom.value;
    purchaseHistoryListingSearchParams.productPurchaseDateTo = this.productPurchaseDateTo.value;
    purchaseHistoryListingSearchParams.productName = this.productName.value;
    purchaseHistoryListingSearchParams.productCode = this.productCode.value;
    purchaseHistoryListingSearchParams.pageSize = this.paginator.pageSize;
    purchaseHistoryListingSearchParams.pageIndex = this.paginator.pageIndex;

    return purchaseHistoryListingSearchParams;
  }

  private createHttpParams(purchaseHistoryListingSearchParams: ProductPurchaseHistoryListingSearchParams) {
    const conditions: any = {
      productPurchaseName: purchaseHistoryListingSearchParams.productPurchaseName,
      productName: purchaseHistoryListingSearchParams.productName,
      productCode: purchaseHistoryListingSearchParams.productCode,
      pageSize: purchaseHistoryListingSearchParams.pageSize,
      pageIndex: purchaseHistoryListingSearchParams.pageIndex
    };
    if (purchaseHistoryListingSearchParams.productPurchaseDateFrom !== '') {
      const date = new Date(purchaseHistoryListingSearchParams.productPurchaseDateFrom);
      conditions.productPurchaseDateFrom = date.toDateString();
      console.log('productPurchaseDateFrom:' + date.toDateString);

    }
    if (purchaseHistoryListingSearchParams.productPurchaseDateTo !== '') {
      const date = new Date(purchaseHistoryListingSearchParams.productPurchaseDateTo);
      conditions.productPurchaseDateTo = date.toDateString();
    }

    const paramsOptions = { fromObject: conditions } as any;
    const params = new HttpParams(paramsOptions);
    return params;
  }

  private clearSearchCondition() {
    this.productPurchaseName.setValue('');
    this.matDatePickerComponents.map(fn => fn.reset());
    this.productPurchaseDateFrom.setValue('');
    this.productPurchaseDateTo.setValue('');
    this.productName.setValue('');
    this.productCode.setValue('');
  }

  private clearSearchResultList() {
    this.purchaseHistorySearchResponseDtos = null;
    this.resultsLength = 0;
  }


}
