import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedCurrencyPipe } from '../pipes/formatted-currency.pipe';
import { FormattedCurrencyInputDirective } from './formatted-currency-input.directive';

@Component({
  template: `
    <input type="text" appFormattedCurrencyInput locale="ja-JP" currency="JPY" />
  `
})
class TestFormattedCurrencyInputComponent {}

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
    hTMLInputElement = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  describe('#onFocus', () => {
    it('should parse', () => {
      hTMLInputElement.value = '1,234,567';
      hTMLInputElement.dispatchEvent(new Event('focus', {}));
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe('1234567');
    });
  });

  describe('#onBlur', () => {
    it('should transfer', () => {
      hTMLInputElement.value = '1234567';
      hTMLInputElement.dispatchEvent(new Event('blur', {}));
      fixture.detectChanges();

      expect(hTMLInputElement.value).toBe('1,234,567');
    });
  });
});
