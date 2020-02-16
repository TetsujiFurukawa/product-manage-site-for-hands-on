import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';

@Directive({
  selector: '[appFormattedCurrencyInput]'
})
export class FormattedCurrencyInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef, private formattedCurrencyPipe: FormattedCurrencyPipe) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.formattedCurrencyPipe.transform(this.element.value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.formattedCurrencyPipe.parse(value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.formattedCurrencyPipe.transform(value, this.element.getAttribute('locale'), this.element.getAttribute('currency'));
  }
}
