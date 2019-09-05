/********************************************************************************************
 * Functions: Declarations, Statements & Expressions.
 */

// Function Declaration
function calculateAge (YOB) {
    // YOB: Year of Birth
    var currYear = 2019;
    return currYear - YOB;
}

// Function Statement is calling the function after it was defined
var johnAge = calculateAge(1990);
var ramkiAge = calculateAge(1955);
var ramAge = calculateAge(1995);
console.log("John's Age: " + johnAge + "; " +
            "Ramki's Age: " + ramkiAge + "; " + 
            "Ram's Age: " + ramAge + ";");

// Function Declaration that doesn't return anything
function yearsUntilRetirement (birthYear, firstName) {
    var age = calculateAge(birthYear);
    var retirement = 58 - age;  // Retirement Age in India is 58
    var retirementStatus = retirement < 0 ? "retired" : "not retired";
    if (retirementStatus === "not retired")
        console.log(firstName + " still has " + retirement + " years for retirement");
    else console.log("It has been " + (-retirement) + " years since " + firstName + " has retired");
}

yearsUntilRetirement(johnAge, "John");
yearsUntilRetirement(ramkiAge, "Ramki");
yearsUntilRetirement(ramAge, "Ram");


// Function Declaration is as follows:
// function occupation(job, firstName) {}
// Same as the declarations as we have seen above. 
// But, Function Expressions are anonymous functions that are assigned to a JS variable/object as follows:

var occupation = function (job, firstName) {
    var doesThis = "";
    switch(job) {
        case "teacher":
            doesThis += "is a teacher who teaches how to code";
            break;
        case "driver":
            doesThis += "is a truck driver";
            break;
        case "coder":
        case "software engineer":
            doesThis += "is a software engineer working at xyz company";
            break;
        case "designer":
            doesThis += "is a system designer working for xyz company";
            break;
        default:
            doesThis += "does something else";
    }
    return firstName + " " + doesThis;
}

var johnJob = "teacher", ramkiJob = "retired", ramJob = "coder";

console.log(occupation(johnJob, "John"));
console.log(occupation(ramkiJob, "Ramki"));
console.log(occupation(ramJob, "Ram"));

/********************************************************************************************
 * Expressions vs. Statements in JS
 * --------------------------------
 * 
 * In JS, Expressions return something explicit immediately, whereas statements do not return
 * something immediately. The above anonymous function is assigned to occupation
 * variable, it means that whenever we call occupation, we basically are expecting something
 * in return. But whenever a statement like if(), while(), for(), etc are used, they'll
 * obviously do something with the code, but they themselves never return anything explicit.
 * 
 * 
 * statement example: 
 *      > if(true) {console.log(45);}
 *      This is a statement. if() will return undefined. But since console.log(45) is an
 *      expression, we will get a return value of 23. If we copy and paste this line in 
 *      the browser, we will get undefined & 45 as the return value.
 * 
 * expression example:
 *      > occupation(johnJob, "John");
 *      This line here is an expression and definitely returns something. If we open the
 *      HTML page related to this JS page in the browser & open the console and copy-paste
 *      the line of code above, we will see that it returns some kind of a value, which 
 *      is not undefined.
 */


 