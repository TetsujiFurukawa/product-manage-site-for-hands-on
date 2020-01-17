import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCommaPipe } from '../pipes/number-comma.pipe';
import { NumberCommaInputDirective } from './number-comma-input.directive';

@Component({
  template: `
    <input type="text" appNumberCommaInput locale="ja-JP" />
  `
})
class TestNumberCommaInputComponent {}

describe('NumberCommaInputDirective', () => {
  let component: TestNumberCommaInputComponent;
  let fixture: ComponentFixture<TestNumberCommaInputComponent>;
  let hTMLInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberCommaPipe],
      declarations: [TestNumberCommaInputComponent, NumberCommaInputDirective]
    });
    fixture = TestBed.createComponent(TestNumberCommaInputComponent);
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
