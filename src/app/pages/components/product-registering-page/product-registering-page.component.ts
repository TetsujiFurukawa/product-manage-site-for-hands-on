import {
    YesNoDialogComponent
} from 'src/app/core/components/yes-no-dialog/yes-no-dialog.component';
import { YesNoDialogData } from 'src/app/core/models/yes-no-dialog-data';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { AppConst } from 'src/app/pages/constants/app-const';
import { RegexConst } from 'src/app/pages/constants/regex-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { ProductDto } from 'src/app/pages/models/dtos/product-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { ProductService } from 'src/app/pages/services/product.service';
import {
    EndOfSaleEndOfSaleDateValidator
} from 'src/app/pages/validators/end-of-sale-end-of-sale-date-validator';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const CHAR_NEW = '/new';

@Component({
  selector: 'app-product-registering-page',
  templateUrl: './product-registering-page.component.html',
  styleUrls: ['./product-registering-page.component.scss']
})
export class ProductRegisteringPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private accountService: AccountService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formattedCurrencyPipe: FormattedCurrencyPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  productSeq = new FormControl('');
  productCode = new FormControl('', [Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)]);
  productName = new FormControl('', [Validators.required]);
  productGenre = new FormControl('', [Validators.required]);
  productSizeStandard = new FormControl('', [Validators.required]);
  productColor = new FormControl('');
  productUnitPrice = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(99999999),
    Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);
  endOfSale = new FormControl(false);
  endOfSaleDate = new FormControl('');
  productImage = new FormControl(null);
  updateDate = new FormControl(null);

  registeringForm = this.formBuilder.group(
    {
      productSeq: this.productSeq,
      productCode: this.productCode,
      productName: this.productName,
      productGenre: this.productGenre,
      productSizeStandard: this.productSizeStandard,
      productColor: this.productColor,
      productUnitPrice: this.productUnitPrice,
      endOfSale: this.endOfSale,
      endOfSaleDate: this.endOfSaleDate,
      productImage: this.productImage,
      updateDate: this.updateDate
    },
    {
      validators: EndOfSaleEndOfSaleDateValidator
    }
  );

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  genres: string[];

  @ViewChild('fileInputElement', { static: true }) public fileInputElement: ElementRef;
  fileReader: FileReader = new FileReader();

  /** Called new or update? */
  isNew = this.routingService.router.url === '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW;
  messagePropertytitle = 'productRegisteringPage.title.new';
  messagePropertySaveButton = 'productRegisteringPage.saveButton.new';

  /**
   * on init
   */
  ngOnInit() {
    this.loadData();
    this.setupLangage();
    if (!this.isNew) {
      this.setupButtonTextToEdit();
      this.getProduct();
    }
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_PRODUCT_REGISTERING);
  }

  /**
   * Clicks product image button
   * @param files image file
   */
  clickProductImageButton(files: File[]) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.fileReader.readAsDataURL(files[0]);
    this.fileReader.onload = (e: any) => {
      this.productImage.setValue(e.target.result);
    };
  }

  /**
   * Clicks clear button
   */
  clickClearButton() {
    this.fileInputElement.nativeElement.value = '';
    this.productImage.setValue(null);
  }

  /**
   * Clicks return button
   */
  clickReturnButton() {
    this.routingService.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
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
        const productDto: ProductDto = this.createProductRegisterRequestDto(this.isNew);
        this.registerProduct(productDto);
      }
    });
  }

  receivedEventFromChild(eventData: string) {
    this.endOfSaleDate.setValue(eventData);
  }

  resetEndOfSaleDate() {
    this.endOfSaleDate.setValue('');
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

  private getProduct() {
    const productCode = this.route.snapshot.paramMap.get('productCode');
    this.loadingService.startLoading();
    this.productService.getProduct(productCode).subscribe((data) => {
      this.extractGetProductResponse(data);
      this.loadingService.stopLoading();
    });
  }

  private registerProduct(productDto: ProductDto) {
    this.loadingService.startLoading();

    if (productDto.productSeq === null) {
      // Creates product.
      this.productService.createProduct(productDto).subscribe((data) => {
        this.extractGetProductResponse(data);
        this.loadingService.stopLoading();
      });
    } else {
      this.productService.updateProduct(productDto).subscribe((data) => {
        this.extractGetProductResponse(data);
        this.loadingService.stopLoading();
      });
    }
  }

  private setupButtonTextToEdit() {
    this.messagePropertytitle = 'productRegisteringPage.title.edit';
    this.messagePropertySaveButton = 'productRegisteringPage.saveButton.edit';
  }

  private createProductRegisterRequestDto(isNew: boolean): ProductDto {
    const productDto: ProductDto = new ProductDto();
    if (!isNew) {
      productDto.productSeq = this.productSeq.value;
    } else {
      productDto.productSeq = null;
    }
    productDto.productCode = this.productCode.value;
    productDto.productName = this.productName.value;
    productDto.productGenre = this.productGenre.value;
    productDto.productSizeStandard = this.productSizeStandard.value;
    productDto.productColor = this.productColor.value;
    productDto.productUnitPrice = this.formattedCurrencyPipe.parse(
      this.productUnitPrice.value,
      this.locale,
      this.currency
    );
    productDto.endOfSale = this.endOfSale.value;
    if (this.endOfSaleDate.value === '') {
      productDto.endOfSaleDate = null;
    } else {
      productDto.endOfSaleDate = this.endOfSaleDate.value;
    }
    productDto.productImage = this.productImage.value;
    productDto.updateDate = this.updateDate.value;

    return productDto;
  }

  private extractGetProductResponse(productDto: ProductDto) {
    if (productDto === null) {
      return;
    }
    this.productSeq.setValue(productDto.productSeq);
    this.productCode.setValue(productDto.productCode);
    this.productName.setValue(productDto.productName);
    this.productGenre.setValue(productDto.productGenre);
    this.productSizeStandard.setValue(productDto.productSizeStandard);
    this.productColor.setValue(productDto.productColor);
    this.productUnitPrice.setValue(
      this.formattedCurrencyPipe.transform(productDto.productUnitPrice.toString(), this.locale, this.currency)
    );
    this.endOfSale.setValue(productDto.endOfSale);
    if (productDto.endOfSaleDate === null) {
      this.endOfSaleDate.setValue('');
    } else {
      this.endOfSaleDate.setValue(productDto.endOfSaleDate);
    }
    this.productImage.setValue(productDto.productImage);
    this.updateDate.setValue(productDto.updateDate);
  }
}
