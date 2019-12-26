import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const HtmlElementUtility = {
  /**
   * Sets value to htmlinput element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   * @param setValue value to set element
   */
  setValueToHTMLInputElement<T>(fixture: ComponentFixture<T>, querySelector: string, setValue: any) {
    const nativeElement = fixture.nativeElement;
    const htmlInputElement: HTMLInputElement = nativeElement.querySelector(querySelector);
    htmlInputElement.value = setValue;
    htmlInputElement.dispatchEvent(new Event('input'));
    htmlInputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  },

  /**
   * Sets value to html select element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   * @param querySelectorOption css selector string for options
   * @param selectIndex index no to set element
   */
  setValueToHtmlSelectElement<T>(fixture: ComponentFixture<T>, querySelector: string, querySelectorOption: string, selectIndex: number) {
    const nativeElement = fixture.nativeElement;
    const htmlInputElement: HTMLSelectElement = nativeElement.querySelector(querySelector);
    htmlInputElement.click();
    htmlInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const selectOptions = fixture.debugElement.queryAll(By.css(querySelectorOption));
    selectOptions[selectIndex].nativeElement.click();
    fixture.detectChanges();
  },

  /**
   * Clicks html element
   * @template T type of target component
   * @param fixture target fixture
   * @param querySelector css selector string
   */
  clickHtmlElement<T>(fixture: ComponentFixture<T>, querySelector: string) {
    const htmlElement: HTMLElement = fixture.nativeElement.querySelector(querySelector);
    // Clicks checkbox's label
    htmlElement.click();
    fixture.detectChanges();
  }
};
