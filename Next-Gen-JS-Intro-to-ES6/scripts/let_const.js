/***********************************************************************************************
 * let & const
 *  
 */
/*jshint esversion: 6*/

// ES5
// A variable defined with the keyword 'var' is lexically scoped, but not block scoped, and also
// that variable is mutable, as shown below
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5); // no error


// ES6 - A variable can be defined using the 'let' keyword, and that variable is block scoped
// and is always mutable. But if we want to declare and define a constant value to some name, 
// then we use the 'const' keyword to define that name. The const declared name will be
// immutable as shown below
const name6 = 'Jane Smith';
let age6 = 25;
// name6 = 'Jane Miller';  // error
console.log(name6);


// what do we mean by lexical scope? it is the same as we have seen previously in ES5, i.e.,
// in ES5
function driversLicence5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    console.log(firstName + ', born ' + yearOfBirth + ', has passed the test. Therefore, he is allowed to drive a car on road');

    // We are using firstName and yearOfBirth variables out of the scope of the if {} block,
    // and this will execute without any problems
}

driversLicence5(true);


// 'let' & 'const' declared variables are both block scoped, which means that they can only be
// refered inside the block they're declared in, otherwise, there'll be aan error
// In ES6
function driversLicence6(passedTest) {
    
    // if (passedTest) {
    //     let firstName = 'John';
    //     const yearOfBirth = 1990;
    // }
    
    // We are using firstName and yearOfBirth variables out of the scope of the if {} block,
    // and this will not execute because both of the variables are block scoped
    
    // console.log(firstName + ', born ' + yearOfBirth + ', has passed the test. Therefore, he is allowed to drive a car on road');    // error
    
    // Instead of refering firstName & yearOfBirth here, we can refer them inside the block 
    // scope they're declared in, as shown below

    if (passedTest) {
        let firstName = "John";
        const yearOfBirth = 1990;

        console.log(firstName + ', born ' + yearOfBirth + ', has passed the test. Therefore, he is allowed to drive a car on road');    // no error
    }

    // or else, we can also declare the variables outside the if {} block and then refer to 
    // them inside the if {} to mutate them and then outside the if {}, we can refer them as
    // show below
    
    let firstName;
    const yearOfBirth = 1990;   // const variables have to be defined when they're declared
    if (passedTest) {
        firstName = 'John';
    } 
    console.log(firstName + ', born ' + yearOfBirth + ', has passed the test. Therefore, he is allowed to drive a car on road');

    // Notice that, the variables firstName & yearOfBirth are declared two times, once in the
    // if {} in line 62 & 63, and then at line 72 and 73. Both of these variables are different
    // because a 'let' and 'const' variable is block scoped.
}

driversLicence6(true);



// Hoisting in ES6 is different compared to Hoisting in ES5

// ES5
function hoisting5(test) {
    console.log(firstName); // no error, due to hoisting & output is 'undefined'
    if (test) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + " born in " + yearOfBirth + " can now drive on-road");
}

hoisting5(true);


// ES6
function hoisting6(test) {
    // console.log(firstName); // error, due to something known as temporal dead-zone
    let firstName;
    const yearOfBirth = 1990;
    if (test) {
        firstName = 'John';
        console.log(firstName + " born in " + yearOfBirth + " can now drive on-road");
    }
    // temporal dead-zone basically means that the variables created using 'let' and 'const' 
    // are technically hoisted, but we can still not use/refer them before we actually declare 
    // the variable.
}

hoisting6(true);


// Understanding the difference between 'let' and 'var'. If the foll. code is understood
// properly, then we can move on ahead to understand the next concept in ES6
let i = 23;     // i defined here is in the global execution context's block scope
for (let i = 0; i < 5; ++i)     // i defined here is inside the for block's scope
    console.log(i); // 0 1 2 3 4
console.log(i); // 23


// scope chain in action
var j = 23;     // j defined here is in the global execution context's scope
for (var j = 0; j < 5; ++j) // j defined here is the same as referring to the j above this scope
    console.log(j); // 0 1 2 3 4
console.log(j); // 5