import { browser } from 'protractor';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

import { DummyPurchasingPage } from './dummy-purchasing-page.po';
import { Header } from './header.po';
import { ProductListingPage } from './product-listing-page.po';
import { ProductRegisteringPage } from './product-registering-page.po';
import { PurchaseHistoryListingPage } from './purchase-history-listing-page.po';
import { SignInPage } from './sign-in-page.po';
import { StockRegisteringPage } from './stock-registering-page.po';
import { UrlConst } from './url-const';

registerLocaleData(localeJa);

const header: Header = new Header();
const signInPage: SignInPage = new SignInPage();
const productListingPage: ProductListingPage = new ProductListingPage();
const productRegisteringPage: ProductRegisteringPage = new ProductRegisteringPage();
const stockRegisteringPage: StockRegisteringPage = new StockRegisteringPage();
const dummyPurchasingPage: DummyPurchasingPage = new DummyPurchasingPage();
const purchaseHistoryListingPage: PurchaseHistoryListingPage = new PurchaseHistoryListingPage();

const now = new Date();
const expectedProductCode = createNewProductCode(now);
const expectdCurrentDate = createFormattedCurrentDate(now);
const expectedProductName = 'Test Product Name';
const expectedProductPurchaseName = '藤田 茂平';

describe('#Senario1 User01 Registers a new product and edits it', () => {
  it('Should sign in as user01', async () => {
    signInPage.setupSignIn('user01', 'demo').clickSignInButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
  });

  it('Should register new product', async () => {
    const expectedProductGenreNth = '1';
    const expectedSearchProductGenreNth = '2';
    const expectedProductSizeStandard = 'Test ProductvSizevStandard';
    const expectedProductColor = 'Test Product Color';
    const expectedProductUnitPrice = '1234';

    // Clicks New button.
    productListingPage.clickNewButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_REGISTERING_NEW));

    // Registers the new product.
    productRegisteringPage
      .setupRegisterProduct(expectedProductCode, expectedProductName, expectedProductGenreNth, expectedProductSizeStandard, expectedProductColor, expectedProductUnitPrice)
      .clickSaveButton();

    // Searches the new product.
    productListingPage
      .setupSearchCriteria(expectedProductName, expectedProductCode, expectedSearchProductGenreNth)
      .clickSearchButton()
      .getSearchResults()
      .then(items => {
        expect(items.length).toEqual(1);
      });

    // Edits the new product.
    productListingPage.clickSearchList(1);
    productRegisteringPage.setupEditProduct(expectedProductName, expectedProductGenreNth, expectedProductSizeStandard, expectedProductColor, expectedProductUnitPrice).clickSaveButton();

    // Signs out.
    header.clickSignOutButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario2 User02 AddS stock of the new product', () => {
  const expectedAddProductStockQuantity = 50;

  it('Should sign in as user02', async () => {
    signInPage.setupSignIn('user02', 'demo').clickSignInButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
  });

  it('Should move to stock registering page', async () => {
    header.clickSubMenuStockRegistering();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_STOCK_REGISTERING));
  });

  it('Should add stock of the new product', async () => {
    // Adds stock of product.
    stockRegisteringPage.setupAddStockOfProduct(expectedProductCode, expectedAddProductStockQuantity).clickSaveButton();

    // Signs out.
    header.clickSignOutButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario3 User99 purchases the new product(for testing)', () => {
  const expectedProductPurchaseName1 = '小野 重三郎';
  const expectedProductPurchaseName2 = '高野 圭織';

  it('Should sign in as user99', async () => {
    signInPage.setupSignIn('user99', 'demo').clickSignInButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
  });

  it('Should move to purchase registering page', async () => {
    header.clickSubMenuDummyPurchasing();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_DUMMY_PURCHASING));
  });

  it('Should purchase the new product', async () => {
    // Purchases the new product.
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName1, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName2, 48).clickSaveButton();

    // Signs out.
    header.clickSignOutButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario4 User01 checks the purchase history of the product', () => {
  const expectedProductPurchaseNameNone = '';

  it('Should sign in as user01', async () => {
    signInPage.setupSignIn('user01', 'demo').clickSignInButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));
  });

  it('Should move to purchase listing page', async () => {
    header.clickSubMenuPurchaseHistoryListing();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_PURCHASE_HISTORY_LISTING));
  });

  it('Should confirm purchase history of the new product', async () => {
    // Confirms purchase history of the new product.
    purchaseHistoryListingPage
      .setupSearchCriteria(expectedProductPurchaseName, expectdCurrentDate, expectdCurrentDate, expectedProductName, expectedProductCode)
      .clickSearchButton()
      .getSearchResults()
      .then(histories => {
        expect(histories.length).toEqual(1);
      });

    purchaseHistoryListingPage
      .clickClearButton()
      .setupSearchCriteria(expectedProductPurchaseNameNone, expectdCurrentDate, expectdCurrentDate, expectedProductName, expectedProductCode)
      .clickSearchButton()
      .getSearchResults()
      .then(histories => {
        expect(histories.length).toEqual(3);
      });

    // Signs out.
    header.clickSignOutButton();
    browser.getCurrentUrl().then(url => expect(url).toEqual(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

function createNewProductCode(date: Date): string {
  const format = 'yyyyMMddhhmmss';
  const locale = 'ja-JP';
  const datePipe = new DatePipe(locale);
  const formattedDate = datePipe.transform(date, format);
  return 'TEST' + formattedDate;
}

function createFormattedCurrentDate(date: Date): string {
  const format = 'yyyy/MM/dd';
  const locale = 'ja-JP';
  const datePipe = new DatePipe(locale);
  const formattedDate = datePipe.transform(date, format);
  return formattedDate;
}
