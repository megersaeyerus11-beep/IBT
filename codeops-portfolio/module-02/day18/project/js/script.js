import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, correctAmount } from "./report.js";

const credits = totalByType(transactions, "credit");
const debits = totalByType(transactions, "debit");

console.log("=== TeleBirr Transaction Report ===\n");

console.log("Receipts:");
formatReceipts(transactions).forEach((line) => console.log(`  ${line}`));

console.log("\nTotals:");
console.log(`  Credits: ${credits} ETB`);
console.log(`  Debits:  ${debits} ETB`);
console.log(`  Net:     ${credits - debits} ETB`);

const corrected = correctAmount(transactions[0], 300);

console.log("\nCorrection example (transaction #1):");
console.log("  Original:", transactions[0]);
console.log("  Corrected copy:", corrected);
console.log(
  "  Original left unchanged?",
  transactions[0].amount === 250
);