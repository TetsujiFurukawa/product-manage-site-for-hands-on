import { Component } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';
import { FormattedCurrencyInputDirective } from './formatted-currency-input.directive';

@Component({
  template: ` <input type="text" appFormattedCurrencyInput locale="ja-JP" currency="JPY" /> `
})
class TestFormattedCurrencyInputComponent {}

const formattedValue = '1,234,567';
const nonFormattedValue = '1234567';

describe('FormattedCurrencyInputDirective', () => {
  let component: TestFormattedCurrencyInputComponent;
  let fixture: ComponentFixture<TestFormattedCurrencyInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedCurrencyPipe],
      declarations: [TestFormattedCurrencyInputComponent, FormattedCurrencyInputDirective]
    });
    fixture = TestBed.createComponent(TestFormattedCurrencyInputComponent);
    component = fixture.componentInstance;
    hTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
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

      expect(hTMLInputElement.value).toEqual(nonFormattedValue);
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
