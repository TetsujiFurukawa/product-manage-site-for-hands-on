import {
    YesNoDialogComponent
} from 'src/app/core/components/yes-no-dialog/yes-no-dialog.component';
import { YesNoDialogData } from 'src/app/core/models/yes-no-dialog-data';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AppConst } from 'src/app/pages/constants/app-const';
import { RegexConst } from 'src/app/pages/constants/regex-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import {
    ProductPurchaseRequestDto
} from 'src/app/pages/models/dtos/requests/product-purchase-request-dto';
import {
    ProductPurchaseResponseDto
} from 'src/app/pages/models/dtos/responses/product-purchase-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductPurchaseService } from 'src/app/pages/services/product-purchase.service';
import { ProductService } from 'src/app/pages/services/product.service';
import {
    ProductCodeProductNameValidator
} from 'src/app/pages/validators/product-code-product-name-validator';
import {
    PurchaseQuantityStockQuantityValidator
} from 'src/app/pages/validators/purchase-quantity-stock-quantity-validator';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dummy-purchasing-page',
  templateUrl: './dummy-purchasing-page.component.html',
  styleUrls: ['./dummy-purchasing-page.component.scss']
})
export class DummyPurchasingPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private productPurchaseService: ProductPurchaseService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private formattedCurrencyPipe: FormattedCurrencyPipe,
    private formattedNumberPipe: FormattedNumberPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  productCode = new FormControl('');
  productName = new FormControl('');
  productGenre = new FormControl('');
  productSizeStandard = new FormControl('');
  productPurchaseName = new FormControl('', [Validators.required]);
  productPurchaseUnitPrice = new FormControl('');
  productStockQuantity = new FormControl('');
  productPurchaseQuantity = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(99999999),
    Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);
  productPurchaseAmount = new FormControl('');
  productImage = new FormControl(null);
  validatorLocale = new FormControl(this.accountService.getUser().userLocale);

  registeringForm = this.formBuilder.group(
    {
      productCode: this.productCode,
      productName: this.productName,
      productGenre: this.productGenre,
      productSizeStandard: this.productSizeStandard,
      productPurchaseName: this.productPurchaseName,
      productPurchaseUnitPrice: this.productPurchaseUnitPrice,
      productStockQuantity: this.productStockQuantity,
      productPurchaseQuantity: this.productPurchaseQuantity,
      productPurchaseAmount: this.productPurchaseAmount,
      productImage: this.productImage,
      validatorLocale: this.validatorLocale
    },
    {
      validators: [ProductCodeProductNameValidator, PurchaseQuantityStockQuantityValidator]
    }
  );

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;
  genres: string[];

  /**
   * on init
   */
  ngOnInit() {
    this.loadData();
    this.setupLangage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_DUMMY_PURCHASING);
  }

  /**
   * Blurs product code
   */
  blurProductCode(): void {
    if (this.productCode.value === '') {
      return;
    }
    this.resetProductPurchaseControls();
    this.getProductPurchase();
  }

  /**
   * Clicks save button
   */
  clickSaveButton() {
    const dialogData: YesNoDialogData = {
      title: this.translateService.instant('productRegisteringPage.saveYesNoDialog.title'),
      message: this.translateService.instant('productRegisteringPage.saveYesNoDialog.message'),
      captionNo: this.translateService.instant('productRegisteringPage.saveYesNoDialog.captionNo'),
      captionYes: this.translateService.instant('productRegisteringPage.saveYesNoDialog.captionYes')
    };

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      height: AppConst.YES_NO_DIALOG_HEIGHT,
      width: AppConst.YES_NO_DIALOG_WIDTH,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const purchaseRequest: ProductPurchaseRequestDto = this.createPurchaseRequest();
        this.createProductPurchase(purchaseRequest);
      }
    });
  }

  /**
   * Blurs product purchase quantity
   */
  blurProductPurchaseQuantity(): void {
    const productPurchaseAmount =
      this.formattedCurrencyPipe.parse(this.productPurchaseUnitPrice.value, this.locale, this.currency) *
      this.formattedCurrencyPipe.parse(this.productPurchaseQuantity.value, this.locale, this.currency);
    this.productPurchaseAmount.setValue(
      this.formattedCurrencyPipe.transform(String(productPurchaseAmount), this.locale, this.currency)
    );
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private loadData() {
    this.productService.getGenres().subscribe((data) => (this.genres = data));
  }
  private setupLangage() {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private getProductPurchase() {
    this.loadingService.startLoading();

    this.productPurchaseService.getProductPurchase(this.productCode.value).subscribe((data) => {
      this.extractGetProductPurchaseResponseDto(data);
      this.loadingService.stopLoading();
    });
  }

  private createProductPurchase(productPurchaseRequestDto: ProductPurchaseRequestDto) {
    this.loadingService.startLoading();

    this.productPurchaseService.createProductPurchase(productPurchaseRequestDto).subscribe((data) => {
      this.extractCreateProductPurchaseResponseDto(data);
      this.loadingService.stopLoading();
    });
  }

  private createPurchaseRequest(): ProductPurchaseRequestDto {
    const productPurchaseRequestDto: ProductPurchaseRequestDto = {
      productCode: this.productCode.value,
      productPurchaseName: this.productPurchaseName.value,
      productStockQuantity: this.formattedNumberPipe.parse(this.productStockQuantity.value, this.locale),
      productPurchaseQuantity: this.formattedCurrencyPipe.parse(
        this.productPurchaseQuantity.value,
        this.locale,
        this.currency
      )
    };
    return productPurchaseRequestDto;
  }

  private extractGetProductPurchaseResponseDto(productPurchaseResponseDto: ProductPurchaseResponseDto) {
    if (productPurchaseResponseDto === null) {
      return;
    }
    this.productName.setValue(productPurchaseResponseDto.productName);
    this.productGenre.setValue(this.translateService.instant('genre.' + productPurchaseResponseDto.productGenre));
    this.productSizeStandard.setValue(productPurchaseResponseDto.productSizeStandard);
    this.productPurchaseUnitPrice.setValue(
      this.formattedCurrencyPipe.transform(
        String(productPurchaseResponseDto.productPurchaseUnitPrice),
        this.locale,
        this.currency
      )
    );
    this.productStockQuantity.setValue(
      this.formattedNumberPipe.transform(String(productPurchaseResponseDto.productStockQuantity), this.locale)
    );
    this.productImage.setValue(productPurchaseResponseDto.productImage);
  }

  private extractCreateProductPurchaseResponseDto(productPurchaseResponseDto: ProductPurchaseResponseDto) {
    if (productPurchaseResponseDto === null) {
      return;
    }
    this.productStockQuantity.setValue(
      this.formattedNumberPipe.transform(String(productPurchaseResponseDto.productStockQuantity), this.locale)
    );
    this.productPurchaseQuantity.reset();
    this.productPurchaseAmount.reset();
  }

  private resetProductPurchaseControls() {
    this.productName.reset();
    this.productGenre.reset();
    this.productSizeStandard.reset();
    this.productPurchaseName.reset();
    this.productPurchaseUnitPrice.reset();
    this.productStockQuantity.reset();
    this.productPurchaseQuantity.reset();
    this.productPurchaseAmount.reset();
  }
}
