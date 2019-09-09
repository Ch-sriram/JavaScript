/********************************************************************************************
 * Execution Context in Detail - Hoisting
 * --------------------------------------
 * 
 * We can associate an execution context with an object, i.e., an execution context can be 
 * thought of as an object. This object (i.e., the execution context) has 3 properties, 
 * namely:
 * 1. Variable Object (VO): contains function arguments, function's inner variable 
 *                          declarations, as well as function declarations.
 * 2. Scope Chain: contains current variable's objects as well as variable objects of all its
 *                 parents.
 * 3. "this" variable: which is an object that refers to the current execution context's
 *                     object.
 * 
 * How's this execution context actually created?
 * -> By what we already know, we can say that when a function is called, a new execution 
 *    context is created on top of the stack. 
 *    This happens in two phases:
 * 
 *      1. Creation Phase: In this phase, again there are 3 phases:
 *                         1. Creation of the Variable Object (VO).
 *                         2. Creation of the Scope Chain. [Huge topic, we'll know about
 *                            this topic later] 
 *                         3. Determine the value of the "this" variable.
 * 
 *      2. Execution Phase: The code of the function that generated the current execution
 *                          context is run line by line & all the variables are defined.
 *                          If it is a global execution context, then the global context's
 *                          code is executed line by line.
 * 
 *      1.1. Creation of the Variable Object (VO):
 *              1. The argument object is created, containing all the arguments that were
 *                 passed into the function.
 * Points 2 |   2. Code is scanned for function declarations: for each function, a property
 * & 3 are  |      is created in the Variable Object (VO), pointing to the function, even
 * known as |      before the code starts executing.
 * Hoisting |   3. Code is scanned for variable declarations: for each variable, a property
 * -------- |      is created in the Variable Object (VO), and set to undefined.
 * 
 *      The last 2 points in the creation of the VO are what we commonly call "Hoisting".
 *      Functions & Variables in JS are hoisted, it means that the JS functions & variables
 *      are available for calling/accessing before the Execution Phase actually starts.
 *      Both functions & variables might be hoisted, but they're hoisted in a different way,
 *      i.e., the difference in hoisting for functions & variables is that, functions are 
 *      already defined before the start of the Execution Phase of the context, while 
 *      variables are set to undefined before the Execution Phase begins. Variables will 
 *      only be defined during the run of the Execution Phase.
 */


/* Hoisting in practice */

/////////////////////////////////////////////////////////////////////////////////////////////

// Hoisting for functions
// We can call a function before its definition as follows:

// function call is before its definition
calculateAge(1995);

// function definition
function calculateAge(year) {
    console.log(2019 - year);
}


// The same kind of hoisting for functions won't work for function expressions
// The following will give an error:

// call before the definition of the function expression will lead to an error
//retirement(1995);     // Commented to avoid error
var retirement = function(year) {
        console.log(58 - (2019 - year));
}


/////////////////////////////////////////////////////////////////////////////////////////////

// Hoisting for variables
// when we access a variable before its definition, we get undefined as the result.
// Example:
console.log("(Before definition) age = " + age);
var age = 24;
console.log("(After definition) age = " + age);

// Understanding variables in different execution contexts.
// Example:
function foo() {
    // Hoisting also applies in this function's execution context
    console.log("age = " + age + " (foo()'s execution context);");
    // age defined inside here is different compared to the age defined outside this function
    var age = 99;       
    console.log("age = " + age + " (foo()'s execution context);");
}

foo();

// age from global execution context
console.log("age = " + age + " (global execution context);");


/**
 * One important use case of hoisting is that we can call functions (that are not defined 
 * using a function expression) that are defined later on in the entire JS file. 
 */