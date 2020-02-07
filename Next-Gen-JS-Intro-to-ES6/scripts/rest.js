/*jshint esversion: 6*/
/********************************************************************************************************************
 * Rest Parameter (...)
 * --------------------
 * Rest Parameters allow us to pass an arbitrary number of parameters into a function and the we can use these 
 * arguments in the function. The Spread (...) Operator notation is used here, but they're not the same as the 
 * Spread Operator, because we use the Spread Operator to convert an array into single values, whereas in Rest Params
 * we take single valued elements and convert them into an array. Please follow the code below to understand what
 * Rest Parameters are.
 **/

// We want to create a function that receives an arbitrary number of elements which are the years of births of people
// and we want to know whether the person is of full age (i.e., adult) or not? For that, we can do it in 2 ways:

// ES5 - way #1
function isFullAge5() {
    // Every function in JS by default has an array-like data structure known as 'arguments' which is an element of 
    // Object type. This object contains the list of arguments. Now, in ES5, we have to change this 'arguments' data
    // structure to an array because if we want to iterate through the 'arguments' data structure, we have to first 
    // convert it into an array.
    // One important point is that the function definition need not take any argument in the definition part, but
    // still we can pass arguments during the call. We can simply access the passed function parameters using the
    // the 'arguments' object in JS as follows:
    //console.log(arguments); // __proto__: Object(0)
    var argsArr = Array.prototype.slice.call(arguments);
    //console.log(argsArr);   // __proto__: Array(0)

    argsArr.forEach(function(cur){
        console.log((new Date().getFullYear() - cur) >= 18);
    });
}

console.log("ES5 - 'arguments' object example");
isFullAge5(1990, 2005, 1995, 2009, 2002, 2018); // true, false, true, false, true, false
console.log("-----------------------------------------------------------------------------------------------------");
isFullAge5(2002, 1974, 2020); // true, true, false
console.log("-----------------------------------------------------------------------------------------------------");

// We can do the same thing a we did above, in ES6
// ES6 - way #2 (using the Rest Parameters)
function isFullAge6(...years) {
    // Here, we definitely have to take in the individual values into the rest parameter 'years' which will have all
    // the single values indexed from 0 to an arbitrary length. One good thing is that 'years' is already an Array 
    // type object, so we need not convert it to an Array. We can directly iterate through 'years' as follows:
    //console.log(arguments);
    //console.log(years); // __proto__: Array(0)
    years.forEach(cur => console.log((new Date().getFullYear() - cur) >= 18));
}

console.log("ES6 - Rest Parameter Example");
isFullAge6(1990, 2005, 1995, 2009, 2002, 2018); // true, false, true, false, true, false
console.log("-----------------------------------------------------------------------------------------------------");
isFullAge6(2002, 1974, 2020); // true, true, false
console.log("-----------------------------------------------------------------------------------------------------");


// We can add 100, 120, 89, etc, any length arguments in the above 2 functions and it would still work well


// The biggest difference between the Spread Operator and the Rest Parameters is actually in which we use both of
// of them. The Spread Operator (...) is used in the function call while the Rest Operator is used in the function
// declaration to accept an arbitrary number of parameters into the function.


// Now we can use Rest Parameters in a more useful way where we can bind a certain function as follows:

// ES5
function isFullAge55(limit) {
    // The 'arguments' data structure will now also contain the 'limit' variable in the 0th index. We don't want that
    // element to be iterated over. Therefore, when we convert the 'arguments' object of Object type into an object
    // of Array type, we slice the 'arguments' object from index 1. By default, the slice() method slices objects
    // from 0th index.
    var argsArr = Array.prototype.slice.call(arguments, 1); // slice the 'arguments' object from index-1 to its end
                                                            // and assign it to argsArr

    argsArr.forEach(function(cur){
        console.log((new Date().getFullYear() - cur) >= limit);
    });
}

console.log("ES5 - 'arguments' object example with bind()");
var isFullAgeIndia5 = isFullAge55.bind(null, 18);
var isFullAgeJapan5 = isFullAge55.bind(null, 20);

isFullAgeIndia5(1990, 2005, 1995, 2009, 2002, 2018); // true, false, true, false, true, false
console.log("-----------------------------------------------------------------------------------------------------");
isFullAgeJapan5(2002, 1974, 2020); // false, true, false
console.log("-----------------------------------------------------------------------------------------------------");


// ES6
function isFullAge66(limit, ...years) {
    // Here, we need not do anything because we clearly have a Rest Parameter
    years.forEach(cur => console.log((new Date().getFullYear() - cur) >= limit));
}

console.log("ES6 - Rest Parameter Example with bind()");
var isFullAgeIndia6 = isFullAge66.bind(null, 18);
var isFullAgeJapan6 = isFullAge66.bind(null, 20);

isFullAgeIndia6(1990, 2005, 1995, 2009, 2002, 2018); // true, false, true, false, true, false
console.log("-----------------------------------------------------------------------------------------------------");
isFullAgeJapan6(2002, 1974, 2020); // false, true, false