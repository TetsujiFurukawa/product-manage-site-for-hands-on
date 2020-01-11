import { by, element, ElementArrayFinder } from 'protractor';

export class ProductListingPage {
  private TEST_IDS = {
    PRODUCT_NAME: 'product-name',
    PRODUCT_CODE: 'product-code',
    PRODUCT_GENRE: 'product-genre',
    PRODUCT_GENRE_OPTIONS: '.product-genre-option',
    SEARCH_RESULT: '.results > tbody > tr',
    NEW_BUTTON: 'new-button',
    SEARCH_BUTTON: 'search-button'
  };

  clickNewButton(): ProductListingPage {
    element(by.id(this.TEST_IDS.NEW_BUTTON)).click();
    return this;
  }

  setupSearchCriteria(productName: string, productCode: string, productGenre: string): ProductListingPage {
    element(by.id(this.TEST_IDS.PRODUCT_NAME)).sendKeys(productName);
    element(by.id(this.TEST_IDS.PRODUCT_CODE)).sendKeys(productCode);
    element(by.id(this.TEST_IDS.PRODUCT_GENRE)).click();
    element(by.css(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')')).click();
    return this;
  }

  clickSearchButton(): ProductListingPage {
    element(by.id(this.TEST_IDS.SEARCH_BUTTON)).click();
    return this;
  }

  clickSearchList(rowNo: number): ProductListingPage {
    element(by.css(this.TEST_IDS.SEARCH_RESULT + ':nth-child(' + rowNo + ')')).click();
    return this;
  }

  getSearchResults(): ElementArrayFinder {
    return element.all(by.css(this.TEST_IDS.SEARCH_RESULT));
  }
}
