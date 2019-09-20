/**
 * Primitives vs. Objects
 * ----------------------
 * 
 * A primitive is simply a variable that has its own memory. Therefore, whenever we assign
 * a primitive to another primitive variable, there will be 2 different primitive values with
 * different memory areas in the memory. 
 * 
 * But with Objects, it is different. An object when assigned to a variable, is passed 
 * through reference, meaning, the two names, are now pointing/referring to the same memory
 * location where the actual values of the objects are stored.
 * 
 * Look at the example below to understand
 */


/* Primitives */
var a = 40;     // memory location for 'a' has been created with value 40
var b = a;      // memory location for 'b' has been created with value of 'a' i.e., 40
a = 26;         // a's value is now mutated to 26
console.log(a); // 26
console.log(b); // 40

/* Objects */
var john = {
    name: "John",
    age: 29
};
var jill = john;    // john's reference is assigned to jill. That means john and jill point
                    // to the same thing in the memory.
john.age = 42;      // mutated john's age field to 42. This will also affect jill's age field
console.log(john.age);  // 42
console.log(jill.age);  // 42             

// Therefore this proves that Objects are different compared to Primitives


/* Primitives & Objects sent as function arguments */
var age = 25;
var ram = {
    name: "Ram",
    city: "Kolkata"
};

function change(primitive, object) {
    primitive = 90;
    object.city = "Hyderabad";
}

change(age, ram);   // age is a primitive & ram is an object
                    // Therefore, age is sent by value & object is sent by reference
console.log(age);   // 25
console.log(ram.city);  // Mumbai

// When we pass the Primitive as an argument to the function, it is sent as a value.
// Thereby, a copy of age's value is available at the function's exec stack.
// But when we send an Object as an argument to the function, it is sent as a reference.
// Thereby, the address in memory is available in the function's exec stack.