/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!
This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.
Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values.
2. Add a method to calculate the tip.
3. This method should include a loop to iterate over all the paid bills and do the tip calculations.
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.
EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).
5. Implement the same functionality as before, this time using Mark's tipping rules.
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average).
7. Calculate the average tip for each family.
8. Log to the console which family paid the highest tips on average.
GOOD LUCK 😀
*/

/* Solution */
var john = {
    firstName: "John",
    lastName: "Smith",
    bill: [124, 48, 268, 180, 42],
    tipCalculator: function() {
        var tips = [];
        for(var i = 0; i < this.bill.length; ++i) {
            if(this.bill[i] <= 0) {
                console.log("There's a negative quantity in the bill at bill[" + 
                                    this.bill.indexOf[i] + 
                            "]. Please correct it & restart the program.");
                return null;
            }
            else if(this.bill[i] > 0 && this.bill[i] < 50)
                tips.push(this.bill[i] * 0.2);
            else if(this.bill[i] >= 50 && this.bill[i] <= 200)
                tips.push(this.bill[i] * 0.15);
            else tips.push(this.bill[i] * 0.10);
        }
        return tips;
    },
    // Call calcTips() function before calling calcBill() function
    calcTips: function() {
        this.tips = this.tipCalculator();
    },
    billCalculator: function() {
        var totalBill = [];
        for(var i = 0; i < this.bill.length; ++i)
            totalBill.push(this.bill[i] + this.tips[i]);
        return totalBill;
    },
    // Call this function only after calling the calcTips() function
    calcBill: function() {
        this.totalBill = this.billCalculator();
    }
};

console.log(john);

john.calcTips();    // Calculates the tips and adds the array to the john
john.calcBill();    // Calculates the total bill (bill + tips) and adds the array to john

console.log(john.firstName + "'s Bills: " + john.bill);
console.log(john.firstName + "'s Tips: " + john.tips);
console.log(john.firstName + "'s Total Bill: " + john.totalBill);

/////////////////////////////////////////////////////////////////////////////////////////////

var mark = {
    firstName: "Mark",
    lastName: "Smith",
    bill: [77, 345, 110, 45],
    tipCalculator: function() {
        var tips = [];
        for(var i = 0; i < this.bill.length; ++i) {
            if(this.bill[i] <= 0) {
                console.log("There's a negative quantity in the bill at bill[" + 
                                    this.bill.indexOf[i] + 
                            "]. Please correct it & restart the program.");
                return null;
            }
            else if(this.bill[i] > 0 && this.bill[i] < 100)
                tips.push(this.bill[i] * 0.2);
            else if(this.bill[i] >= 100 && this.bill[i] <= 300)
                tips.push(this.bill[i] * 0.15);
            else tips.push(this.bill[i] * 0.25);
        }
        return tips;
    },
    // Call calcTips() function before calling calcBill() function
    calcTips: function() {
        this.tips = this.tipCalculator();
    },
    billCalculator: function() {
        var totalBill = [];
        for(var i = 0; i < this.bill.length; ++i)
            totalBill.push(this.bill[i] + this.tips[i]);
        return totalBill;
    },
    // Call this function only after calling the calcTips() function
    calcBill: function() {
        this.totalBill = this.billCalculator();
    }
};

console.log(mark);

mark.calcTips();    // Calculates the tips for mark's bill & stores it inside mark obj
mark.calcBill();    // Calculates the total bill (bill + tips) & stores it inside mark obj

console.log(mark.firstName + "'s Bills: " + mark.bill);
console.log(mark.firstName + "'s Tips: " + mark.tips);
console.log(mark.firstName + "'s Total Bill: " + mark.totalBill);

/////////////////////////////////////////////////////////////////////////////////////////////

// function to calculate the average of each person's total bill;
function averageCalc(obj) { // obj is an object of type john or mike
    var billAvg = 0;
    for(var i = 0; i < obj.totalBill.length; ++i)
        billAvg += obj.totalBill[i]; 
    return billAvg / obj.totalBill.length;
}

function calcAvg(obj) {
    obj.billAvg = averageCalc(obj);
}

calcAvg(john);  // Calculate average bill of John's family & store the result in john obj
calcAvg(mark);  // Calculate average bill of Mark's family & store the result in mark obj

console.log("Average Bill for " + john.firstName + "'s family is " + john.billAvg);
console.log("Average Bill for " + mark.firstName + "'s family is " + mark.billAvg);

function whoPaidMore(obj1, obj2) {
    var maxAvg = Math.max(obj1.billAvg, obj2.billAvg);
    var family = (maxAvg === obj1.billAvg) ? obj1.firstName : obj2.firstName;
    return family + "'s family paid more on average";
}

console.log(whoPaidMore(john, mark));