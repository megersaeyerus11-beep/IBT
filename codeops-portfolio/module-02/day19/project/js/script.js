
import { transactions } from "./transactions.js";
import {
  totalByType,
  formatReceipts,
  correctAmount,
  buildReport,
} from "./report.js";

console.log(buildReport(transactions));


console.log("\n--- Receipts only ---");
formatReceipts(transactions).forEach((line) => console.log(line));

console.log("\n--- Totals only ---");
console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
console.log(`Credits: ${totalByType(transactions, "credit")} ETB`);

const original = transactions[0];
const corrected = correctAmount(original, 300);

console.log("\n--- Spread update demo ---");
console.log("Original:", original);
console.log("Corrected copy:", corrected);
console.log("Original unchanged?", original.amount === 250);