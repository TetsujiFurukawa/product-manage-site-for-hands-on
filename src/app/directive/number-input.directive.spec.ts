import { CurrencyPipe } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CurrencyToNumberPipe } from '../pipe/currency-to-number.pipe';
import { NumberInputDirective } from './number-input.directive';

@Component({
  template: `
    <input type="text" appNumberInput attr.locale="ja-JP" attr.currency="JPY" />
  `
})
class TestNumberInputDIrectiveComponent {}

// xxdescribe('NumberInputDirective', () => {
//   // it('should create an instance', () => {
//   //   const directive = new NumberInputDirective();
//   //   expect(directive).toBeTruthy();
//   // });
// });
describe('Directive: NumberInput', () => {
  let component: TestNumberInputDIrectiveComponent;
  let fixture: ComponentFixture<TestNumberInputDIrectiveComponent>;
  let inputEl: DebugElement;
  let currencyToNumberPipe: CurrencyToNumberPipe;
  let currencyPipe: CurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyToNumberPipe, CurrencyPipe],
      declarations: [TestNumberInputDIrectiveComponent, NumberInputDirective]
    });

    fixture = TestBed.createComponent(TestNumberInputDIrectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    currencyToNumberPipe = TestBed.get(CurrencyToNumberPipe);
    currencyPipe = TestBed.get(CurrencyPipe);
  });

  it('focused input', () => {
    // inputEl.nativeElement.text = '1,234,567';
    // const test: string[] = new Array('1,234,567');

    inputEl.nativeElement.value = '1,234,567';
    inputEl.nativeElement.dispatchEvent(new Event('focus'));
    // inputEl.triggerEventHandler('focus', test);

    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('1,234,567');

    // inputEl.triggerEventHandler('mouseout', null);
    // fixture.detectChanges();
    // console.log(inputEl.nativeElement.style.backgroundColor);
    // expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
