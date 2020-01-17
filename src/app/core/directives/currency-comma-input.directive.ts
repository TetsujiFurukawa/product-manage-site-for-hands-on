import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { CurrencyCommaPipe } from '../pipes/currency-comma.pipe';

@Directive({
  selector: '[appCurrencyCommaInput]'
})
export class CurrencyCommaInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef, private currencyCommaPipe: CurrencyCommaPipe) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.currencyCommaPipe.transform(this.element.value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.currencyCommaPipe.parse(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.currencyCommaPipe.transform(value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }
}
