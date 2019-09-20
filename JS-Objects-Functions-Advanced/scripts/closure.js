/********************************************************************************************
 * Closure
 * -------
 * An inner function always has access to the variables and parameters of its outer function,
 * even after the outer function has returned.
 */

function retirement(retirementAge) {
    var notRetiredMsg = " years left until retirement.";
    var retiredMsg = "The person has retired.";
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        var yearsUntilRetirement = retirementAge - age;
        var retired = (yearsUntilRetirement <= 0) ? true : false;
        var status = (!retired) ? (yearsUntilRetirement + notRetiredMsg) : retiredMsg;
        console.log(status);
    }
}

var retirementUS = retirement(66);  // retirement age in US is 66
retirementUS(1955); // even after the call to retirement() function, retirementUS() can 
                    // always access variables & parameters of its outer function,
                    // which is retirement() function.

var retirementIndia = retirement(60);   // retirement age in India is 60
retirementIndia(1955);

var retirementIceland = retirement(67); // retirement age in Iceland is 67
retirementIceland(1955);


/* Interim Challenge */
// interviewQuestion function using closures
function interviewQuestion(job) {
    var teacher = ", which subject do you teach?";
    var designer = ", what do you think about UX design?";
    var other = ", what do you do?";
    if (job === 'teacher')
        return function(name) {
            console.log(name + teacher);
        }
    else if (job === 'designer')
        return function(name) {
            console.log(name + designer);
        }
    else return function(name) {
        console.log(name + other);
    }
}

var interviewTeacher = interviewQuestion("teacher");
interviewTeacher("John");   // even after the outer function, which is interviewQuestion(),
                            // is called, interviewTeacher(), the inner function can still 
                            // access the variables and function parameters of the outer 
                            // function which is interviewQuestion().
var interviewDesigner = interviewQuestion("designer");
interviewDesigner("Jane");

var interviewUnknown = interviewQuestion("coder");
interviewUnknown("Ram");
interviewUnknown("Rohit");

interviewQuestion("driver")("Mike");


// The above written function also uses closure internally, but, a much cleaner code would be
// the code below
function interQuestion(job) {
    return function(name) {
        if (job === "teacher")
            console.log("Which subject do you teach, " + name + "?");
        else if (job === "designer")
            console.log(name + ", what do you think about UX design?");
        else console.log(name + ", what do you do?");
    }
}
// We can call the function declared above, as follows
interQuestion("teacher")("John");
interQuestion("coder")("Ram");
interQuestion("designer")("Jane");