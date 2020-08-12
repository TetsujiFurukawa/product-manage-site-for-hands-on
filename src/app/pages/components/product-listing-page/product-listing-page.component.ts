import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductService } from 'src/app/pages/services/product.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

import {
    ProductListingSearchParamsDto
} from '../../models/dtos/requests/product-listing-search-params-dto';
import { ProductSearchResponseDto } from '../../models/dtos/responses/product-search-response-dto';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private accountService: AccountService,
    private searchParamsService: SearchParamsService,
    private routingService: RoutingService,
    private titleI18Service: TitleI18Service,
    public formattedCurrencyPipe: FormattedCurrencyPipe,
    public translateService: TranslateService
  ) {}

  productName = new FormControl('', []);
  productCode = new FormControl('', []);
  productGenre = new FormControl('', []);
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

  genres: string[];

  // Material table's header
  displayColumns: string[] = [
    'no',
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
  productSearchResponseDtos: ProductSearchResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit(): void {
    this.loadData();
    this.setupLanguage();
    this.initSearchCriteria();
  }

  ngAfterViewChecked(): void {
    this.titleI18Service.setTitle(UrlConst.PATH_PRODUCT_LISTING);
  }

  clickNewButton(): void {
    this.searchParamsService.removeProductListingSearchParams();
    this.routingService.navigate(UrlConst.PATH_PRODUCT_REGISTERING_NEW);
  }

  clickClearButton(): void {
    this.searchParamsService.removeProductListingSearchParams();
    this.clearSearchConditions();
    this.clearSearchResultList();
  }

  clickSearchButton(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          const productListingSearchParamsDto: ProductListingSearchParamsDto = this.createSearchParams();
          this.searchParamsService.setProductListingSearchParams(productListingSearchParamsDto);

          return this.productService.getProductList(this.createHttpParams(productListingSearchParamsDto));
        }),
        map((data) => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          this.paginator.pageIndex = data.pageIndex;
          return data.productSearchResponseDtos;
        })
      )
      .subscribe((data) => (this.productSearchResponseDtos = data));
  }

  clickListRow(productResponse: ProductSearchResponseDto): void {
    this.routingService.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponse.productCode]);
  }

  unselectProductGenre(): void {
    this.productGenre.setValue('');
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private loadData(): void {
    this.productService.getGenres().subscribe((data) => (this.genres = data));
  }

  private setupLanguage(): void {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private initSearchCriteria(): void {
    let productListingSearchParamsDto: ProductListingSearchParamsDto = {
      productName: '',
      productCode: '',
      productGenre: '',
      endOfSale: false,
      pageSize: 0,
      pageIndex: 0
    };
    productListingSearchParamsDto = this.searchParamsService.getProductListingSearchParams(
      productListingSearchParamsDto
    );
    if (productListingSearchParamsDto !== null && productListingSearchParamsDto !== undefined) {
      if (productListingSearchParamsDto.productName !== undefined) {
        this.productName.setValue(productListingSearchParamsDto.productName);
      }
      if (productListingSearchParamsDto.productCode !== undefined) {
        this.productCode.setValue(productListingSearchParamsDto.productCode);
      }
      if (productListingSearchParamsDto.productGenre !== undefined) {
        this.productGenre.setValue(productListingSearchParamsDto.productGenre);
      }
      // Observes pagenator change events.
      this.paginator.pageIndex = productListingSearchParamsDto.pageIndex;
      this.paginator.pageSize = productListingSearchParamsDto.pageSize;
      setTimeout(() => {
        this.paginator._changePageSize(productListingSearchParamsDto.pageSize);
      }, 0);
      this.endOfSale.setValue(productListingSearchParamsDto.endOfSale);
      this.clickSearchButton();
    }
  }

  private createSearchParams(): ProductListingSearchParamsDto {
    const productListingSearchParamsDto: ProductListingSearchParamsDto = {
      productName: this.productName.value,
      productCode: this.productCode.value,
      productGenre: this.productGenre.value,
      endOfSale: this.endOfSale.value,
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex
    };
    return productListingSearchParamsDto;
  }

  private createHttpParams(productListingSearchParamsDto: ProductListingSearchParamsDto): HttpParams {
    const conditions = {
      productName: productListingSearchParamsDto.productName,
      productCode: productListingSearchParamsDto.productCode,
      productGenre: productListingSearchParamsDto.productGenre,
      endOfSale: productListingSearchParamsDto.endOfSale,
      pageSize: productListingSearchParamsDto.pageSize,
      pageIndex: productListingSearchParamsDto.pageIndex
    };
    const paramsOptions = { fromObject: conditions } as any;
    const params = new HttpParams(paramsOptions);
    return params;
  }

  private clearSearchConditions(): void {
    this.productName.setValue('');
    this.productCode.setValue('');
    this.productGenre.setValue('');
    this.endOfSale.setValue(false);
  }

  private clearSearchResultList(): void {
    this.productSearchResponseDtos = null;
    this.resultsLength = 0;
  }
}
