/********************************************************************************************
 * Immediately Invoked Function Expressions (IIFE)
 * -----------------------------------------------
 * IIFE (pronounced as "iffy") is used to hide the data.  If we want some data to be 
 * unaccessible from the Global Execution Context, then we use IIFE.
 * 
 * A normal function is like the following:
 * function game() {    // function declaration
 *      var score = Math.random() * 10;
 *      console.log(score >= 5);
 * }
 * game();      // Function call
 * We can call the game() function and access the score variable from the global scope
 * But if we don't want that to happen, we use IIFE, as follows:
 */

// Demo of IIFE
(   // We trick the parse to think that inside this paranthesis, there's an expression, 
    // but it is an anonymous function.
    function() {
        var score = Math.random() * 10;
        console.log(score >= 5);
    }
)();    // We call it here itself using "();"

// We cannot access the score variable here in the global scope.
// console.log(score);      // ReferenceError


// This time, we will pass in an argument to the IIFE as follows
(
    function(goodLuck) {
        var score = Math.random() * 10;
        console.log(score >= 5 - goodLuck);
    }
)(5);   // We are passing 5 into the function that we just declared as the IIFE


// IIFE's are a really powerful tool to be used in JavaScript