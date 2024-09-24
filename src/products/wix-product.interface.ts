export interface WixProductData {
  _id: string;
  name: string;
  productType: string;
  priceData: {
    price: number;
  };
  description: string;
  productOptions: {
    name: string;
    choices: {
      value: string;
      description: string;
    }[];
  }[];
}
