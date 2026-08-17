import { addVat, VAT } from "./money.js";

console.log("========== Exercise 1 ==========");

{
  const prices = [200, 450, 900, 1200, 75, 640];
  const VAT_RATE = 0.15;

  const pricesWithVat = prices.map((price) => price * (1 + VAT_RATE));
  const under1000 = pricesWithVat.filter((price) => price < 1000);
  const grandTotal = under1000.reduce((sum, price) => sum + price, 0);

  console.log("Prices with VAT:", pricesWithVat);
  console.log("Under 1000 ETB:", under1000);
  console.log(`Grand Total: ${grandTotal.toFixed(2)} ETB`);
}

console.log("\n========== Exercise 2 ==========");

{
  const customer = {
    name: "Selam",
    city: "Addis Ababa",
    balance: 3200,
  };

  for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
  }
}

console.log("\n========== Exercise 3 ==========");

{
  const customer = {
    name: "Selam",
    city: "Addis Ababa",
    balance: 3200,
  };

  const { name, city } = customer;
  console.log(`${name} lives in ${city}.`);

  function greet({ name }) {
    return `Hello, ${name}! Welcome to Addis Market.`;
  }

  console.log(greet(customer));
}

console.log("\n========== Exercise 4 ==========");

{
  const customer = {
    name: "Selam",
    city: "Addis Ababa",
    balance: 3200,
  };

  const updatedCustomer = {
    ...customer,
    city: "Bahir Dar",
    phone: "0912345678",
  };

  console.log("Original:", customer);
  console.log("Updated:", updatedCustomer);
  console.log(
    "Original unchanged?",
    customer.city === "Addis Ababa" && customer.phone === undefined
  );
}

console.log("\n========== Exercise 5 ==========");

{
  console.log(`VAT rate: ${VAT * 100}%`);
  console.log(`100 ETB with VAT: ${addVat(100).toFixed(2)} ETB`);
  console.log(`250 ETB with VAT: ${addVat(250).toFixed(2)} ETB`);
}