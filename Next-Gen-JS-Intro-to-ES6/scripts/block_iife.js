/***********************************************************************************************
 * Blocks & IIFEs in ES6
 */

/*jshint esversion: 6*/

// ES5
// In ES5, if we want data privacy, we use IIFEs as follows:
(function() {
    var c = 25;
})();

//console.log(c);     // error


// ES6
// In ES6, if we want data privacy, we simply use block scoping with the usage of let and const 
// variables. Note: a variable created using var keyword in a block can also be referred from
// outside the scope too.
{
    let a = 10;
    const b = 1e7+7;
    var c = 453;
}

//console.log(a + b);     // error
console.log(c);     // no error