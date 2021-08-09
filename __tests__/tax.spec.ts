import {calculateItemTax, roundTo005} from '../src/tax';

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

  it('should calculate tax of 5% if item category is in exemption list and imported', async () => {
    const item = {
      name: 'headache pills',
      price: 9.75,
      quantity: 1,
      category: 'medicine',
      isImported: true,
    };
    const itemTax = calculateItemTax(item, taxDetails);
    expect(itemTax).toEqual(roundTo005(item.price, 5));
  });

  it('should calculate tax of 10% if item category is not in exemption list and not imported', async () => {
    const item = {
      name: 'music CD',
      price: 14.99,
      quantity: 1,
      category: 'other',
      isImported: false,
    };
    const itemTax = calculateItemTax(item, taxDetails);
    expect(itemTax).toEqual(roundTo005(item.price, 10));
  });

  it('should calculate tax of 15% if item category is not in exemption list and imported', async () => {
    const item = {
      name: 'bottle of perfume',
      price: 47.50,
      quantity: 1,
      category: 'other',
      isImported: true,
    };
    const itemTax = calculateItemTax(item, taxDetails);
    expect(itemTax).toEqual(roundTo005(item.price, 15));
  });
});
