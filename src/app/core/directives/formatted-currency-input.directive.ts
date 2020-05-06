import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';

const LOCALE = 'locale';
const CURRENCY = 'currency';

@Directive({
  selector: '[appFormattedCurrencyInput]'
})
export class FormattedCurrencyInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private formattedCurrencyPipe: FormattedCurrencyPipe,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.formattedCurrencyPipe.transform(
      this.element.value,
      this.element.getAttribute(LOCALE),
      this.element.getAttribute(CURRENCY)
    );
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.formattedCurrencyPipe.parse(
      value,
      this.element.getAttribute(LOCALE),
      this.element.getAttribute(CURRENCY)
    );
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.formattedCurrencyPipe.transform(
      value,
      this.element.getAttribute(LOCALE),
      this.element.getAttribute(CURRENCY)
    );
  }

  @HostListener('paste', ['$event'])
  blockPaste(clipboardEvent: ClipboardEvent, event: Event) {
    const clipboardFormat = 'text/plain';

    const value = this.formattedCurrencyPipe.parse(
      clipboardEvent.clipboardData.getData(clipboardFormat),
      this.element.getAttribute(LOCALE),
      this.element.getAttribute(CURRENCY)
    );

    this.element.value = value;
    clipboardEvent.clipboardData.setData(clipboardFormat, value);
    clipboardEvent.preventDefault();

    this.ngControl.control.setValue(value);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp() {
    this.element.value = this.formattedCurrencyPipe.parse(
      this.element.value,
      this.element.getAttribute(LOCALE),
      this.element.getAttribute(CURRENCY)
    );
  }
}
