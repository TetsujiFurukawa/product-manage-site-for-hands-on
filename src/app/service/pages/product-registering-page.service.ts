import { Injectable } from '@angular/core';
import { ProductService } from '../common/product.service';
import { Router } from '@angular/router';
import { UrlConst } from 'src/app/const/url-const';

@Injectable({
  providedIn: 'root'
})
export class ProductRegisteringPageService {

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }


  onReturn() {
    this.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
  }
}
