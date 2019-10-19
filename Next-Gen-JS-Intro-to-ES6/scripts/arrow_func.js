/********************************************************************************************************************
 * Arrow Functions Intro
 */
/*jshint esversion: 6*/

const years = [1992, 1995, 1988, 1955, 1965];

// ES5
// We can use the map() method to iterate through any list. map() takes in 3 params which are currentElement, 
// currentElementIndex, list
var ages5 = years.map(function(currentElement) {
    return new Date().getFullYear() - currentElement;
});
console.log(ages5);


// ES6
// We can use the same map() method, but instead of a callback function, we use the arrow notation as follows:

// for a function with only one parameter, we define the callback using the arrow function as follows:
let ages6 = years.map(currentElement => new Date().getFullYear() - currentElement); // note that return wasn't used
console.log(ages6);

// for a function with more than one parameters, we have the parameters inside the paranthesis as follows:
ages6 = years.map((currentElement, index) => `Age Element ${index + 1}: ${new Date().getFullYear() - currentElement}`);    // note that return is not used here
console.log(ages6);

// for a function with multiple lines to be executed, we define the code (w. multiple lines) inside a block:
ages6 = years.map((currEle, idx) => {
    const currYear = new Date().getFullYear();
    const age = currYear - currEle;
    return `Age Element ${idx + 1}: ${age}`;
});
console.log(ages6);