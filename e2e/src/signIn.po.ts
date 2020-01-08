import { browser, by, element } from 'protractor';
import { UrlConst } from './url-const';

export class SignInPage {
  private TEST_IDS = {
    SIGN_IN_USER_ACCOUNT: 'signin-user-account',
    SIGN_IN_USER_PASSWORD: 'signin-user-password',
    SIGN_IN_BTN: 'signInBtn',
  };

  signIn(signInUserAccount: string, signInUserPassword: string): SignInPage {
    browser.get('http://localhost:4200/' + UrlConst.PATH_SIGN_IN);
    element(by.id(this.TEST_IDS.SIGN_IN_USER_ACCOUNT)).sendKeys(signInUserAccount);
    element(by.id(this.TEST_IDS.SIGN_IN_USER_PASSWORD)).sendKeys(signInUserPassword);
    element(by.id(this.TEST_IDS.SIGN_IN_BTN)).click();
    return this;
  }

}
