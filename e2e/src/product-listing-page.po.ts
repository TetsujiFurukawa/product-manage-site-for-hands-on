import { by, element, ElementArrayFinder } from 'protractor';

export class ProductListingPage {
  private TEST_IDS = {
    PRODUCT_NAME: 'product-name',
    PRODUCT_CODE: 'product-code',
    PRODUCT_GENRE: 'product-genre',
    PRODUCT_GENRE_OPTIONS: '.product-genre-option',
    SEARCH_RESULT: '.search-results > tbody > tr',
    NEW_BUTTON: 'new-button',
    CLEAR_BUTTON: 'clear-button',
    SEARCH_BUTTON: 'search-button'
  };

  /**
   * Clicks new button
   * @returns ProductListingPage
   */
  clickNewButton(): ProductListingPage {
    element(by.id(this.TEST_IDS.NEW_BUTTON)).click();
    return this;
  }

  /**
   * Clicks clear button
   * @returns ProductListingPage
   */
  clickClearButton(): ProductListingPage {
    element(by.id(this.TEST_IDS.CLEAR_BUTTON)).click();
    return this;
  }

  /**
   * Clicks search button
   * @returns ProductListingPage
   */
  clickSearchButton(): ProductListingPage {
    element(by.id(this.TEST_IDS.SEARCH_BUTTON)).click();
    return this;
  }

  /**
   * Clicks search list
   * @param rowNo row no
   * @returns ProductListingPage
   */
  clickSearchList(rowNo: number): ProductListingPage {
    element(by.css(this.TEST_IDS.SEARCH_RESULT + ':nth-child(' + rowNo + ')')).click();
    return this;
  }

  /**
   * Setups search criteria
   * @param productName product name
   * @param productCode product code
   * @param productGenre product genre
   * @returns ProductListingPage
   */
  setupSearchCriteria(productName: string, productCode: string, productGenre: string): ProductListingPage {
    element(by.id(this.TEST_IDS.PRODUCT_NAME)).sendKeys(productName);
    element(by.id(this.TEST_IDS.PRODUCT_CODE)).sendKeys(productCode);
    element(by.id(this.TEST_IDS.PRODUCT_GENRE)).click();
    element(by.css(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')')).click();
    return this;
  }

  /**
   * Gets search results
   * @returns ElementArrayFinder
   */
  getSearchResults(): ElementArrayFinder {
    return element.all(by.css(this.TEST_IDS.SEARCH_RESULT));
  }
}
