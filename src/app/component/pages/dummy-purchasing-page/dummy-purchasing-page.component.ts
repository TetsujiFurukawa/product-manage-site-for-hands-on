import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { ProductService } from 'src/app/service/common/product.service';
import { AccountService } from 'src/app/service/common/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyToNumberPipe } from 'src/app/pipe/currency-to-number.pipe';
import { TranslateService } from '@ngx-translate/core';
import { UrlConst } from 'src/app/const/url-const';
import { RegexConst } from 'src/app/const/regex-const';
import { EndOfSaleEndOfSaleDateValidator } from 'src/app/validator/end-of-sale-end-of-sale-date-validator';
import { AppConst } from 'src/app/const/app-const';
import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';

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
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    public translateService: TranslateService,

  ) { }
  // product seq
  productSeq = new FormControl('', []);

  // product code
  productCode = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)
  ]);

  // product name
  productName = new FormControl('');

  // product genre
  productGenre = new FormControl('');

  // product size standard
  productSizeStandard = new FormControl('');

  // product color
  productColor = new FormControl('');

  // product unit price
  productPurchaseUnitPrice = new FormControl('', [
    Validators.required, Validators.max(999999999), Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA_PERIOD)
  ]);

  productPurchaseQuantity = new FormControl('');
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
    productUnitPrice: this.productPurchaseUnitPrice,
    productPurchaseQuantity: this.productPurchaseQuantity,
    productPurchaseAmount: this.productPurchaseAmount
  });

  /** other informations */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  /** caption of buttons */
  messagePropertytitle = 'productRegisteringPage.title.new';
  messagePropertySaveButton = 'productRegisteringPage.saveButton.new';

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
        const productDto: ProductDto = this.createDto();
        this.save(productDto);
      }
    });
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
    const productCode = this.route.snapshot.paramMap.get('productCode');
    this.loadingService.startLoading();
    this.productService.getProduct(productCode)
      .subscribe(data => {
        this.extract(data);
        this.loadingService.stopLoading();
      });
  }

  private save(productDto: ProductDto) {
    this.loadingService.startLoading();

    if (productDto.productSeq === undefined || productDto.productSeq === null) {
      // Creates product.
      this.productService.createProduct(productDto)
        .subscribe(data => {
          this.extract(data);
          this.loadingService.stopLoading();
        });
    } else {
      this.productService.updateProduct(productDto)
        .subscribe(data => {
          this.extract(data);
          this.loadingService.stopLoading();
        });
    }
  }

  private createDto(): ProductDto {
    const productDto: ProductDto = new ProductDto();
    if (this.router.url !== '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW) {
      productDto.productSeq = this.productSeq.value;
    }
    productDto.productCode = this.productCode.value;
    productDto.productName = this.productName.value;
    productDto.productGenre = this.productGenre.value;
    productDto.productSizeStandard = this.productSizeStandard.value;
    productDto.productColor = this.productColor.value;
    productDto.productUnitPrice = this.currencyToNumberPipe.parse(this.productPurchaseUnitPrice.value);
    productDto.productImage = this.productImage.value;

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
    this.productPurchaseUnitPrice.setValue(this.currencyToNumberPipe.transform(productDto.productUnitPrice.toString(),
      this.locale, this.currency));
    this.productImage.setValue(productDto.productImage);
  }

}
