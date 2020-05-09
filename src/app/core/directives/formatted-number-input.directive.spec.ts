import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl } from '@angular/forms';

import { FormattedNumberPipe } from '../pipes/formatted-number.pipe';
import { FormattedNumberInputDirective } from './formatted-number-input.directive';

@Component({
  template: ` <input type="text" appFormattedNumberInput locale="ja-JP" formControlName="formControl" /> `
})
class TestFormattedNumberInputComponent {
  formControl: FormControl;
}

const formattedValue = '1,234,567';
const nonFormattedValue = '1234567';

describe('FormattedNumberInputDirective', () => {
  let component: TestFormattedNumberInputComponent;
  let fixture: ComponentFixture<TestFormattedNumberInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormattedNumberPipe, FormsModule, NgControl],
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

  describe('#beforePaste', () => {
    it('should transfer', () => {
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', formattedValue);
      const clipboardEvent = new ClipboardEvent('paste', { clipboardData: dataTransfer });
      hTMLInputElement.dispatchEvent(clipboardEvent);

      fixture.whenStable().then(() => {
        expect(this.formControl.value).toBe(nonFormattedValue);
      });
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
