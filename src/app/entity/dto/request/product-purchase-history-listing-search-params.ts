import { BaseSearchParams } from './base-search-params';

export class ProductPurchaseHistoryListingSearchParams extends BaseSearchParams {
  productPurchaseName: string;
  productPurchaseDateFrom: string;
  productPurchaseDateTo: string;
  productName: string;
  productCode: string;
}
