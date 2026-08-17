const VAT_RATE = 0.15; // Ethiopia standard VAT

export const withVat = (amount, rate = VAT_RATE) =>
  Math.round(amount * (1 + rate) * 100) / 100;

export const format = (amount) => `${amount.toFixed(2)} ETB`;