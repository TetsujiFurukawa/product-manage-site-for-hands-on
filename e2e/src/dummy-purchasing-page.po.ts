import { by, element } from 'protractor';

export class DummyPurchasingPage {
  private TEST_IDS = {
    PRODUCT_CODE: 'product-code',
    PRODUCT_PURCHASE_NAME: 'product-Purchase-name',
    PRODUCT_PURCHASE_QUANTITY: 'product-purchase-quantity',
    SAVE_BUTTON: 'save-button',
    YES_NO_DIALOG_BUTTON_YES: 'yesNoDialog_button_yes'
  };

  /**
   * Clicks save button
   * @returns DummyPurchasingPage
   */
  clickSaveButton(): DummyPurchasingPage {
    element(by.id(this.TEST_IDS.SAVE_BUTTON)).click();
    element(by.id(this.TEST_IDS.YES_NO_DIALOG_BUTTON_YES)).click();
    return this;
  }

  /**
   * Setups purchase of product
   * @param productCode product code
   * @param productPurchaseName product purchase name
   * @param productPurchaseQuantity product purchase quantity
   * @returns DummyPurchasingPage
   */
  setupPurchaseOfProduct(productCode: string, productPurchaseName: string, productPurchaseQuantity: number): DummyPurchasingPage {
    element(by.id(this.TEST_IDS.PRODUCT_CODE)).clear();

    element(by.id(this.TEST_IDS.PRODUCT_CODE)).sendKeys(productCode);
    element(by.id(this.TEST_IDS.PRODUCT_PURCHASE_NAME)).sendKeys(productPurchaseName);
    element(by.id(this.TEST_IDS.PRODUCT_PURCHASE_QUANTITY)).sendKeys(productPurchaseQuantity);
    return this;
  }
}
