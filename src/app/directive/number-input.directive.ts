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
    console.log('value before:' + this.element.value);

    this.element.value = this.currencyToNumberPipe.transform(
      this.element.value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));

    console.log('this.element.getAttribute(currency):' + this.element.getAttribute('currency'));
    console.log('this.element.getAttribute(locale):' + this.element.getAttribute('locale'));

    console.log('value after:' + this.element.value);
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
