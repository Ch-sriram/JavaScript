// String
var firstName = 'John';
console.log(firstName);

var lastName = 'Smith';
console.log(lastName);

// Number
var age = 48;
console.log(age);

// Boolean
var adult = true;
console.log(adult);

// Undefined
var job;
console.log(job);

// Now, we defined job's value to be a String
job = "Software Engineer";
console.log(job);

/**
 * Naming Convention: We use 2 types of naming methodologies:
 * 1. Camel Casing: Example - fullName, lastName, correctAnswer.
 * 2. Snake Casing: Example - full_name, last_name, correct_answer.
 * 
 * 
 * Variable Names cannot be anything we want. A variable name has to start with $ (Dollar), _ (Underscore) or a letter [A-Za-z], anything other than those will violate the rules of Naming a Variable. 
 * Example: The following code in JS would raise an error - 
 * var @years = 993;
 * var 3years = 3;
 * 
 * 
 * Also, we can't have JavaScript's Reserved Words like if, else, delete, new, function, etc as the name of a variable.
 * Example: The following code in JS would raise an error -
 * var if = 10;
 * var else = 'else';
 * var delete = 'Delete Me!';
 */