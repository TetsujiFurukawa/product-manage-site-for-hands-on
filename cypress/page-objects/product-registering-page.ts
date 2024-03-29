export class ProductRegisteringPage {
  TEST_ARGS = {
    GENRE: {
      SNEAKERS_AND_SHOES: 1,
      TOPS: 2,
      BAGS: 3
    }
  };

  private TEST_IDS = {
    PRODUCT_CODE_LABEL: '#product-code-label',
    PRODUCT_CODE: '#product-code',
    PRODUCT_NAME: '#product-name',
    PRODUCT_GENRE: '#product-genre',
    PRODUCT_GENRE_OPTIONS: '.product-genre-option',
    PRODUCT_SIZE_STANDARD: '#product-size-standard',
    PRODUCT_COLOR: '#product-color',
    PRODUCT_UNIT_PRICE: '#product-unit-price',
    RETURN_BUTTON: '#return-button',
    SAVE_BUTTON: '#save-button',
    YES_NO_DIALOG_BUTTON_YES: '#yesNoDialog_button_yes'
  };

  /**
   * Clicks save button
   * @returns save ProductRegisteringPage
   */
  clickSaveButton(): ProductRegisteringPage {
    cy.get(this.TEST_IDS.SAVE_BUTTON).click();
    cy.get(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES).click();
    cy.get(this.TEST_IDS.RETURN_BUTTON).click();
    return this;
  }

  /**
   * Setups register product
   * @param productCode product code
   * @param productName product name
   * @param productGenre product genre
   * @param productSizeStandard product size standard
   * @param productColor product color
   * @param productUnitPrice product unit price
   * @returns save ProductRegisteringPage
   */
  setupRegisterProduct(
    productCode: string,
    productName: string,
    productGenre: number,
    productSizeStandard: string,
    productColor: string,
    productUnitPrice: string
  ): ProductRegisteringPage {
    cy.get(this.TEST_IDS.PRODUCT_CODE_LABEL).click();
    cy.get(this.TEST_IDS.PRODUCT_CODE).type(productCode);

    this.setupCommon(productName, productGenre, productSizeStandard, productColor, productUnitPrice);
    return this;
  }

  /**
   * Setups edit product
   * @param productName product name
   * @param productGenre product genre
   * @param productSizeStandard product size standard
   * @param productColor product color
   * @param productUnitPrice product unit price
   * @returns save ProductRegisteringPage
   */
  setupEditProduct(
    productName: string,
    productGenre: number,
    productSizeStandard: string,
    productColor: string,
    productUnitPrice: string
  ): ProductRegisteringPage {
    cy.get(this.TEST_IDS.PRODUCT_NAME).clear();
    cy.get(this.TEST_IDS.PRODUCT_SIZE_STANDARD).clear();
    cy.get(this.TEST_IDS.PRODUCT_COLOR).clear();
    cy.get(this.TEST_IDS.PRODUCT_UNIT_PRICE).clear();

    this.setupCommon(productName, productGenre, productSizeStandard, productColor, productUnitPrice);
    return this;
  }

  private setupCommon(
    productName: string,
    productGenre: number,
    productSizeStandard: string,
    productColor: string,
    productUnitPrice: string
  ) {
    cy.get(this.TEST_IDS.PRODUCT_NAME).type(productName);
    cy.get(this.TEST_IDS.PRODUCT_GENRE).click();
    cy.get(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre.toString() + ')').click();
    cy.get(this.TEST_IDS.PRODUCT_SIZE_STANDARD).type(productSizeStandard);
    cy.get(this.TEST_IDS.PRODUCT_COLOR).type(productColor);
    cy.get(this.TEST_IDS.PRODUCT_UNIT_PRICE).type(productUnitPrice);
  }
}
