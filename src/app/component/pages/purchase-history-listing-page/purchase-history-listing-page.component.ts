import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { UrlConst } from 'src/app/const/url-const';
import {
    ProductPurchaseHistorySearchResponseDto
} from 'src/app/entity/dto/response/product-purchase-history-search-response-dto';
import { CurrencyCommaPipe } from 'src/app/pipe/currency-comma.pipe';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductPurchaseService } from 'src/app/service/product-purchase.service';

import { HttpParams } from '@angular/common/http';
import {
    AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

import { MatDatePickerComponent } from '../../common/mat-date-picker/mat-date-picker.component';

@Component({
  selector: 'app-purchase-history-listing-page',
  templateUrl: './purchase-history-listing-page.component.html',
  styleUrls: ['./purchase-history-listing-page.component.scss']
})
export class PurchaseHistoryListingPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productPurchaseService: ProductPurchaseService,
    private accountService: AccountService,
    private searchParamsService: SearchParamsService,
    private titleI18Service: TitleI18Service,
    public currencyCommaPipe: CurrencyCommaPipe,
    public translateService: TranslateService
  ) {}

  productPurchaseName = new FormControl('', []);
  productPurchaseDateFrom = new FormControl('', []);
  productPurchaseDateTo = new FormControl('', []);
  productName = new FormControl('', []);
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
    'no',
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

  /**
   * on init
   */
  ngOnInit() {
    this.setupLanguage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_PURCHASE_HISTORY_LISTING);
  }

  /**
   * Clicks clear button
   */
  clickClearButton() {
    this.searchParamsService.removeProductListingSearchParam();
    this.clearSearchCondition();
    this.clearSearchResultList();
  }

  /**
   * Clicks search button
   */
  clickSearchButton() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          // const purchaseHistoryListingSearchParams: ProductPurchaseHistoryListingSearchParams = this.createSearchParams();
          return this.productPurchaseService.getProductPurchaseHistoryList(this.createHttpParams());
        }),
        map(data => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productPurchaseHistorySearchResponseDtos;
        })
      )
      .subscribe(data => (this.purchaseHistorySearchResponseDtos = data));
  }

  /**
   * Received event from child from
   * @param eventData event data
   */
  receivedEventFromChildFrom(eventData: string) {
    this.productPurchaseDateFrom.setValue(eventData);
  }

  /**
   * Received event from child to
   * @param eventData event data
   */
  receivedEventFromChildTo(eventData: string) {
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

  private createHttpParams() {
    const conditions: any = {
      productPurchaseName: this.productPurchaseName.value,
      productName: this.productName.value,
      productCode: this.productCode.value,
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex
    };
    if (this.productPurchaseDateFrom.value !== '' && this.productPurchaseDateFrom.value !== null) {
      const date = new Date(this.productPurchaseDateFrom.value);
      conditions.productPurchaseDateFrom = date.toDateString();
    }
    if (this.productPurchaseDateTo.value !== '' && this.productPurchaseDateTo.value !== null) {
      const date = new Date(this.productPurchaseDateTo.value);
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
