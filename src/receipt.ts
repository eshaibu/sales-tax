import { Item, TaxRate } from './index.types';
import { calculateItemTax } from './tax';

const roundAmount = (amount: number, roundDigit: number): number => {
  return Number(
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: roundDigit,
    }).format(amount),
  );
};

export const getReceiptDetails = (inputItems: Item[], taxDetails: TaxRate): Record<string, number> => {
  const receiptDetails = {};
  let salesTaxes = 0.0;
  let totalPrice = 0.0;

  inputItems.forEach((item) => {
    if (item.price < 0) throw new Error('Price cannot be negative');
    if (item.quantity < 0) throw new Error('Quantity cannot be negative');

    const itemTax = calculateItemTax(item, taxDetails);
    const itemPrice = (item.price + itemTax) * item.quantity;

    receiptDetails[`${item.quantity} ${item.isImported ? 'imported ' : ''}${item.name}`] = roundAmount(itemPrice, 2);
    salesTaxes = roundAmount(salesTaxes + itemTax * item.quantity, 2);
    totalPrice = roundAmount(totalPrice + itemPrice, 2);
  });

  receiptDetails['Sales Taxes'] = salesTaxes;
  receiptDetails['Total'] = totalPrice;

  return receiptDetails;
};
