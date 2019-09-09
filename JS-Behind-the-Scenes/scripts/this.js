/********************************************************************************************
 * Execution Context in Detail - The "this" Keyword
 * ------------------------------------------------
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
 *      1.3. Determine the value of the "this" variable:
 *          -> Before knowing how the "this" variable is created, we should know the
 *             difference between functions and methods.
 *              function: is defined/created in the global execution context or in some
 *                        other function's execution context (which is not defined in
 *                        some other object).
 *              method: is defined/created in the execution context of an object, i.e., 
 *                      a property inside a JS object which is a function, is a method.
 * 
 *           The "this" variable is a variable that each and every execution context gets
 *           by default and as we already know, the "this" variable is stored in the 
 *           execution context's object (as shown above).
 *           The "this" variable points to different things depending on what's happening
 *           in the program currently, i.e., if there's a:
 *              1. Regular function call: the "this" variable simply points at the global
 *                                        object (the window object, in case of the browser).
 *              2. Method call: the "this" variable points to the object that is calling the
 *                              method.
 *           Note: The "this" variable is not assigned a value, until the function where it
 *                 is defined, is actually called/invoked.
 *      
 *      We'll see the usage of the "this" variable in practice, down below:
 */ 

/////////////////////////////////////////////////////////////////////////////////////////////

// Normally, the "this" variable always points to the window object
console.log(this);
console.log("-----------------------------------------------------------------------------");

/////////////////////////////////////////////////////////////////////////////////////////////

/* "this" variable's value in a regular function call */
console.log("Call of calculateAge()");
calculateAge(1995);     // possible because of hoisting

function calculateAge(yob) {    // yob: Year of Birth
    var currYear = 2019;
    console.log(currYear - yob);
    console.log(this);  
    // Since calculateAge() is a regular function, the "this" variable invoked in this
    // context will point to the global execution context (which is the window object).
}
console.log("-----------------------------------------------------------------------------");

/////////////////////////////////////////////////////////////////////////////////////////////

/* "this" variable's value in a method call (i.e., a function defined inside a JS Object) */
var john = {
    name: "John",
    yob: 1990,      // yob: Year of Birth
    calculateAge: function() {
        var currYear = 2019;
        console.log(currYear - this.yob);
        console.log(this);
        // The "this" variable invoked here would point to the "john" object, because here,
        // the we have a method definition.

        // The following might be a weird behaviour, but it is perfectly valid in JS
        function innerFunction() {
            console.log(this);
            // The "this" variable invoked at this space, actually points to the global
            // execution context (which is the window object). But why?
            // The reason is simple, but yet, a little confusing to digest. 
            // The "this" variable points to an object, only when it is invoked in a method,
            // i.e., john.calculateAge() for this example. But, the innerFunction(), is
            // actually another function inside of the "john" object's property, which is,
            // a function defined inside the calculateAge property. Therefore, this function,
            // i.e., innerFunction() turns out to be a Regular function defined inside a
            // Method, and as we already know, a regular function call, has the "this"
            // variable always pointing to the global execution context (which is the 
            // window object), and therefore, the "this" variable inside the innerFunction
            // will point to the window object.
        }

        console.log("Call of innerFunction()");
        innerFunction();
    }
};

console.log("Call of john.calculateAge()");
john.calculateAge();
console.log("-----------------------------------------------------------------------------");

/////////////////////////////////////////////////////////////////////////////////////////////

/* Method Borrowing */
// an object of one type can borrow the methods of another object other type,
// but the borrowing makes "this" variable point to their respective caller objects.
// Example illustrated below:
var mike = {
    name: "Mike",
    yob: 1990,       // yob: Year of Birth  
    calculateAge: function() {
        console.log(this);
        var currYear = 2019;
        console.log(currYear - this.yob);
    }
};

console.log("Call for mike.calculateAge()");
mike.calculateAge();    // "this" variable will point to "mike" object.

var maya = {
    name: "Maya",
    yob: 1998       // yob: Year of Birth
};

// Usage of method borrowing: (used very often in JS)
maya.calculateAge = mike.calculateAge;

// now we can call calaculateAge from maya, but the "this" variable in "maya" object
// will point to the "maya" object and not the "mike" object.
console.log("Call for maya.calculateAge()");
maya.calculateAge();