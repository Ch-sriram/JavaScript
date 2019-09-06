/********************************************************************************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height.
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.
Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
GOOD LUCK 😀
*/

// John's Object
var john = {
    fullName: "John Smith",
    mass: 85,   // kg
    height: 1.8 // meters
};
console.log(john);

// Mike's Object
var mike = {
    fullName: "Mike Smith",
    mass: 90,       // kg
    height: 1.95    // meters
};
console.log(mike);

// John's BMI Calculator
john.calcBMI = function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
}

// Mike's BMI Calculator
mike.calcBMI = function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
}

var maxBMI = function() {
    console.log("John's BMI = " + john.calcBMI());
    console.log("Mike's BMI = " + mike.calcBMI());
    if(john.bmi < mike.bmi)
        console.log(mike.fullName + " has a higher BMI of " + mike.bmi);
    else if(john.bmi > mike.bmi)
        console.log(john.fullName + " has a higher BMI of " + john.bmi);
    else console.log(
            "Both " + john.fullName + " & " + mike.fullName + " have the same BMI = " + 
            john.bmi
         );
}

// Calling the maxBMI() function which will generate required BMI values for both John & Mike
maxBMI();