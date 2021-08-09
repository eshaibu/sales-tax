import input1 from '../inputs/input1.json';
import input2 from '../inputs/input2.json';
import input3 from '../inputs/input3.json';
import exemptedCategories from '../inputs/exempted-categories.json';
import { getReceiptDetails, logReceipt } from './receipt';

const taxDetails = {
  salesTaxRate: 10,
  importDuty: 5,
  taxExemptedCategories: exemptedCategories,
};

const receiptDetails1 = getReceiptDetails(input1, taxDetails);
console.log('\n ---------- Output 1 ----------');
logReceipt(receiptDetails1);

console.log('\n ---------- Output 2 ----------');
const receiptDetails2 = getReceiptDetails(input2, taxDetails);
logReceipt(receiptDetails2);

console.log('\n ---------- Output 3 ----------');
const receiptDetails3 = getReceiptDetails(input3, taxDetails);
logReceipt(receiptDetails3);
