import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';
import { FormattedNumberInputDirective } from './formatted-number-input.directive';

@Component({
  template: ` <input type="text" appFormattedNumberInput locale="ja-JP" /> `
})
class TestFormattedNumberInputComponent {}

const formattedValue = '1,234,567';
const nonFormattedValue = '1234567';

describe('FormattedNumberInputDirective', () => {
  let component: TestFormattedNumberInputComponent;
  let fixture: ComponentFixture<TestFormattedNumberInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedNumberPipe],
      declarations: [TestFormattedNumberInputComponent, FormattedNumberInputDirective]
    });
    fixture = TestBed.createComponent(TestFormattedNumberInputComponent);
    component = fixture.componentInstance;
    hTMLInputElement = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  describe('#onFocus', () => {
    it('should parse', () => {
      hTMLInputElement.value = formattedValue;
      hTMLInputElement.dispatchEvent(new Event('focus', {}));
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe(nonFormattedValue);
    });
  });

  describe('#onBlur', () => {
    it('should transfer', () => {
      hTMLInputElement.value = nonFormattedValue;
      hTMLInputElement.dispatchEvent(new Event('blur', {}));
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe(formattedValue);
    });
  });

  describe('#beforePaste', () => {
    it('should transfer', () => {
      hTMLInputElement.value = formattedValue;
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', '');
      const clipboardEvent = new ClipboardEvent('paste', { clipboardData: dataTransfer });
      hTMLInputElement.dispatchEvent(clipboardEvent);
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe(nonFormattedValue);
    });
  });

  describe('#onKeyUp', () => {
    it('should transfer', () => {
      hTMLInputElement.value = formattedValue;
      hTMLInputElement.dispatchEvent(new Event('keyup', {}));
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe(nonFormattedValue);
    });
  });
});
