import { AppConst } from 'src/app/const/app-const';
import { RegexConst } from 'src/app/const/regex-const';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { RoutingService } from 'src/app/service/common/routing.service';
import { TitleI18Service } from 'src/app/service/common/title-i18.service';
import { ProductService } from 'src/app/service/product.service';
import {
  EndOfSaleEndOfSaleDateValidator
} from 'src/app/validator/end-of-sale-end-of-sale-date-validator';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';

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
    private currencyToNumberPipe: CurrencyToNumberPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) { }
  // Called new or update?
  isNew = this.routingService.router.url === '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW;

  // Form controls
  productSeq = new FormControl('', []);

  productCode = new FormControl('', [Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)]);

  productName = new FormControl('', [Validators.required]);

  productGenre = new FormControl('', [Validators.required]);

  productSizeStandard = new FormControl('', [Validators.required]);

  productColor = new FormControl('', []);

  productUnitPrice = new FormControl('', [
    Validators.required,
    Validators.max(999999999),
    Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);

  endOfSale = new FormControl(false, []);
  endOfSaleDate = new FormControl('', []);

  // product image
  productImage = new FormControl(null, []);

  // Other informations
  enterDate = new FormControl(null, []);
  enterUser = new FormControl('', []);
  updateDate = new FormControl(null, []);
  updateUser = new FormControl('', []);

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
      endOfSaleDate: this.endOfSaleDate
    },
    {
      validators: EndOfSaleEndOfSaleDateValidator.match
    }
  );

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  /** caption of buttons */
  messagePropertytitle = 'productRegisteringPage.title.new';
  messagePropertySaveButton = 'productRegisteringPage.saveButton.new';

  genres: string[];

  ngOnInit() {
    this.loadData();
    this.setupLangage();
    if (!this.isNew) {
      this.setupButtonTextToEdit();
      this.loadProductData();
    }
  }

  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_PRODUCT_REGISTERING);
  }

  onFileSelected(files: File) {
    if (files.size === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e: any) => {
      this.productImage.setValue(e.target.result);
    };
  }

  onClear() {
    this.productImage.setValue(null);
  }

  onReturn() {
    this.routingService.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
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
        const productDto: ProductDto = this.createDto(this.isNew);
        this.save(productDto);
      }
    });
  }

  onReceiveEventFromChild(eventData: string) {
    this.endOfSaleDate.setValue(eventData);
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
    const productCode = this.route.snapshot.paramMap.get('productCode');
    this.loadingService.startLoading();
    this.productService.getProduct(productCode).subscribe(data => {
      this.extract(data);
      this.loadingService.stopLoading();
    });
  }

  private save(productDto: ProductDto) {
    this.loadingService.startLoading();

    if (productDto.productSeq === undefined || productDto.productSeq === null) {
      // Creates product.
      this.productService.createProduct(productDto).subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
    } else {
      this.productService.updateProduct(productDto).subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
    }
  }

  private setupButtonTextToEdit() {
    this.messagePropertytitle = 'productRegisteringPage.title.edit';
    this.messagePropertySaveButton = 'productRegisteringPage.saveButton.edit';
  }

  private createDto(isNew: boolean): ProductDto {
    const productDto: ProductDto = new ProductDto();
    if (!isNew) {
      productDto.productSeq = this.productSeq.value;
    }
    productDto.productCode = this.productCode.value;
    productDto.productName = this.productName.value;
    productDto.productGenre = this.productGenre.value;
    productDto.productSizeStandard = this.productSizeStandard.value;
    productDto.productColor = this.productColor.value;
    productDto.productUnitPrice = this.currencyToNumberPipe.parse(this.productUnitPrice.value);
    productDto.endOfSale = this.endOfSale.value;
    productDto.endOfSaleDate = this.endOfSaleDate.value;
    productDto.productImage = this.productImage.value;
    productDto.updateDate = this.updateDate.value;

    return productDto;
  }

  private extract(productDto: ProductDto) {
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
      this.currencyToNumberPipe.transform(productDto.productUnitPrice.toString(), this.locale, this.currency)
    );
    this.endOfSale.setValue(productDto.endOfSale);
    this.endOfSaleDate.setValue(productDto.endOfSaleDate);
    this.productImage.setValue(productDto.productImage);
    this.updateDate.setValue(productDto.updateDate);
  }
}
