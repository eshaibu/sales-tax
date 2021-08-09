import { Item, TaxRate } from './index.types';

export const roundTo005 = (price: number, tax: number): number => {
  return Math.ceil(((price * tax) / 100) * (100 / 5)) * (5 / 100);
};

export const calculateItemTax = (item: Item, taxDetails: TaxRate): number => {
  const { taxExemptedCategories, salesTaxRate, importDuty } = taxDetails;
  const itemSalesTaxRate = taxExemptedCategories.includes(item.category) ? 0 : salesTaxRate;
  const itemImportDuty = item.isImported ? importDuty : 0;
  const totalTaxRate = itemSalesTaxRate + itemImportDuty;
  // rounding to nearest 0.05
  const tax = roundTo005(item.price, totalTaxRate);
  console.log(tax, '....tax for', item.name);
  return tax;
};
