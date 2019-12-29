import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyToNumberPipe } from '../pipe/currency-to-number.pipe';
import { NumberInputDirective } from './number-input.directive';

@Component({
  template: `
    <input type="text" appNumberInput locale="ja-JP" currency="JPY" />
  `
})
class TestNumberInputComponent {}

describe('NumberInputDirective', () => {
  let component: TestNumberInputComponent;
  let fixture: ComponentFixture<TestNumberInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyToNumberPipe],
      declarations: [TestNumberInputComponent, NumberInputDirective]
    });
    fixture = TestBed.createComponent(TestNumberInputComponent);
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
