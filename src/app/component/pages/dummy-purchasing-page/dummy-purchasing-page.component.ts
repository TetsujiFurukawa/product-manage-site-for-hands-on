import { AppConst } from 'src/app/const/app-const';
import { RegexConst } from 'src/app/const/regex-const';
import {
  PurchaseRequestDto as PurchaseRequestDto
} from 'src/app/entity/dto/request/purchase-request-dto';
import { PurchaseResponseDto } from 'src/app/entity/dto/response/purchase-response-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/common/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { PurchaseService } from 'src/app/service/common/purchase.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';

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
    private purchaseService: PurchaseService,
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
        const purchaseRequestDto: PurchaseRequestDto = this.createPurchaseRequestDto();
        this.save(purchaseRequestDto);
      }
    });
  }

  onBlur() {
    if (this.productCode.value === '') {
      return;
    }
    this.clear();
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

    this.purchaseService.getPurchase(this.productCode.value)
      .subscribe(data => {
        this.load(data);
        this.loadingService.stopLoading();
      });
  }

  private save(purchaseRequestDto: PurchaseRequestDto) {
    this.loadingService.startLoading();

    this.purchaseService.createPurchase(purchaseRequestDto)
      .subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
  }

  private createPurchaseRequestDto(): PurchaseRequestDto {
    const purchaseRequestDto: PurchaseRequestDto = new PurchaseRequestDto();
    purchaseRequestDto.productCode = this.productCode.value;
    purchaseRequestDto.productPurchaseName = this.productPurchaseName.value;
    purchaseRequestDto.productStockQuantity = this.currencyToNumberPipe.parse(this.productStockQuantity.value);
    purchaseRequestDto.productPurchaseQuantity = this.currencyToNumberPipe.parse(this.productPurchaseQuantity.value);

    return purchaseRequestDto;
  }

  private load(purchaseResponseDto: PurchaseResponseDto) {
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

  private extract(purchaseResponseDto: PurchaseResponseDto) {
    if (purchaseResponseDto === null) {
      return;
    }
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(String(purchaseResponseDto.productStockQuantity),
      this.locale, this.currency));
    this.productPurchaseQuantity.setValue(0);
    this.productPurchaseAmount.setValue(0);
  }

  private clear() {
    this.productName.setValue('');
    this.productGenre.setValue('');
    this.productSizeStandard.setValue('');
    this.productPurchaseName.setValue('');
    this.productPurchaseUnitPrice.setValue('');
    this.productStockQuantity.setValue('');
    this.productPurchaseQuantity.setValue('');
    this.productPurchaseAmount.setValue('');
  }
}
