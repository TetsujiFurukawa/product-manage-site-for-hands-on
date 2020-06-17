import {
    YesNoDialogComponent
} from 'src/app/core/components/yes-no-dialog/yes-no-dialog.component';
import { YesNoDialogData } from 'src/app/core/models/yes-no-dialog-data';
import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AppConst } from 'src/app/pages/constants/app-const';
import { RegexConst } from 'src/app/pages/constants/regex-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductStockService } from 'src/app/pages/services/product-stock.service';
import { ProductService } from 'src/app/pages/services/product.service';
import {
    ProductCodeProductNameValidator
} from 'src/app/pages/validators/product-code-product-name-validator';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { ProductStockRequest } from '../../models/interfaces/requests/product-stock-request';
import {
    ProductStockResponseDto
} from '../../models/interfaces/responses/product-stock-response-dto';

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
    private formattedNumberPipe: FormattedNumberPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  productCode = new FormControl('');
  productName = new FormControl('');
  productGenre = new FormControl('');
  productSizeStandard = new FormControl('');
  productStockQuantity = new FormControl('');
  addProductStockQuantity = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(99999999),
    Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);
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
      validators: ProductCodeProductNameValidator
    }
  );

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;

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
    this.titleI18Service.setTitle(UrlConst.PATH_STOCK_REGISTERING);
  }

  /**
   * Blurs product code
   */
  blurProductCode() {
    if (this.productCode.value === '') {
      return;
    }
    this.resetStockRegisteringControls();
    this.getProductStock();
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
        const productStockRequest: ProductStockRequest = this.createProductStockRequestDto();
        this.updateProductStock(productStockRequest);
      }
    });
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

  private getProductStock() {
    this.loadingService.startLoading();

    this.productStockService.getProductStock(this.productCode.value).subscribe((data) => {
      this.extractGetProductStockResponse(data);
      this.loadingService.stopLoading();
    });
  }

  private updateProductStock(productStockRequest: ProductStockRequest) {
    this.loadingService.startLoading();

    this.productStockService.updateProductStock(productStockRequest).subscribe((data) => {
      this.extractUpdateProductStockResponse(data);
      this.loadingService.stopLoading();
    });
  }

  private createProductStockRequestDto(): ProductStockRequest {
    const productStockRequest: ProductStockRequest = {
      productCode: this.productCode.value,
      productStockQuantity: this.formattedNumberPipe.parse(this.productStockQuantity.value, this.locale),
      addProductStockQuantity: this.formattedNumberPipe.parse(this.addProductStockQuantity.value, this.locale)
    };
    return productStockRequest;
  }

  private extractGetProductStockResponse(productStockResponseDto: ProductStockResponseDto) {
    if (productStockResponseDto === null) {
      return;
    }
    this.productName.setValue(productStockResponseDto.productName);
    this.productGenre.setValue(this.translateService.instant('genre.' + productStockResponseDto.productGenre));
    this.productSizeStandard.setValue(productStockResponseDto.productSizeStandard);
    this.productStockQuantity.setValue(
      this.formattedNumberPipe.transform(String(productStockResponseDto.productStockQuantity), this.locale)
    );
    this.productImage.setValue(productStockResponseDto.productImage);
  }

  private extractUpdateProductStockResponse(productStockResponseDto: ProductStockResponseDto) {
    if (productStockResponseDto === null) {
      return;
    }
    this.productStockQuantity.setValue(
      this.formattedNumberPipe.transform(String(productStockResponseDto.productStockQuantity), this.locale)
    );
    this.addProductStockQuantity.reset();
  }

  private resetStockRegisteringControls() {
    this.productName.reset();
    this.productGenre.reset();
    this.productSizeStandard.reset();
    this.productStockQuantity.reset();
    this.productStockQuantity.reset();
    this.addProductStockQuantity.reset();
  }
}
