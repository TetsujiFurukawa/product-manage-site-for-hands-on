import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';

const LOCALE = 'locale';
const CLIPBOARD_FORMAT = 'text/plain';

@Directive({
  selector: '[appFormattedNumberInput]'
})
export class FormattedNumberInputDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private formattedNumberPipe: FormattedNumberPipe,
    private ngControl: NgControl
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    const editedValue = this.formattedNumberPipe.transform(this.element.value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * on forcus
   * @param value element's value
   */
  @HostListener('focus', ['$event.target.value'])
  onFocus(value: any): void {
    const editedValue = this.formattedNumberPipe.parse(value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * on blur
   * @param value element's value
   */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any): void {
    const editedValue = this.formattedNumberPipe.transform(value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }

  /**
   * before paste
   * @param clipboardEvent clipboard event
   */
  @HostListener('paste', ['$event'])
  beforePaste(clipboardEvent: ClipboardEvent): void {
    // Kills paste event.
    clipboardEvent.preventDefault();
    const editedValue = this.formattedNumberPipe.parse(
      clipboardEvent.clipboardData.getData(CLIPBOARD_FORMAT),
      this.element.getAttribute(LOCALE)
    );

    // Validation doesn't work well when updates element value like other.
    // So updates value from control only when pasting.
    this.ngControl.control.setValue(editedValue);
  }

  /**
   * on key up
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(): void {
    const editedValue = this.formattedNumberPipe.parse(this.element.value, this.element.getAttribute(LOCALE));
    this.element.value = editedValue;
  }
}
