import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCommaPipe } from '../pipes/currency-comma.pipe';
import { CurrencyCommaInputDirective } from './currency-comma-input.directive';

@Component({
  template: `
    <input type="text" appCurrencyCommaInput locale="ja-JP" currency="JPY" />
  `
})
class TestCurrencyCommaInputComponent {}

describe('CurrencyCommaInputDirective', () => {
  let component: TestCurrencyCommaInputComponent;
  let fixture: ComponentFixture<TestCurrencyCommaInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyCommaPipe],
      declarations: [TestCurrencyCommaInputComponent, CurrencyCommaInputDirective]
    });
    fixture = TestBed.createComponent(TestCurrencyCommaInputComponent);
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
