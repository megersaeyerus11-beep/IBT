

'use strict';
const bill=Number("500");
let tip = 0;
if(bill > 300 ){
    tip = 0.10;
}
else if(bill <= 300 ){
    tip = 0.05;
}
let partySize = 2
let total = bill + tip ;
const perPerson = total / partySize;
console.log(
        `Total ${total} ETB and perperson ${perPerson} ETB`); 
let method = 'cbebirr';
let fee = 0;
switch (method) {
case 'telebirr':
fee = total * 0.005;
break;
case 'cbebirr':
fee = total * 0.01;
break;
default:
fee = total * 0.02;
}
total = total + fee;
console.log (`new total is ${total}`);