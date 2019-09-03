/**
 * Variable Mutation & Type Coercion
 */

/* Type Coercion */
var firstName = 'Chandrabhatta';
var age = 24;

// String Type data when coerced to Number, the String Type wins:
console.log(firstName + " " + age);

var job, isMarried, isAmazing; // job, isMarried & isAmazing are undefined.
job = 'Software Engineer';
isMarried = false;

// String Type data when coerced to Boolean/undefined, the String wins, i.e., everything is converted to String data
console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he Married? ' + isMarried + '. Is he Amazing? ' + isAmazing);


/* Variable Mutation */
age = "twenty four";
job = "unemployed";

// We can use the alert() function to alert the browser
alert(firstName + ' is ' + age + ' years old & is ' + job + '. Is he Married? ' + isMarried + '. Is he Amazing? ' + isAmazing);

// We can ask for user input using prompt() function
var lastName = prompt("What's " + firstName + "'s Last Name?");
console.log(firstName + " " + lastName);