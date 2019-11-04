import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { AccountService } from 'src/app/service/common/account.service';
import { TranslateService } from '@ngx-translate/core';
import { RegexConst } from 'src/app/const/regex-const';
import { ProductRegisteringPageService } from 'src/app/service/pages/product-registering-page.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';
import { ProductDto } from 'src/app/entity/dto/product-dto';

export interface Genre {
  value: string;
  viewValue: string;
}
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
    public translateService: TranslateService,

  ) { }

  // product code
  productCode = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC_SYMBOLS)
  ]);

  // product name
  productName = new FormControl('', [Validators.required]);

  // product genre
  productGenre = new FormControl('', [Validators.required]);

  // product size standard
  productSizeStandard = new FormControl('', [
    Validators.required, Validators.pattern(RegexConst.SINGLE_BYTE_ALPHANUMERIC_SYMBOLS)]);

  // product color
  productColor = new FormControl('', []);

  // product unit price
  productUnitPrice = new FormControl('', [
    Validators.required
  ]);

  // End of sale
  endOfSale = new FormControl(false, []);
  endOfSaleDate = new FormControl('', []);

  // product image
  productImage = new FormControl('', []);

  imgURL: any;

  registerForm = this.formBuilder.group({
    productCode: this.productCode,
    productName: this.productName,
    productGenre: this.productGenre,
    productSizeStandard: this.productSizeStandard,
    productColor: this.productColor,
    productUnitPrice: this.productUnitPrice,
    endOfSale: this.endOfSale,
    endOfSaleDate: this.endOfSaleDate,
    productImage: this.productImage
  });

  genres: Genre[] = [
    { value: '1', viewValue: '靴・スニーカー' },
    { value: '2', viewValue: 'トップス' },
    { value: '3', viewValue: 'バッグ' }
  ];

  ngOnInit() {
    this.setupLangage();
    this.loadData();
  }

  loadData() {
    if (this.router.url !== '/' + UrlConst.PATH_PRODUCT_REGISTERING + '/new') {
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

    this.productImage.setValue(files.name);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e: any) => {
      this.imgURL = e.target.result;
    };
  }

  onReturn() {
    this.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
  }

  onSave() {

  }

  private setupLangage() {
    const lang = this.accountService.getUser().userLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  extract(productDto: ProductDto) {
    this.productCode.setValue(productDto.productCode);
    this.productName.setValue(productDto.productName);
    this.productGenre.setValue(productDto.productGenre);
    this.productSizeStandard.setValue(productDto.productSizeStandard);
    this.productColor.setValue(productDto.productColor);
    this.productUnitPrice.setValue(productDto.productUnitPrice);
    this.endOfSale.setValue(productDto.endOfSale);
    this.endOfSaleDate.setValue(productDto.endOfSaleDate);
  }

}
