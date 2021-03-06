import { browser, by, element } from 'protractor';

import { UrlConst } from './url-const';

export class SignInPage {
  private TEST_IDS = {
    SIGN_IN_USER_ACCOUNT: 'signin-user-account',
    SIGN_IN_USER_PASSWORD: 'signin-user-password',
    SIGN_IN_BTN: 'sign-in-button'
  };

  /**
   * Clicks sign in button
   * @returns SignInPage
   */
  clickSignInButton(): SignInPage {
    element(by.id(this.TEST_IDS.SIGN_IN_BTN)).click();
    return this;
  }

  /**
   * Setups sign in
   * @param signInUserAccount sign in user account
   * @param signInUserPassword sign in user password
   * @returns SignInPage
   */
  setupSignIn(signInUserAccount: string, signInUserPassword: string): SignInPage {
    browser.get('http://localhost:4200/' + UrlConst.PATH_SIGN_IN);
    element(by.id(this.TEST_IDS.SIGN_IN_USER_ACCOUNT)).sendKeys(signInUserAccount);
    element(by.id(this.TEST_IDS.SIGN_IN_USER_PASSWORD)).sendKeys(signInUserPassword);
    return this;
  }
}
