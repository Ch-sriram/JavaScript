/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 
GOOD LUCK 😀
*/

/* Solution: */
var johnMass = 80, markMass = 100;
var johnHeight = 1.82, markHeight = 1.90;

// BMI = Mass / (Height * Height);
var johnBMI = johnMass / johnHeight ** 2;
var markBMI = markMass / markHeight ** 2;

// Printing the BMIs
console.log("John's BMI is " + johnBMI);
console.log("Mark's BMI is " + markBMI);

markHigherBMI = markBMI > johnBMI;
console.log("Is Mark's BMI higher than John's BMI? " + markHigherBMI);