import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

import { NumberCommaPipe } from '../pipes/number-comma.pipe';

@Directive({
  selector: '[appNumberCommaInput]'
})
export class NumberCommaInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private elementRef: ElementRef, private numberCommaPipe: NumberCommaPipe) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;

    this.element.value = this.numberCommaPipe.transform(this.element.value, this.element.getAttribute('locale'));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any) {
    this.element.value = this.numberCommaPipe.parse(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.element.value = this.numberCommaPipe.transform(value, this.element.getAttribute('locale'));
  }
}
