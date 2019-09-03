/**
 * Basic Operators
 */

var currentYear, myAge, broAge;
currentYear = 2019;
myAge = 24;
broAge = 23;

// Math Operators
myDOB = currentYear - myAge;
broDOB = currentYear - broAge;
console.log(myDOB);
console.log(broDOB);

console.log(currentYear + 2);
console.log(currentYear * 2);
console.log(currentYear / 10);
console.log(currentYear % 10);


// Logical Operators
var broElder = myAge < broAge;
console.log(broElder);


// typeof operator - returns a string of the type of the variable that succeeds typeof as follows:
console.log(typeof myAge);
console.log(typeof broElder);
console.log(typeof "This is some String");
var x;
console.log(typeof x);  // undefined
