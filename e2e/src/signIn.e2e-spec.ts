import { browser } from 'protractor';
import { SignInPage } from './signIn.po';
import { UrlConst } from './url-const';

describe('Should sign in', () => {
  const page: SignInPage = new SignInPage();

  it('signIn', async () => {
    page.signIn('user01', 'demo');
    browser.getCurrentUrl().then(url => expect(url).toEqual('http://localhost:4200/' + UrlConst.PATH_PRODUCT_LISTING));
  });

});
