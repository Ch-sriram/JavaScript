/**
 * Control Structure: if else
 */

var lastName = "Ram";
var civilStatus = "single";

// === is the equality operator which check for the value and type equality
if(civilStatus === "married") {
    console.log(lastName + " is " + civilStatus);
} else {
    console.log(lastName + " is still " + civilStatus + ". Hopefully he'll get married, soon enough.");
}

/*******************************************************************************************/

// In the previous challenge's solution:
var johnMass = 80, markMass = 100;
var johnHeight = 1.82, markHeight = 1.90;

// BMI = Mass / (Height * Height);
var johnBMI = johnMass / johnHeight ** 2;
var markBMI = markMass / markHeight ** 2;

// Printing the BMIs
console.log("John's BMI: " + johnBMI);
console.log("Mark's BMI: " + markBMI);

// Instead of doing the following:
// markHigherBMI = markBMI > johnBMI;
// console.log("Is Mark's BMI higher than John's BMI? " + markHigherBMI);

// We can do the following:
if(markBMI > johnBMI) {
    console.log("Mark's BMI is higher than John's BMI");
} else {
    console.log("John's BMI is higher than Mark's BMI");
}