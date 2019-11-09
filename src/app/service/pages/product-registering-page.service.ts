import { Injectable } from '@angular/core';
import { ProductService } from '../common/product.service';
import { Observable, of } from 'rxjs';
import { ProductDto } from 'src/app/entity/dto/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductRegisteringPageService {

  constructor(
    private productService: ProductService,
  ) { }

  onInit() {
  }

  getProduct(productCode: string): Observable<ProductDto> {
    return this.productService.getProduct(productCode);
  }

  saveProduct(productDto: ProductDto): Observable<ProductDto> {
    if (productDto.productSeq === undefined || productDto.productSeq === null) {
      return this.productService.createProduct(productDto);
    }
    return this.productService.updateProduct(productDto);
  }

  onReturn() {
  }
}
