/********************************************************************************************
 * First Class Functions
 * ---------------------
 * Now, we will consolidate some facts in JS:
 *  1. A function is an instance of the Object type.
 *  2. A function behaves like any other object.
 *  3. We can store functions in a variable.
 *  4. We can pass a function as an argument to another function.
 *  5. We can return a function from a function.
 * 
 * Because of all the aforementioned 5 points, we say that, in JS, we can use something 
 * known as First Class Functions.
 * 
 * Examples below:
 */

// Example of function that takes in an array & a function as arguments, and then returns
// an array back, where the returned array is dependent on whatever function has been passed
// on to that function as the argument

/* Passing functions as arguments to another function */
var years = [1955, 1966, 1989, 1995, 2004];

function arrayCalc(arr, fn) { // fn is the function
    var result = [];
    for(var i = 0; i < arr.length; ++i)
        result.push(fn(arr[i]));    // we call the function argument 'fn' on arr[i]
    return result;
}

function calculateAge(year) {
    return 2019 - year;
}

function isAdult(age) {
    return age >= 18;    // if the age is >= 18, the function returns true, else false
}

function maxHeartRate(age) {    // calculates BPM of a person depending on their age
    if (age < 18 && age > 81) return -1;
    return Math.round(206.9 - (0.67 * age));
}

var ages = arrayCalc(years, calculateAge);  // calculateAge is the function that's been
                                            // as an argument to arrayCalc()
console.log(ages);

var adults = arrayCalc(ages, isAdult);  // isAdult is the function that has been passed as an
                                        // argument to the arrayCalc()
console.log(adults);

var heartRates = arrayCalc(ages, maxHeartRate); // maxHeartRate is the function that has been
                                                // passed as an argument to the arrayCalc()
console.log(heartRates);

// Therefore here, arrayCalc() is a generic function which iterates over an input array - arr
// The values in the returned array - 'result' are dependent on the function argument we 
// send when calling the arrayCalc() function.


/* Returning functions from functions */
function interviewQuestion(job) {
    // This is a function that returns functions. These functions contain interview questions
    // depending on the type of "job" sent as the argument
    if (job === "teacher")
        return function(name) {     // this is an anonymous function
            console.log("Which subject do you teach, " + name + "?");
        }
    else if (job === "designer")
        return function(name) {
            console.log(name + ", what do you think about UX design?");
        }
    else return function(name) {
        console.log(name + ", what do you do?");
    }
}

var teacherQuestion = interviewQuestion("teacher"); // now teacherQuestion refers to a       
                                                    // function.
teacherQuestion("John");    // Which subject do you teach, John?

var designerQuestion = interviewQuestion("designer");   // now designerQuestion refers to a 
                                                        // function.
designerQuestion("Jane");   // Jane, what do you think about UX design?
designerQuestion("Mark");   // Mark, what do you think about UX design?
designerQuestion("Jillian");    // Jillian, what do you think about UX design?

// We can also make a call like this directly
interviewQuestion("Coder")("Ram");  // Ram, what do you do?

// The above code in line 89 works because interviewQuestion("Coder") returns a function
// and then there itself, we use the function and call it by passing "Ram" as the 
// argument to it. This is possible in JS because Paranthesis in JS are associated from
// Left to Right in JS.
