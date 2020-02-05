/*jshint esversion: 6*/
/********************************************************************************************************************
 * Destructuring
 * -------------
 * Destructuring gives us a very convenient way to extract data from a data structure like an object/array.
 */


// If we want to store each of the element of an array in a single variable, we apply destructuring in the foll. way:

// ES5
var john = ["John", 25];
var name5 = john[0];
var age5 = john[1];

console.log(name5, age5);   // John 25
// This way in ES5 is fine and works well, but destructuring is way more intuitive in ES6, shown as follows


// ES6
const [name6, age6] = ['Ram', 24];
console.log(name6, age6);   // Ram 24

// In line #21, on the RHS of the assignment '=' operator, we constructed a data structure using an array.
//              and on the LHS of the assignment '=' operator, we destructed the array data structure constructed in 
//              the RHS of '=' in Line #21 and assigned the destructed elements serially to the identifiers used in 
//              LHS of '=' (i.e., 'Ram' to name6, and 24 to age6).


// Destructuring also works with objects in ES6
const obj = {
    firstName: 'John',
    lastName: 'Smith',
};

//const [firstName, lastName] = obj;  // Uncaught TypeError: obj is not iterable at line #36
const {fName, lName} = obj; 
console.log(fName, lName);  // undefined undefined

// We get that output in line #38 because the identifier names on the LHS are not the same as the name of the keys 
// in the object 'obj'. The foll. will work:
const {firstName, lastName} = obj;   // Here, the identifier names match that of the key's names in object 'obj'
console.log(firstName, lastName);   // John Smith

// While destructuring, we have the maintain the identifier names on the LHS of the object same as that of the key's 
// names in the object. Otherwise, the destructuring would be prone to errors/undefined-behaviour.

// We can use aliasing as follows:
const {firstName : f, lastName : l} = obj;
console.log(f, l);  // John Smith


// Now with destructuring, we can return an array from a function and that array can be destructured as follows:
function calcRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65-age];
}

const [age66, retirement] = calcRetirement(1995);   // Destructuring our returned array to age66 and retirement
console.log(age66, retirement); // 25 40