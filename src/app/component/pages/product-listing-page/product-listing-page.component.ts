import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { UrlConst } from 'src/app/const/url-const';
import {
    ProductListingSearchParams
} from 'src/app/entity/dto/request/product-listing-search-params';
import { ProductSearchResponseDto } from 'src/app/entity/dto/response/product-search-response-dto';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { RoutingService } from 'src/app/service/common/routing.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductService } from 'src/app/service/product.service';

import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

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
    public currencyToNumberPipe: CurrencyToNumberPipe,
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
  displayColumns: string[] = ['No', 'productName', 'productCode', 'productGenre', 'productImage', 'productSizeStandard', 'productColor', 'productUnitPrice', 'productStockQuantity', 'endOfSale'];

  // Search result
  productSearchResponseDtos: ProductSearchResponseDto[];
  resultsLength = 0;

  // Loading and pagenation
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

  ngOnInit() {
    this.loadData();
    this.setupLanguage();
    this.initSearchCriteria();
  }

  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_PRODUCT_LISTING);
  }

  onNew() {
    this.searchParamsService.removeProductListingSearchParam();
    this.routingService.navigate(UrlConst.PATH_PRODUCT_REGISTERING + '/new');
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
          return data.productSearchResponseDtos;
        })
      )
      .subscribe(data => (this.productSearchResponseDtos = data));
  }

  onRowClicked(productResponseDto: ProductSearchResponseDto) {
    this.routingService.router.navigate([UrlConst.PATH_PRODUCT_REGISTERING, productResponseDto.productCode]);
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private loadData() {
    this.productService.getGenres().subscribe(data => (this.genres = data));
  }

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
    this.productSearchResponseDtos = null;
    this.resultsLength = 0;
  }
}
