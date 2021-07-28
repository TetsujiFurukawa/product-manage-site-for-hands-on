import { DummyPurchasingPage } from 'cypress/page-objects/dummy-purchasing-page';
import { HeaderPage } from 'cypress/page-objects/header-page';
import { ProductListingPage } from 'cypress/page-objects/product-listing-page';
import { ProductRegisteringPage } from 'cypress/page-objects/product-registering-page';
import { PurchaseHistoryListingPage } from 'cypress/page-objects/purchase-history-listing-page';
import { SignInPage } from 'cypress/page-objects/sign-in-page';
import { StockRegisteringPage } from 'cypress/page-objects/stock-registering-page';
import { UrlConst } from 'cypress/page-objects/url-const';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

registerLocaleData(localeJa);

const headerPage: HeaderPage = new HeaderPage();
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

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;

describe('#Senario1 User01 registers a new product and edits it', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should register new product', () => {
    const expectedProductGenreNth = productRegisteringPage.TEST_ARGS.GENRE.SNEAKERS_AND_SHOES;
    const expectedSearchProductGenreNth = productListingPage.TEST_ARGS.GENRE.SNEAKERS_AND_SHOES;
    const expectedProductSizeStandard = 'Test ProductvSizevStandard';
    const expectedProductColor = 'Test Product Color';
    const expectedProductUnitPrice = '1234';
    const userAccount = 'user01';
    const passWord = 'demo';

    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));

    // Clicks New button.
    productListingPage.clickNewButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_REGISTERING_NEW));

    // Registers the new product.
    productRegisteringPage
      .setupRegisterProduct(
        expectedProductCode,
        expectedProductName,
        expectedProductGenreNth,
        expectedProductSizeStandard,
        expectedProductColor,
        expectedProductUnitPrice,
        ''
      )
      .clickSaveButton();

    // Searches the new product.
    productListingPage
      .setupSearchCriteria(expectedProductName, expectedProductCode, expectedSearchProductGenreNth, false)
      .clickSearchButton();
    productListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(1));

    // Edits the new product.
    productListingPage.clickSearchList(1);
    productRegisteringPage
      .setupEditProduct(
        expectedProductName,
        expectedProductGenreNth,
        expectedProductSizeStandard,
        expectedProductColor,
        expectedProductUnitPrice,
        ''
      )
      .clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario2 User02 adds stock of the new product', () => {
  const expectedAddProductStockQuantity = 50;
  const userAccount = 'user02';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should add stock of the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));

    // Moves to stock registering page
    headerPage.clickSubMenuStockRegistering();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_STOCK_REGISTERING));

    // Adds stock of product.
    stockRegisteringPage.setupAddStockOfProduct(expectedProductCode, expectedAddProductStockQuantity).clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario3 User99 purchases the new product(for testing)', () => {
  const expectedProductPurchaseName1 = '小野 重三郎';
  const expectedProductPurchaseName2 = '高野 圭織';
  const userAccount = 'user99';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should purchase the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));

    // Moves to purchase registering page.
    headerPage.clickSubMenuDummyPurchasing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_DUMMY_PURCHASING));

    // Purchases the new product.
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName1, 1).clickSaveButton();
    dummyPurchasingPage.setupPurchaseOfProduct(expectedProductCode, expectedProductPurchaseName2, 48).clickSaveButton();

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
  });
});

describe('#Senario4 User01 checks the purchase history of the product', () => {
  const expectedProductPurchaseNameNone = '';
  const userAccount = 'user01';
  const passWord = 'demo';

  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });

  it('Should confirm purchase history of the new product', () => {
    // Signs in.
    signInPage.setupSignIn(userAccount, passWord).clickSignInButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PRODUCT_LISTING));

    // Moves to purchase listing page.
    headerPage.clickSubMenuPurchaseHistoryListing();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_PURCHASE_HISTORY_LISTING));

    // Confirms purchase history of the new product.
    purchaseHistoryListingPage
      .setupSearchCriteria(
        expectedProductPurchaseName,
        expectdCurrentDate,
        expectdCurrentDate,
        expectedProductName,
        expectedProductCode
      )
      .clickSearchButton();
    purchaseHistoryListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(1));

    purchaseHistoryListingPage
      .clickClearButton()
      .setupSearchCriteria(
        expectedProductPurchaseNameNone,
        expectdCurrentDate,
        expectdCurrentDate,
        expectedProductName,
        expectedProductCode
      )
      .clickSearchButton();
    purchaseHistoryListingPage.getSearchResultRows().should((rows) => expect(rows).to.have.lengthOf(3));

    // Signs out.
    headerPage.clickSignOutButton();
    cy.url().should((url) => expect(url).equal(UrlConst.PATH_CONTEXT + UrlConst.PATH_SIGN_IN));
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
