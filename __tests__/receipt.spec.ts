import {getReceiptDetails} from '../src/receipt';

const taxDetails = {
  salesTaxRate: 10,
  importDuty: 5,
  taxExemptedCategories: ['book', 'food', 'medicine'],
};

describe('Receipt Details', () => {
  it(`should display the item quantity, name, total price, sales tax and total for an array of items of 
  different categories with different import status`, () =>  {
    const inputItems = [
      {name:'bottle of perfume', price: 27.99, quantity: 1, category: 'other',isImported: true},
      {name:'bottle of perfume', price: 18.99, quantity: 1, category: 'other',isImported: false},
      {name:'packet of headache pills', price: 9.75, quantity: 1, category: 'medicine',isImported: false},
      {name:"box of chocolates", price: 11.25, quantity: 3, category: 'food', isImported: true}
    ];

    const receiptDetails = getReceiptDetails(inputItems, taxDetails);

    expect(
      receiptDetails[`${inputItems[0].quantity} ${inputItems[0].isImported ? 'imported ' : ''}${inputItems[0].name}`]
    ).toEqual(32.19);
    expect(
      receiptDetails[`${inputItems[1].quantity} ${inputItems[1].isImported ? 'imported ' : ''}${inputItems[1].name}`]
    ).toEqual(20.89);
    expect(
      receiptDetails[`${inputItems[2].quantity} ${inputItems[2].isImported ? 'imported ' : ''}${inputItems[2].name}`]
    ).toEqual(9.75);
    expect(
      receiptDetails[`${inputItems[3].quantity} ${inputItems[3].isImported ? 'imported ' : ''}${inputItems[3].name}`]
    ).toEqual(35.55);
    expect(receiptDetails['Sales Taxes']).toEqual(7.9);
    expect(receiptDetails['Total']).toEqual(98.38);
  });

  it('should throw error any item quantity in list is negative ', () =>  {
    const inputItems = [{name:'bottle of perfume', price: 27.99, quantity: -1, category: 'other',isImported: true}];
    expect(() => {getReceiptDetails(inputItems, taxDetails)}).toThrow('Quantity cannot be negative');
  });

  it('should throw error any item price in list is negative ', () =>  {
    const inputItems = [{name:'bottle of perfume', price: -10.99, quantity: 1, category: 'other',isImported: true}];
    expect(() => {getReceiptDetails(inputItems, taxDetails)}).toThrow('Price cannot be negative');
  });
});
