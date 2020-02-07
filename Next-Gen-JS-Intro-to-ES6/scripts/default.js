/*jshint esversion:6*/
/********************************************************************************************************************
 * Default Parameter
 * -----------------
 * In ES5, if a parameter was optional, we had to handle it separately by checking whether that param is undefined or
 * not, but in ES6, we need not do that, as we can handle the default value for a function parameter extremely easily
 */

// Assume that we are using a function constructor for Smith Family to define the people inside the Smith Family
// as follows:

// ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {
    // Assigning default values to variables if they're not passed in the object creation
    lastName = lastName === undefined ? "Smith" : lastName;
    nationality = nationality === undefined ? "american" : nationality;

    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john5 = new SmithPerson5("John", 1990);
console.log(john5);  // Without line #15 & #16, john.lastName and john.nationality would be undefined

// If emily got married into Diaz family and moved to spain, then
var emily5 = new SmithPerson5("Emily", 1992, "Diaz", "spanish");
console.log(emily5);



// In ES6, we can assign default values to the parameters while declaring the function as follows:

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = "Smith", nationality = "american") {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

let john6 = new SmithPerson6("John", 1990);
console.log(john6); 

// If emily got married into Diaz family and moved to spain, then
let emily6 = new SmithPerson6("Emily", 1992, "Diaz", "spanish");
console.log(emily6);