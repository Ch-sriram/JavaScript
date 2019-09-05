/********************************************************************************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.
To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.
In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).
(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)
GOOD LUCK 😀
*/


/* Solution */
var tipCalculator = function(bill) { // bill is an integer
    if (bill < 0)   // tip cannot be negative
        return -1;
    else if (bill >= 1 && bill < 50)  // tip is 20% of the bill
        return bill * 0.2;
    else if (bill >= 50 && bill <= 200) // tip is 15% of the bill
        return bill * 0.15;
    else return bill * 0.1;
}

// Given bills
johnBill = [124, 48, 268];

// Store the calculated tips in an array
tips = [];
tips.push(tipCalculator(johnBill[0]));
tips.push(tipCalculator(johnBill[1]));
tips.push(tipCalculator(johnBill[2]));

// log the tips to the console
console.log(
    "Tip for $" + johnBill[0] + " is $" + tips[0] + "\n" + 
    "Tip for $" + johnBill[1] + " is $" + tips[1] + "\n" + 
    "Tip for $" + johnBill[2] + " is $" + tips[2] + "\n" 
);

console.log("Total Bill Calculation (Bill + Tip)");

// Store the final bill in an array
finalBill = [johnBill[0] + tips[0], 
             johnBill[1] + tips[1], 
             johnBill[2] + tips[2]];

// log the final bill values onto the console
console.log(
    "Total Bill for $" + johnBill[0] + " is $" + finalBill[0] + "\n" + 
    "Total Bill for $" + johnBill[1] + " is $" + finalBill[1] + "\n" + 
    "Total Bill for $" + johnBill[2] + " is $" + finalBill[2] + "\n"
);