/********************************************************************************************
 * Execution Context in Detail - Scoping & Scope Chain
 * ---------------------------------------------------
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
 *      1.2. Creation of the Scope Chain:
 *          Q. What does scoping mean?
 *          A. Scoping answers the question of "where can we access a certain variable?"
 *          
 *          Scope in JS:
 *          -----------
 *          In JS, each new function creates a new scope. Scope is the space/environment,
 *          in which the variables it defines are accessible. In many other programming
 *          languages like C/C++/Java/Python/etc, a scope is simply created by the control
 *          structures like if, while(), for(), etc. But in JS, only a function can create
 *          a new scope.
 * 
 *          Lexical Scoping:
 *          ---------------
 *          In JS, we have Lexical Scoping, it means that, when "a function that is 
 *          defined (lexically) within another function, gets access to the scope of the
 *          outer function".
 * 
 *          We'll see lexical scoping, normal scoping & scope chain in action in the
 *          following examples below.
 * 
 * For visual aid, follow this link: 
 * https://github.com/Ch-sriram/JavaScript/blob/master/JS-Behind-the-Scenes/assets/scope.pdf
 */

/////////////////////////////////////////////////////////////////////////////////////////////
/* Lexical Scoping & Scope Chaining */
var a = "Hello!";
first();    // Possible due to Hoisting.

function first() {
    var b = "Hi!";
    second();   // Possible due to Hoisting.

    function second() {
        var c = "Hey!";
        console.log(a + b + c);
        // The statement above will execute without any errors because of scope chaining
        // due to lexical scoping. 
        
        // finding variable - 'a': When the JS engine (V8 from Google, Spidermonkey from
        // Mozilla, Chakra from Microsoft, etc) looks for variable - 'a', it will first look 
        // for 'a' in the second() function, if 'a' is unavailable in this current 
        // function's scope (which is second()), then the JS engine will look for 'a'
        // in the function which is lexically scoped above the current function (which is
        // first()). JS engine will do this until it finds the variable - 'a' going till
        // the global scope. If the variable is not found anywhere, then there'll be a
        // reference error by the JS engine.

        // finding variable - 'b': When the JS engine looks for variable - 'b', it does not
        // find it in the current scope which is second() function's execution scope.
        // Therefore, due to lexical scoping, JS engine will find for variable - 'b' in the 
        // function that's directly scoped above this function, which is the first()
        // function. We will find the variable - 'b' in the first() function itself.
        // Therefore, variable - 'b''s value is taken from first() function's variable 
        // object.

        // Scope is always chained lexically for every variable created in JS.
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////
/* Execution Stack vs Scope Chaining */
var w = "Hello!";
primary();    // Possible due to Hoisting.

function primary() {
    var x = "Hi!";
    secondary();   // Possible due to Hoisting.

    function secondary() {
        var y = "Hey!";
        ternary();
    }
}

function ternary() {
    var z = "John";
    console.log(z); // This will work fine because 'z' is found in this function's context.
    console.log(w + z); // This will also work because 'w' is found in the global context.
    console.log(w + x + y + z); // Reference Error. Why? (Reason given below)
    // This function is lexically scoped with the global execution context.
    // Therefore, the JS engine tries to look for variable - 'y' in the global execution
    // scope & it doesn't find it there, because the global scope's variable object is 
    // scoped upwards of ternary() scope's variable object. Therefore, this will result in
    // a reference error.
}