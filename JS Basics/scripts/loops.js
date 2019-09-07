/********************************************************************************************
 * Looping & Iteration
 */

// for loop
for(var i = 1; i <= 10; ++i) {
    console.log(i);
}

console.log("-----------------------------------------------------------");

for(var i = 1; i <= 20; i+=2) {
    console.log(i);
}

console.log("-----------------------------------------------------------");

var john = ["John", "Smith", 1990, "teacher", false];
for(var i = 0; i < john.length; ++i) {
    console.log(john[i]);
}

console.log("-----------------------------------------------------------");

// the same above loop using while() loop
var i = 0;
while(i < john.length) {
    console.log(john[i]);
    ++i;
}

console.log("-----------------------------------------------------------");

// continue statement
for(var i = 0; i < john.length; ++i) {
    if(typeof john[i] !== 'string') continue;
    console.log(john[i]);
}

console.log("-----------------------------------------------------------");

// break statement
for(var i = 0; i < john.length; ++i) {
    if(typeof john[i] === 'boolean') break;
    console.log(john[i]);
}