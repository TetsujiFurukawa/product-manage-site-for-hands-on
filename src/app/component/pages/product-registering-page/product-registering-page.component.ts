import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/service/common/loading.service';
import { AccountService } from 'src/app/service/common/account.service';
import { TranslateService } from '@ngx-translate/core';

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
    // private productListingPageService: ProductListingPageService,
    private accountService: AccountService,
    public translateService: TranslateService,

  ) { }

  // product code
  productCode = new FormControl('', []);

  // product name
  productName = new FormControl('', []);

  // product genre
  productGenre = new FormControl('', []);

  // product size standard
  productSizeStandard = new FormControl('', []);

  // product color
  productColor = new FormControl('', []);

  // product unit price
  productUnitPrice = new FormControl('', []);

  // End of sale
  endOfSale = new FormControl(false, []);
  endOfSaleDate = new FormControl('', []);

  registerForm = this.formBuilder.group({
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
    { value: '1', viewValue: '靴・スニーカー' },
    { value: '2', viewValue: 'トップス' },
    { value: '3', viewValue: 'バッグ' }
  ];

  ngOnInit() {
    this.setupLangage();
  }


  private setupLangage() {
    const lang = this.accountService.getUser().userLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }
}
