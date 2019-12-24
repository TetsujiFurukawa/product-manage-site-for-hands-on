import { AppConst } from 'src/app/const/app-const';
import { RegexConst } from 'src/app/const/regex-const';
import { UrlConst } from 'src/app/const/url-const';
import { ProductStockRequestDto } from 'src/app/entity/dto/request/product-stock-request-dto';
import { ProductStockResponseDto } from 'src/app/entity/dto/response/product-stock-response-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductStockService } from 'src/app/service/product-stock.service';
import { ProductService } from 'src/app/service/product.service';
import {
  ProductCodeProductNameValidator
} from 'src/app/validator/product-code-product-name-validator';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-stock-registering-page',
  templateUrl: './stock-registering-page.component.html',
  styleUrls: ['./stock-registering-page.component.scss']
})
export class StockRegisteringPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private productStockService: ProductStockService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) { }
  // product code
  productCode = new FormControl('', [Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)]);

  productName = new FormControl('');
  productGenre = new FormControl('');
  productSizeStandard = new FormControl('');
  productStockQuantity = new FormControl('');
  addProductStockQuantity = new FormControl('', [Validators.required, Validators.max(999999999), Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)]);
  // product image
  productImage = new FormControl(null);

  registeringForm = this.formBuilder.group(
    {
      productCode: this.productCode,
      productName: this.productName,
      productGenre: this.productGenre,
      productSizeStandard: this.productSizeStandard,
      productStockQuantity: this.productStockQuantity,
      addProductStockQuantity: this.addProductStockQuantity,
      productImage: this.productImage
    },
    {
      validators: ProductCodeProductNameValidator.match
    }
  );

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  genres: string[];

  ngOnInit() {
    this.loadData();
    this.setupLangage();
  }

  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_STOCK_REGISTERING);
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
        const productStockRequestDto: ProductStockRequestDto = this.createProductStockRequestDto();
        this.save(productStockRequestDto);
      }
    });
  }

  onBlurProductCode() {
    if (this.productCode.value === '') {
      return;
    }
    this.clear();
    this.loadProductData();
  }

  onKey() {
    console.log('onKey');
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private loadData() {
    this.productService.getGenres().subscribe(data => (this.genres = data));
  }

  private setupLangage() {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private loadProductData() {
    this.loadingService.startLoading();

    this.productStockService.getProductStock(this.productCode.value).subscribe(data => {
      this.load(data);
      this.loadingService.stopLoading();
    });
  }

  private save(productStockRequestDto: ProductStockRequestDto) {
    this.loadingService.startLoading();

    this.productStockService.updateProductStock(productStockRequestDto).subscribe(data => {
      this.extract(data);
      this.loadingService.stopLoading();
    });
  }

  private createProductStockRequestDto(): ProductStockRequestDto {
    const productStockRequestDto: ProductStockRequestDto = new ProductStockRequestDto();
    productStockRequestDto.productCode = this.productCode.value;
    productStockRequestDto.productStockQuantity = this.currencyToNumberPipe.parse(this.productStockQuantity.value);
    productStockRequestDto.addProductStockQuantity = this.currencyToNumberPipe.parse(this.addProductStockQuantity.value);

    return productStockRequestDto;
  }

  private load(productStockResponseDto: ProductStockResponseDto) {
    if (productStockResponseDto === null) {
      return;
    }
    this.productCode.setValue(productStockResponseDto.productCode);
    this.productName.setValue(productStockResponseDto.productName);
    this.productGenre.setValue(productStockResponseDto.productGenre);
    this.productSizeStandard.setValue(productStockResponseDto.productSizeStandard);
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(String(productStockResponseDto.productStockQuantity), this.locale, this.currency));
    this.productImage.setValue(productStockResponseDto.productImage);
  }

  private extract(productStockResponseDto: ProductStockResponseDto) {
    if (productStockResponseDto === null) {
      return;
    }
    this.productStockQuantity.setValue(this.currencyToNumberPipe.transform(String(productStockResponseDto.productStockQuantity), this.locale, this.currency));
    this.addProductStockQuantity.reset();
  }

  private clear() {
    this.productName.reset();
    this.productGenre.reset();
    this.productSizeStandard.reset();
    this.productStockQuantity.reset();
    this.productStockQuantity.reset();
    this.addProductStockQuantity.reset();
  }
}
