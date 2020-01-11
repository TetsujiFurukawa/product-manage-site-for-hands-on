import { by, element } from 'protractor';

export class Header {
  private TEST_IDS = {
    SIGN_OUT_BUTTON: 'sign-out-button',
    YES_NO_DIALOG_BUTTON_YES: 'yesNoDialog_button_yes'
  };

  clickSignOutButton(): Header {
    element(by.id(this.TEST_IDS.SIGN_OUT_BUTTON)).click();
    element(by.id(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES)).click();
    return this;
  }
}
