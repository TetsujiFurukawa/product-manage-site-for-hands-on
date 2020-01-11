import { browser } from 'protractor';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

import { Header } from './header.po';
import { ProductListingPage } from './product-listing.po';
import { ProductRegisteringPage } from './product-registering.po';
import { SignInPage } from './signIn.po';
import { UrlConst } from './url-const';

const signInPage: SignInPage = new SignInPage();
const productListingPage: ProductListingPage = new ProductListingPage();
const productRegisteringPage: ProductRegisteringPage = new ProductRegisteringPage();
const header: Header = new Header();

registerLocaleData(localeJa);

describe('New Product register and edit Senario', () => {
  it('Shoulde signIn', async () => {
    signInPage.signIn('user01', 'demo');
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
  });

  it('Shoulde register new product', async () => {
    const expectedProductCode = createNewProductCode();
    const expectedProductName = 'Test Product Name';
    const expectedProductGenreNth = '1';
    const expectedSearchProductGenreNth = '2';
    const expectedProductSizeStandard = 'Test ProductvSizevStandard';
    const expectedProductColor = 'Test Product Color';
    const expectedProductUnitPrice = '1234';

    // Clicks New button.
    productListingPage.clickNewButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_REGISTERING_NEW));

    // Registers the new product.
    productRegisteringPage.register(expectedProductCode, expectedProductName, expectedProductGenreNth, expectedProductSizeStandard, expectedProductColor, expectedProductUnitPrice);

    // Searches the new product.
    productListingPage.setupSearchCriteria(expectedProductName, expectedProductCode, expectedSearchProductGenreNth);
    productListingPage.clickSearchButton();
    console.log(productListingPage.getSearchResults());
    productListingPage.getSearchResults().then(items => {
      expect(items.length).toEqual(1);
    });

    // Edits the new product.
    productListingPage.clickSearchList(1);
    productRegisteringPage.edit(expectedProductName, expectedProductGenreNth, expectedProductSizeStandard, expectedProductColor, expectedProductUnitPrice);

    // Signs out.
    header.clickSignOutButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

function createNewProductCode(): string {
  const format = 'yyyyMMddhhmmss';
  const locale = 'ja-JP';
  const datePipe = new DatePipe(locale);
  const formattedDate = datePipe.transform(new Date(), format);
  return 'TEST' + formattedDate;
}
