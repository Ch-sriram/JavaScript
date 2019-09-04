/*******************************************************************************************
 * Control Structure: if else
 */

var lastName = "Ram";
var civilStatus = "single";

// === is the equality operator which check for the value and type equality
if (civilStatus === "married") {
    console.log(lastName + " is " + civilStatus);
} else {
    console.log(lastName + " is still " + civilStatus + ". Hopefully he'll get married, soon enough.");
}

/*******************************************************************************************/

// In the previous challenge's solution:
var johnMass = 80, markMass = 100;
var johnHeight = 1.82, markHeight = 1.90;

// BMI = Mass / (Height * Height);
var johnBMI = johnMass / johnHeight ** 2;
var markBMI = markMass / markHeight ** 2;

// Printing the BMIs
console.log("John's BMI: " + johnBMI);
console.log("Mark's BMI: " + markBMI);

// Instead of doing the following:
// markHigherBMI = markBMI > johnBMI;
// console.log("Is Mark's BMI higher than John's BMI? " + markHigherBMI);

// We can do the following:
if (markBMI > johnBMI) {
    console.log("Mark's BMI is higher than John's BMI");
} else {
    console.log("John's BMI is higher than Mark's BMI");
}


// else if ladder:
var age = 24;   // for "Ram"

if (age < 13)
    console.log(lastName + " is a boy.");
else if (age >= 13 && age < 20)
    console.log(lastName + " is a teenager.");
else if (age >= 20 && age < 30)
    console.log(lastName + " is a young man.");
else console.log(lastName + " is a man.");



/********************************************************************************************
 * Control Structure: Ternary Operators & Switch Statements
 */

// Ternary Operator
// (Boolean Condition) ? <true_code> : <false_code>;
// if the Boolean Condition is true, then <true_code> part is executed, otherwise <false_code> is executed. 
var name = "Ram";
var Age = 24;

Age >= 18 ? console.log(name + ' drinks beer.') : console.log(name + ' drinks juice.');

var drink = Age >= 18 ? "beer" : "juice";
console.log(drink);

// The same above code w/o the ternary operator:
// if(Age >= 18) {
//     console.log(name + ' drinks beer.');
// } else {
//     console.log(name + ' drinks juice.');
// }
// The code above is around 5-6 lines, which was resolved in 1 line above.

// Switch Statement
var job = "software engineer";
switch (job) {
    case "software engineer":
    case "coder":
    case "developer":
        console.log(name + " is a Software Developer.");
        break;
    case "teacher":
    case "instructor":
    case "professor":
        console.log(name + " teaches people how to code.");
        break;
    case "driver":
        console.log(name + " is driver.");
        break;
    case "designer":
    case "architect":
        console.log(name + " is a system designer/architect.");
        break;
    case "painter":
    case "artist":
        console.log(name + " is an artist.");
    default: 
        console.log(name + " does something else.");
        // For the default case, no need of a break statement because after this case, there is no other case. Therefore, the code never keeps on running after this.
}

// if (age < 13)
//     console.log(lastName + " is a boy.");
// else if (age >= 13 && age < 20)
//     console.log(lastName + " is a teenager.");
// else if (age >= 20 && age < 30)
//     console.log(lastName + " is a young man.");
// else console.log(lastName + " is a man.");
// The same code above can be written using switch statement as follows:

switch (true) {
    case age < 13:
        console.log(lastName + " is a boy.");
        break;
    case age >= 13 && age < 20:
        console.log(lastName + " is a teenager.");
        break;
    case age >= 20 && age < 30:
        console.log(lastName + " is a young man.");
        break;
    default:
        console.log(lastName + " is a man.");
}


/**
 * Truthy & Falsy Values.
 * Equality Operators.
 */

// falsy values: undefined, null, 0, '', NaN
// truthy values: NOT falsy values

// Truthy & Falsy Values
var height;
height = ''; // 1254, 'forty five', etc.
if (height || height === 0) {
    console.log("Variable is defined.");
} else {
    console.log("Variable is NOT defined.");
}

// Equality Operators
// == : This equality operator is used when we don't want strict comparison between two variables/values. Aka: Type Coercion Equality Operator.
// === : used to strict comparison of equality between two vars/vals.


height = 182;

// Example of Type Coercion Euqality Operator ==
if (height == '182') {
    // Code in this block will be executed
    console.log("height = " + height);
} else {
    console.log("The quantities are unequal.");
}

// Example of Strict Euqality Operator ===
if (height === '182') {
    console.log("height = " + height);
} else {
    // Code in this block will be executed
    console.log("The quantities are unequal.");
}