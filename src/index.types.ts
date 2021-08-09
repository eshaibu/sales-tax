export type TaxRate = {
  salesTaxRate: number;
  importDuty: number;
  taxExemptedCategories: string[];
};

export type Item = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  isImported: boolean;
};
