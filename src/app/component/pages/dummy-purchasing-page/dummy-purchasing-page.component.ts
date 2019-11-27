import { AppConst } from 'src/app/const/app-const';
import { RegexConst } from 'src/app/const/regex-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { PurchaseDto } from 'src/app/entity/dto/purchase-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/common/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { ProductService } from 'src/app/service/common/product.service';
import { PurchaseService } from 'src/app/service/common/purchase.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';
import { ProductStockDto } from 'src/app/entity/dto/product-stock-dto';

export interface Genre {
  value: string;
  viewValue: string;
}
const CHAR_NEW = '/new';

@Component({
  selector: 'app-dummy-purchasing-page',
  templateUrl: './dummy-purchasing-page.component.html',
  styleUrls: ['./dummy-purchasing-page.component.scss']
})
export class DummyPurchasingPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    public translateService: TranslateService,

  ) { }
  // form controls
  productSeq = new FormControl('', []);

  // product code
  productCode = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)
  ]);

  productName = new FormControl('');
  productGenre = new FormControl('');
  productSizeStandard = new FormControl('');
  productColor = new FormControl('');
  productPurchaseUnitPrice = new FormControl('');
  productStockQuantity = new FormControl('');
  productPurchaseQuantity = new FormControl('', [
    Validators.required, Validators.max(999999999), Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);
  productPurchaseAmount = new FormControl('');

  // product image
  productImage = new FormControl(null);

  registeringForm = this.formBuilder.group({
    productSeq: this.productSeq,
    productCode: this.productCode,
    productName: this.productName,
    productGenre: this.productGenre,
    productSizeStandard: this.productSizeStandard,
    productColor: this.productColor,
    productPurchaseUnitPrice: this.productPurchaseUnitPrice,
    productStockQuantity: this.productStockQuantity,
    productPurchaseQuantity: this.productPurchaseQuantity,
    productPurchaseAmount: this.productPurchaseAmount,
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
        const purchaseDto: PurchaseDto = this.createDto();
        this.save(purchaseDto);
      }
    });
  }

  onBlur() {
    this.loadData();
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
    this.productService.getProductStock(this.productCode.value)
      .subscribe(data => {
        this.load(data);
        this.loadingService.stopLoading();
      });
  }

  private save(purchaseDto: PurchaseDto) {
    this.loadingService.startLoading();

    this.purchaseService.createPurchase(purchaseDto)
      .subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
  }

  private createDto(): PurchaseDto {
    const purchaseDto: PurchaseDto = new PurchaseDto();
    purchaseDto.productCode = this.productCode.value;
    purchaseDto.productStockQuantity = this.currencyToNumberPipe.parse(this.productStockQuantity.value);
    purchaseDto.productPurchaseQuantity = this.currencyToNumberPipe.parse(this.productPurchaseQuantity.value);

    return purchaseDto;
  }

  private load(productStockDto: ProductStockDto) {
    this.productCode.setValue(productStockDto.productCode);
    this.productName.setValue(productStockDto.productName);
    this.productGenre.setValue(productStockDto.productGenre);
    this.productSizeStandard.setValue(productStockDto.productSizeStandard);
    this.productColor.setValue(productStockDto.productColor);
    this.productPurchaseUnitPrice.setValue(this.currencyToNumberPipe.transform(productStockDto.productUnitPrice.toString(),
      this.locale, this.currency));
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(productStockDto.productStockQuantity.toString(),
      this.locale, this.currency));
  }

  private extract(purchaseDto: PurchaseDto) {
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(purchaseDto.productStockQuantity.toString(),
      this.locale, this.currency));
    this.productPurchaseQuantity.setValue(this.currencyToNumberPipe.transform(purchaseDto.productPurchaseQuantity.toString(),
      this.locale, this.currency));
  }

}
