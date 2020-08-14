import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';
import { FormattedCurrencyInputDirective } from './formatted-currency-input.directive';

@Component({
  template: ` <input type="text" appFormattedCurrencyInput locale="ja-JP" currency="JPY" /> `
})
class TestFormattedCurrencyInputComponent {}

const expectFormattedValue = '1,234,567';
const expectNotFormattedValue = '1234567';

describe('FormattedCurrencyInputDirective', () => {
  let component: TestFormattedCurrencyInputComponent;
  let fixture: ComponentFixture<TestFormattedCurrencyInputComponent>;
  let htmlInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedCurrencyPipe],
      declarations: [TestFormattedCurrencyInputComponent, FormattedCurrencyInputDirective]
    });
    fixture = TestBed.createComponent(TestFormattedCurrencyInputComponent);
    component = fixture.componentInstance;
    htmlInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  describe('#onFocus', () => {
    it('should parse', () => {
      htmlInputElement.value = expectFormattedValue;
      htmlInputElement.dispatchEvent(new Event('focus', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectNotFormattedValue);
    });
  });

  describe('#onBlur', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectNotFormattedValue;
      htmlInputElement.dispatchEvent(new Event('blur', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectFormattedValue);
    });
  });

  describe('#beforePaste', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectFormattedValue;
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', '');
      const clipboardEvent = new ClipboardEvent('paste', { clipboardData: dataTransfer });
      htmlInputElement.dispatchEvent(clipboardEvent);
      fixture.detectChanges();

      expect(htmlInputElement.value).toEqual(expectNotFormattedValue);
    });
  });

  describe('#onKeyUp', () => {
    it('should transfer', () => {
      htmlInputElement.value = expectFormattedValue;
      htmlInputElement.dispatchEvent(new Event('keyup', {}));
      fixture.detectChanges();

      expect(htmlInputElement.value).toBe(expectNotFormattedValue);
    });
  });
});
