import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';

@Directive({
  selector: '[appFormattedNumberInput]'
})
export class FormattedNumberInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef, private formattedNumberPipe: FormattedNumberPipe) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.formattedNumberPipe.transform(this.element.value, this.element.getAttribute('locale'));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.formattedNumberPipe.parse(value, this.element.getAttribute('locale'));
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.formattedNumberPipe.transform(value, this.element.getAttribute('locale'));
  }
}
