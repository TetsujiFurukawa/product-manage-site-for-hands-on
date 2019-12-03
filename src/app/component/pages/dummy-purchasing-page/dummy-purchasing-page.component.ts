import { AppConst } from 'src/app/const/app-const';
import { RegexConst } from 'src/app/const/regex-const';
import {
  ProductPurchaseRequestDto as ProductPurchaseRequestDto
} from 'src/app/entity/dto/request/product-purchase-request-dto';
import { ProductPurchaseResponseDto } from 'src/app/entity/dto/response/product-purchase-response-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/common/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { ProductPurchaseService } from 'src/app/service/common/product-purchase.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';
import { ProductCodeProductNameValidator } from 'src/app/validator/product-code-product-name-validator';

export interface Genre {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dummy-purchasing-page',
  templateUrl: './dummy-purchasing-page.component.html',
  styleUrls: ['./dummy-purchasing-page.component.scss']
})
export class DummyPurchasingPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private purchaseService: ProductPurchaseService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    public translateService: TranslateService,

  ) { }
  // product code
  productCode = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)
  ]);

  productName = new FormControl('');
  productGenre = new FormControl('');
  productSizeStandard = new FormControl('');
  productPurchaseName = new FormControl('', [Validators.required]);
  productPurchaseUnitPrice = new FormControl('');
  productStockQuantity = new FormControl('');
  productPurchaseQuantity = new FormControl('', [
    Validators.required, Validators.max(999999999), Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);
  productPurchaseAmount = new FormControl('');

  // product image
  productImage = new FormControl(null);

  registeringForm = this.formBuilder.group({
    productCode: this.productCode,
    productName: this.productName,
    productGenre: this.productGenre,
    productSizeStandard: this.productSizeStandard,
    productPurchaseName: this.productPurchaseName,
    productPurchaseUnitPrice: this.productPurchaseUnitPrice,
    productStockQuantity: this.productStockQuantity,
    productPurchaseQuantity: this.productPurchaseQuantity,
    productPurchaseAmount: this.productPurchaseAmount,
    productImage: this.productImage
  }, {
    validators: ProductCodeProductNameValidator.match
  });



  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  genres: Genre[] = [
    { value: '靴・スニーカー', viewValue: '靴・スニーカー' },
    { value: 'トップス', viewValue: 'トップス' },
    { value: 'バッグ', viewValue: 'バッグ' }
  ];

  ngOnInit() {
    this.setupLangage();
  }

  onSave() {
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const purchaseRequestDto: ProductPurchaseRequestDto = this.createPurchaseRequestDto();
        this.save(purchaseRequestDto);
      }
    });
  }

  onBlurProductCode() {
    if (this.productCode.value === '') {
      return;
    }
    this.clear();
    this.loadData();
  }

  onProductPurchaseQuantity() {
    const productPurchaseAmount = this.currencyToNumberPipe.parse(this.productPurchaseUnitPrice.value) *
      this.currencyToNumberPipe.parse(this.productPurchaseQuantity.value);
    this.productPurchaseAmount.setValue(this.currencyToNumberPipe.transform(String(productPurchaseAmount),
      this.locale, this.currency));

  }

  onKey() {
    console.log('onKey');

  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLangage() {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private loadData() {
    this.loadingService.startLoading();

    this.purchaseService.getProductPurchase(this.productCode.value)
      .subscribe(data => {
        this.load(data);
        this.loadingService.stopLoading();
      });
  }

  private save(purchaseRequestDto: ProductPurchaseRequestDto) {
    this.loadingService.startLoading();

    this.purchaseService.createProductPurchase(purchaseRequestDto)
      .subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
  }

  private createPurchaseRequestDto(): ProductPurchaseRequestDto {
    const purchaseRequestDto: ProductPurchaseRequestDto = new ProductPurchaseRequestDto();
    purchaseRequestDto.productCode = this.productCode.value;
    purchaseRequestDto.productPurchaseName = this.productPurchaseName.value;
    purchaseRequestDto.productStockQuantity = this.currencyToNumberPipe.parse(this.productStockQuantity.value);
    purchaseRequestDto.productPurchaseQuantity = this.currencyToNumberPipe.parse(this.productPurchaseQuantity.value);

    return purchaseRequestDto;
  }

  private load(purchaseResponseDto: ProductPurchaseResponseDto) {
    if (purchaseResponseDto === null) {
      return;
    }
    this.productCode.setValue(purchaseResponseDto.productCode);
    this.productName.setValue(purchaseResponseDto.productName);
    this.productGenre.setValue(purchaseResponseDto.productGenre);
    this.productSizeStandard.setValue(purchaseResponseDto.productSizeStandard);
    this.productPurchaseUnitPrice.setValue(this.currencyToNumberPipe.transform(String(purchaseResponseDto.productPurchaseUnitPrice),
      this.locale, this.currency));
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(String(purchaseResponseDto.productStockQuantity),
      this.locale, this.currency));
    this.productImage.setValue(purchaseResponseDto.productImage);
  }

  private extract(purchaseResponseDto: ProductPurchaseResponseDto) {
    if (purchaseResponseDto === null) {
      return;
    }
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(String(purchaseResponseDto.productStockQuantity),
      this.locale, this.currency));
    this.productPurchaseQuantity.reset();
    this.productPurchaseAmount.reset();
  }

  private clear() {
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
