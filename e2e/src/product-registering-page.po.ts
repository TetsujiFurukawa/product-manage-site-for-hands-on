import { by, element } from 'protractor';

export class ProductRegisteringPage {
  private TEST_IDS = {
    PRODUCT_CODE: 'product-code',
    PRODUCT_NAME: 'product-name',
    PRODUCT_GENRE: 'product-genre',
    PRODUCT_GENRE_OPTIONS: '.product-genre-option',
    PRODUCT_SIZE_STANDARD: 'product-size-standard',
    PRODUCT_COLOR: 'product-color',
    PRODUCT_UNIT_PRICE: 'product-unit-price',
    RETURN_BUTTON: 'return-button',
    SAVE_BUTTON: 'save-button',
    YES_NO_DIALOG_BUTTON_YES: 'yesNoDialog_button_yes'
  };

  /**
   * Clicks save button
   * @returns save ProductRegisteringPage
   */
  clickSaveButton(): ProductRegisteringPage {
    element(by.id(this.TEST_IDS.SAVE_BUTTON)).click();
    element(by.id(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES)).click();
    element(by.id(this.TEST_IDS.RETURN_BUTTON)).click();
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
  setupRegisterProduct(productCode: string, productName: string, productGenre: string, productSizeStandard: string, productColor: string, productUnitPrice: string): ProductRegisteringPage {
    element(by.id(this.TEST_IDS.PRODUCT_CODE)).sendKeys(productCode);
    element(by.id(this.TEST_IDS.PRODUCT_NAME)).sendKeys(productName);
    element(by.id(this.TEST_IDS.PRODUCT_GENRE)).click();
    element(by.css(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')')).click();
    element(by.id(this.TEST_IDS.PRODUCT_SIZE_STANDARD)).sendKeys(productSizeStandard);
    element(by.id(this.TEST_IDS.PRODUCT_COLOR)).sendKeys(productColor);
    element(by.id(this.TEST_IDS.PRODUCT_UNIT_PRICE)).sendKeys(productUnitPrice);
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
  setupEditProduct(productName: string, productGenre: string, productSizeStandard: string, productColor: string, productUnitPrice: string): ProductRegisteringPage {
    element(by.id(this.TEST_IDS.PRODUCT_NAME)).clear();
    element(by.id(this.TEST_IDS.PRODUCT_GENRE)).click();
    element(by.css(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')')).click();
    element(by.id(this.TEST_IDS.PRODUCT_SIZE_STANDARD)).clear();
    element(by.id(this.TEST_IDS.PRODUCT_COLOR)).clear();
    element(by.id(this.TEST_IDS.PRODUCT_UNIT_PRICE)).clear();

    element(by.id(this.TEST_IDS.PRODUCT_NAME)).sendKeys(productName);
    element(by.id(this.TEST_IDS.PRODUCT_GENRE)).click();
    element(by.css(this.TEST_IDS.PRODUCT_GENRE_OPTIONS + ':nth-child(' + productGenre + ')')).click();
    element(by.id(this.TEST_IDS.PRODUCT_SIZE_STANDARD)).sendKeys(productSizeStandard);
    element(by.id(this.TEST_IDS.PRODUCT_COLOR)).sendKeys(productColor);
    element(by.id(this.TEST_IDS.PRODUCT_UNIT_PRICE)).sendKeys(productUnitPrice);
    return this;
  }
}
