// Exercises
// Complete these in your Day 17 folder and push them to GitHub. Run each one and confirm the
// output before moving on.
//? 1. Write a vat(amount, rate = 0.15) function using a default parameter, then write the same logic
// ?as an arrow function with an implicit return.

function vat(amount, rate = 0.15) {
    return amount * (1 - rate);
}

console.log(`vat is ${vat(100)}`);

const arrowFunctionVat = (amount, rate = 0.15) => amount * (1 - rate);

console.log(`vat is ${arrowFunctionVat(100)}`);


//? 2. Write a makeCounter closure that returns a function incrementing a private count. Call it several
// ?times and, in a comment, explain why count stays private.

function makeCounter() {
    let count = 0;

    return function adder() {
        count++;
        return count;
    }
}

let counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// b/c makeCounter return function and that return function is remember count value so 
// when anytime call it's retturn add 1 number each time, and count variable is private only access by 
// return functions or even crate nested function like method typs


// ?3. Write a discountBy(rate) factory and create memberPrice (10%) and 
//salePrice (30%) from it.
// ?Apply both to a price of 1000 ETB.

function discountBy(rate) {
    if (rate > 1) {
        rate = rate / 100;
    }

    return (value) => {
        return value * (1 - rate);
    }
}

let memberPrice = discountBy(10);
let salePrice = discountBy(0.3);

let price = 1000;
console.log(`with memberPrice of 10% ${memberPrice(price)}`);
console.log(`with salePrice of 30% ${salePrice(price)}`);

// ?4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then
// ?use it to add VAT to an array of prices.


function applyToAll(list, fn) {
    return list.map((current) => fn(current));
}

test = applyToAll([10, 20, 30], vat);

console.log(test);


// ?5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis
// ?Ababa".

const citys = ["Addis Ababa", "Harar", "Jijga", "Gonder", "Bahrdar", "Meqele"];

citys.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});