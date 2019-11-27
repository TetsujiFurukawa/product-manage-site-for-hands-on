import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CurrencyToNumberPipe } from '../pipe/currency-to-number.pipe';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective implements OnInit {

  private element: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyToNumberPipe: CurrencyToNumberPipe,
  ) {

  }

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.currencyToNumberPipe.transform(
      this.element.value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.currencyToNumberPipe.parse(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.currencyToNumberPipe.transform(
      value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }
}
