export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const byType = (txns, type) => txns.filter((t) => t.type === type);

export const formatReceipts = (txns) =>
  txns.map(({ customer, amount, type }) => {
    const sign = type === "credit" ? "+" : "-";
    return `${customer}: ${sign}${amount} ETB (${type})`;
  });

export const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});

export const buildReport = (txns) => {
  const totalCredits = totalByType(txns, "credit");
  const totalDebits = totalByType(txns, "debit");
  const netBalance = totalCredits - totalDebits;

  const receiptLines = formatReceipts(txns).join("\n");

  return [
    "=== TeleBirr Transaction Report ===",
    receiptLines,
    "------------------------------------",
    `Total Credits: ${totalCredits} ETB`,
    `Total Debits:  ${totalDebits} ETB`,
    `Net Balance:   ${netBalance} ETB`,
  ].join("\n");
};