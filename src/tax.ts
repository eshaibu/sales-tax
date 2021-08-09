import { Item, TaxRate } from './index.types';

export const calculateItemTax = (item: Item, taxDetails: TaxRate): number => {
  const { taxExemptedCategories, salesTaxRate, importDuty } = taxDetails;
  const itemSalesTaxRate = taxExemptedCategories.includes(item.category) ? 0 : salesTaxRate;
  const itemImportDuty = item.isImported ? importDuty : 0;
  const totalTaxRate = itemSalesTaxRate + itemImportDuty;
  // rounding to nearest 0.05
  return Math.ceil(((item.price * totalTaxRate) / 100) * (100 / 5)) * (5 / 100);
};
