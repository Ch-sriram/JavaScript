/**
 * Execution Context & Execution Stack
 * -----------------------------------
 */

/**
 * Execution Context
 * -----------------
 * The default Execution Context in JS is the Global Execution Context.
 * Global Execution Context is the window object, i.e., everything defined inside the 
 * Global Execution Context is either a property/method of the window object.
 * The example below will be sufficient to understand this concept.
 */

var lastName = "Sriram";

if(lastName === window.lastName)
    console.log(window.lastName);
else console.log("This will not execute!");


/**
 * Execution Stack
 * ---------------
 * Everything by default is in a Global Execution Context. Therefore, in the Execution Stack,
 * the Global Execution Context is always pointed by the frame pointer at the beginning of 
 * execution. But as soon as a function starts executing, the function's context is pushed
 * on top of the execution stack, and now the frame pointer points to the function's
 * execution stack. As soon as the function completes its execution, the control returns to
 * to the caller execution context (in this case, it's the Global Execution Context that
 * called the function), and when the caller execution context completes its execution, 
 * the execution context pops off the execution stack and the process mentioned above,
 * repeats, until there are no contexts in the stack. 
 * The example below depicts how the execution stack works
 */

var firstName = "John. ";

function first() {
    var a = "Hello! ";
    var b = second();
    return b + a + firstName;
}

function second() {
    var a = "Hi! ";
    var b = third();
    return b + a + firstName;
}

function third() {
    var a = "Hey! ";
    return a + firstName;
}

console.log(first());