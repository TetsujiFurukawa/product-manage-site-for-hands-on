import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { AccountService } from 'src/app/service/common/account.service';
import { TranslateService } from '@ngx-translate/core';
import { RegexConst } from 'src/app/const/regex-const';
import { ProductRegisteringPageService } from 'src/app/service/pages/product-registering-page.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { YesNoDialogComponent } from '../../common/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppConst } from 'src/app/const/app-const';
import { SuccessMessagingService } from 'src/app/service/common/success-messaging.service';

export interface Genre {
  value: string;
  viewValue: string;
}
const CHAR_NEW = '/new';

@Component({
  selector: 'app-product-registering-page',
  templateUrl: './product-registering-page.component.html',
  styleUrls: ['./product-registering-page.component.scss']
})
export class ProductRegisteringPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productRegisteringPageService: ProductRegisteringPageService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public translateService: TranslateService,
    @Inject(LOCALE_ID) public locale: string,

  ) { }
  // Called new or update?
  isNew = this.router.url === '/' + UrlConst.PATH_PRODUCT_REGISTERING + CHAR_NEW;

  // product seq
  productSeq = new FormControl('', []);

  // product code
  productCode = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC)
  ]);

  // product name
  productName = new FormControl('', [Validators.required]);

  // product genre
  productGenre = new FormControl('', [Validators.required]);

  // product size standard
  productSizeStandard = new FormControl('', [Validators.required]);

  // product color
  productColor = new FormControl('', []);

  // product unit price
  productUnitPrice = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.HALF_WIDTH_ALPHANUMERIC_COMMA)
  ]);

  // End of sale
  endOfSale = new FormControl(false, []);
  endOfSaleDate = new FormControl('', []);

  // product image
  productImage = new FormControl(null, []);

  // Other informations
  enterDate = new FormControl(null, []);
  enterUser = new FormControl('', []);
  updateDate = new FormControl(null, []);
  updateUser = new FormControl('', []);

  registeringForm = this.formBuilder.group({
    productSeq: this.productSeq,
    productCode: this.productCode,
    productName: this.productName,
    productGenre: this.productGenre,
    productSizeStandard: this.productSizeStandard,
    productColor: this.productColor,
    productUnitPrice: this.productUnitPrice,
    endOfSale: this.endOfSale,
    endOfSaleDate: this.endOfSaleDate
  });

  genres: Genre[] = [
    { value: '靴・スニーカー', viewValue: '靴・スニーカー' },
    { value: 'トップス', viewValue: 'トップス' },
    { value: 'バッグ', viewValue: 'バッグ' }
  ];

  ngOnInit() {
    this.setupLangage();
    this.loadData();
  }

  loadData() {
    if (!this.isNew) {
      const productCode = this.route.snapshot.paramMap.get('productCode');
      this.loadingService.startLoading();
      this.productRegisteringPageService.getProduct(productCode)
        .subscribe(data => {
          this.extract(data);
          this.loadingService.stopLoading();
        });
    }
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
    this.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
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

  private save(productDto: ProductDto) {
    this.loadingService.startLoading();
    this.productRegisteringPageService.saveProduct(productDto)
      .subscribe(data => {
        this.loadingService.stopLoading();
      });
  }

  private setupLangage() {
    const lang = this.accountService.getUser().userLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
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
    productDto.productUnitPrice = this.productUnitPrice.value;
    productDto.endOfSale = this.endOfSale.value;
    productDto.endOfSaleDate = this.endOfSaleDate.value;
    productDto.productImage = this.productImage.value;
    productDto.enterUser = this.enterUser.value;
    productDto.enterDate = this.enterDate.value;
    productDto.updateUser = this.updateUser.value;
    productDto.updateDate = this.updateDate.value;

    return productDto;
  }

  private extract(productDto: ProductDto) {
    this.productSeq.setValue(productDto.productSeq);
    this.productCode.setValue(productDto.productCode);
    this.productName.setValue(productDto.productName);
    this.productGenre.setValue(productDto.productGenre);
    this.productSizeStandard.setValue(productDto.productSizeStandard);
    this.productColor.setValue(productDto.productColor);
    this.productUnitPrice.setValue(productDto.productUnitPrice);
    this.endOfSale.setValue(productDto.endOfSale);
    this.endOfSaleDate.setValue(productDto.endOfSaleDate);
    this.productImage.setValue(productDto.productImage);
    this.enterUser.setValue(productDto.enterUser);
    this.enterDate.setValue(productDto.enterDate);
    this.updateUser.setValue(productDto.updateUser);
    this.updateDate.setValue(productDto.updateDate);
  }

  private clearControls() {
    this.productSeq.setValue(null);
    this.productCode.setValue('');
    this.productName.setValue('');
    this.productGenre.setValue('');
    this.productSizeStandard.setValue('');
    this.productColor.setValue('');
    this.productUnitPrice.setValue('');
    this.endOfSale.setValue(false);
    this.endOfSaleDate.setValue(new Date());
    this.productImage.setValue(null);
    this.enterUser.setValue('');
    this.enterDate.setValue(null);
    this.updateUser.setValue('');
    this.updateDate.setValue(null);

  }

  onReceiveEventFromChild(eventData: string) {
    this.endOfSaleDate.setValue(eventData);
  }
}
