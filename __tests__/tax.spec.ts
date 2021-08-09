import { calculateItemTax } from '../src/tax';

const taxDetails = {
  salesTaxRate: 10,
  importDuty: 5,
  taxExemptedCategories: ['book', 'food', 'medicine'],
};

describe('Item Tax', () => {
  it('should calculate tax as 0 if item category is in exemption list and not imported', async () => {
    const item = {
      name: 'chocolate',
      price: 12.49,
      quantity: 1,
      category: 'food',
      isImported: false,
    };
    const itemTax = calculateItemTax(item, taxDetails);
    expect(itemTax).toEqual(0);
  });
});
