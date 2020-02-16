import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';
import { FormattedNumberInputDirective } from './formatted-number-input.directive';

@Component({
  template: `
    <input type="text" appFormattedNumberInput locale="ja-JP" />
  `
})
class TestFormattedNumberInputComponent {}

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
