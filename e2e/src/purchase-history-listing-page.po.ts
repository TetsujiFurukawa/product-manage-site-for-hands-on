import { by, element, ElementArrayFinder } from 'protractor';

export class PurchaseHistoryListingPage {
  private TEST_IDS = {
    PRODUCT_PURCHASE_NAME: 'product-purchase-name',
    PRODUCT_PURCHASE_DATE_FROM: 'product-purchase-date-from',
    PRODUCT_PURCHASE_DATE_TO: 'product-purchase-date-to',
    PRODUCT_NAME: 'product-name',
    PRODUCT_CODE: 'product-code',
    SEARCH_RESULT: '.results > tbody > tr',
    CLEAR_BUTTON: 'clear-button',
    SEARCH_BUTTON: 'search-button'
  };

  /**
   * Clicks clear button
   * @returns PurchaseHistoryListingPage
   */
  clickClearButton(): PurchaseHistoryListingPage {
    element(by.id(this.TEST_IDS.CLEAR_BUTTON)).click();
    return this;
  }

  /**
   * Clicks search button
   * @returns PurchaseHistoryListingPage
   */
  clickSearchButton(): PurchaseHistoryListingPage {
    element(by.id(this.TEST_IDS.SEARCH_BUTTON)).click();
    return this;
  }

  /**
   * Clicks search list
   * @param rowNo row no
   * @returns PurchaseHistoryListingPage
   */
  clickSearchList(rowNo: number): PurchaseHistoryListingPage {
    element(by.css(this.TEST_IDS.SEARCH_RESULT + ':nth-child(' + rowNo + ')')).click();
    return this;
  }

  /**
   * Setups search criteria
   * @param productPurchaseName product purchase name
   * @param productPurchaseDateFrom product purchase date from
   * @param productPurchaseDateTo product purchase date to
   * @param productName product name
   * @param productCode product code
   * @returns PurchaseHistoryListingPage
   */
  setupSearchCriteria(productPurchaseName: string, productPurchaseDateFrom: string, productPurchaseDateTo: string, productName: string, productCode: string): PurchaseHistoryListingPage {
    element(by.id(this.TEST_IDS.PRODUCT_PURCHASE_NAME)).sendKeys(productPurchaseName);
    element(by.id(this.TEST_IDS.PRODUCT_PURCHASE_DATE_FROM)).sendKeys(productPurchaseDateFrom);
    element(by.id(this.TEST_IDS.PRODUCT_PURCHASE_DATE_TO)).sendKeys(productPurchaseDateTo);
    element(by.id(this.TEST_IDS.PRODUCT_NAME)).sendKeys(productName);
    element(by.id(this.TEST_IDS.PRODUCT_CODE)).sendKeys(productCode);
    return this;
  }

  /**
   * Gets search results
   * @returns search ElementArrayFinder
   */
  getSearchResults(): ElementArrayFinder {
    return element.all(by.css(this.TEST_IDS.SEARCH_RESULT));
  }
}
