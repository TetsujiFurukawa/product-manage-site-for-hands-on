import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import {
    MatDatePickerComponent
} from 'src/app/core/components/mat-date-picker/mat-date-picker.component';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductPurchaseService } from 'src/app/pages/services/product-purchase.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { HttpParams } from '@angular/common/http';
import {
    AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

import {
    ProductPurchaseHistorySearchResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-response-dto';

@Component({
  selector: 'app-purchase-history-listing-page',
  templateUrl: './purchase-history-listing-page.component.html',
  styleUrls: ['./purchase-history-listing-page.component.scss']
})
export class PurchaseHistoryListingPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private accountService: AccountService,
    public formattedCurrencyPipe: FormattedCurrencyPipe,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productPurchaseService: ProductPurchaseService,
    private searchParamsService: SearchParamsService,
    private titleI18Service: TitleI18Service,
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

  /** Locale, Currency, Timezone */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;
  timezone: string = this.accountService.getUser().userTimezone;
  timezoneOffset: string = this.accountService.getUser().userTimezoneOffset;

  /** Material table's header */
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

  /** Search result */
  purchaseHistorySearchResponses: ProductPurchaseHistorySearchResponseDto[];
  resultsLength = 0;

  /** Pagenator and DatePicker */
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChildren(MatDatePickerComponent) matDatePickerComponents!: QueryList<MatDatePickerComponent>;

  /**
   * on init
   */
  ngOnInit(): void {
    this.setupLanguage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked(): void {
    this.titleI18Service.setTitle(UrlConst.PATH_PURCHASE_HISTORY_LISTING);
  }

  /**
   * Clicks clear button
   */
  clickClearButton(): void {
    this.searchParamsService.removeProductListingSearchParamsDto();
    this.clearSearchConditions();
    this.clearSearchResultList();
  }

  /**
   * Clicks search button
   */
  clickSearchButton(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          // const purchaseHistoryListingSearchParams: ProductPurchaseHistoryListingSearchParams = this.createSearchParamsDto();
          return this.productPurchaseService.getProductPurchaseHistoryList(this.createHttpParams());
        }),
        map((data) => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productPurchaseHistorySearchResponseDtos;
        })
      )
      .subscribe((data) => (this.purchaseHistorySearchResponses = data));
  }

  /**
   * Received event from child date from
   * @param eventData event data
   */
  receivedEventFromChildFrom(eventData: string): void {
    this.productPurchaseDateFrom.setValue(eventData);
  }

  /**
   * Received event from child date to
   * @param eventData event data
   */
  receivedEventFromChildTo(eventData: string): void {
    this.productPurchaseDateTo.setValue(eventData);
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLanguage(): void {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private createHttpParams(): HttpParams {
    const conditions: any = {
      productPurchaseName: this.productPurchaseName.value,
      productName: this.productName.value,
      productCode: this.productCode.value,
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex
    };

    if (this.productPurchaseDateFrom.value !== '' && this.productPurchaseDateFrom.value !== null) {
      const localDate = new Date(this.productPurchaseDateFrom.value + ' ' + this.timezoneOffset);
      conditions.productPurchaseDateFrom = localDate.toISOString();
    }

    if (this.productPurchaseDateTo.value !== '' && this.productPurchaseDateTo.value !== null) {
      const date = new Date(this.productPurchaseDateTo.value);
      date.setDate(date.getDate() + 1);
      const localDate = new Date(date + ' ' + this.timezoneOffset);
      conditions.productPurchaseDateTo = localDate.toISOString();
    }

    const paramsOptions = { fromObject: conditions } as any;
    const params = new HttpParams(paramsOptions);
    return params;
  }

  private clearSearchConditions(): void {
    this.productPurchaseName.setValue('');
    this.matDatePickerComponents.map((fn) => fn.reset());
    this.productPurchaseDateFrom.setValue('');
    this.productPurchaseDateTo.setValue('');
    this.productName.setValue('');
    this.productCode.setValue('');
  }

  private clearSearchResultList(): void {
    this.purchaseHistorySearchResponses = null;
    this.resultsLength = 0;
  }
}
