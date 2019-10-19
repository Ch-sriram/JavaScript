/***********************************************************************************************
 * Strings in ES6
 */
/*jshint esversion: 6*/

let firstName = "John";
let lastName = "Smith";
const yearOfBirth = 1990;

function calcAge(year) {
    return (new Date().getFullYear() - year);
}

// ES5 - We output the string by concatenation using the '+' operator as follows:
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 - We output the string by the usage of something known as template literals. We use the 
// backtick operator (`) to enclose the string to output and for variable references, we use the
// dollar operator along with braces as follows:
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


// New string methods in ES6. These are utility functions that can be used in occassions
const name = `${firstName} ${lastName}`;

console.log(name.startsWith('J'));   // true
console.log(name.startsWith('j'));   // false
console.log(name.startsWith('jo'));  // false
console.log(name.startsWith('Jo'));  // true

console.log(name.endsWith('th'));   // true
console.log(name.endsWith('h'));    // true
console.log(name.endsWith('Sm'));   // false

console.log(name.includes(' '));     // true
console.log(name.includes('S'));     // true
console.log(name.includes('Smj'));   // false

console.log(firstName.repeat(5));   // JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5));     // John John John John John 