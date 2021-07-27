export class ProductListingPage {
  private TEST_IDS = {
    PRODUCT_NAME: '#product-name',
    PRODUCT_CODE: '#product-code',
    PRODUCT_GENRE: '#product-genre',
    PRODUCT_GENRE_OPTIONS: '.product-genre-option',
    SEARCH_RESULT: '.search-results > tbody > tr',
    NEW_BUTTON: '#new-button',
    CLEAR_BUTTON: '#clear-button',
    SEARCH_BUTTON: '#search-button'
  };

  /**
   * Clicks new button
   * @returns ProductListingPage
   */
  clickNewButton(): ProductListingPage {
    cy.get(this.TEST_IDS.NEW_BUTTON).click();
    return this;
  }

  /**
   * Clicks clear button
   * @returns ProductListingPage
   */
  clickClearButton(): ProductListingPage {
    cy.get(this.TEST_IDS.CLEAR_BUTTON).click();
    return this;
  }

  /**
   * Clicks search button
   * @returns ProductListingPage
   */
  clickSearchButton(): ProductListingPage {
    cy.get(this.TEST_IDS.SEARCH_BUTTON).click();
    return this;
  }

  /**
   * Clicks search list
   * @param rowNo row no
   * @returns ProductListingPage
   */
  clickSearchList(rowNo: number): ProductListingPage {
    cy.get(this.TEST_IDS.SEARCH_RESULT + ':nth-child(' + rowNo + ')').click();
    return this;
  }

  /**
   * Params product listing page
   * @param [productName] product name
   * @param [productCode] product code
   * @param [productGenre] product genre
   * @returns ProductListingPage
   */
  setupSearchCriteria(productName?: string, productCode?: string, productGenre?: string): ProductListingPage {
    if (productName) {
      cy.get(this.TEST_IDS.PRODUCT_NAME).type(productName);
    }
    if (productCode) {
      cy.get(this.TEST_IDS.PRODUCT_CODE).type(productCode);
    }
    if (productGenre) {
      cy.get(this.TEST_IDS.PRODUCT_GENRE).click();
      cy.get(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')').click();
    }
    return this;
  }

  /**
   * Counts search results
   * @returns search results
   */
  countSearchResults(): number {
    return cy.get(this.TEST_IDS.SEARCH_RESULT).should.length;
  }
}
