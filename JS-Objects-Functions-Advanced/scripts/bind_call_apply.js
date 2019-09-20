/********************************************************************************************
 * Bind, Call & Apply
 * ------------------
 * call() & apply() are similar to each other, such that, call() asks for the arguments 
 * differently compared to apply(). Both call() & apply() are used for method borrowing.
 * 
 *  call() syntax
 *  -------------
 *      <object>.<method>.call(this, argument1, argument2, ...);
 *  where, this refers to the object that the particular method is being called on.
 *         argument1, argument2, ... are arguments of the <method>.
 * 
 *  apply() syntax
 *  --------------
 *      <object>.<method>.apply(this, [list of arguments]);
 *  where, [list of arguments] are all the list of arguments that the <method> accepts. The
 *         <method> also has to be defined in such a manner that it takes in a list as an 
 *         argument.
 * 
 * bind() is majorly used for something known as currying. Currying is a technique used to 
 * create a function based on another function, but with some preset parameters. In JS, this
 * is achieved using the bind() method. This new variable holds the curried/presetted 
 * function. When calling the curried function, we just pass the remaining parameters.
 *  
 *  bind() syntax
 *  -------------
 *      <object>.<method>.bind(this, argument1, argument2, ...);
 *  where, argument1, argument2, ... are optional values of arguments we want to preset
 *         before calling the function with all the arguments passed into the function.
 */

var john = {
    name: "John",
    yearOfBirth: 1990,
    job: "teacher",
    presentation: function(style, timeOfDay) {
        // depending on the style & timeOfDay, the greeting will differ
        if (style === "formal") {
            console.log(
                "Good " + timeOfDay + " ladies and gentlemen. I'm " + this.name + 
                ", I'm a " + this.job + " and I'm " + (2019 - this.yearOfBirth) + 
                " years old."
            );
        } else if (style === "friendly") {
            console.log(
                "Hey, what's up? I'm " + this.name + ", I'm a " + this.job + 
                " and I'm " + (2019 - this.yearOfBirth) + " years old. Have a nice " +
                timeOfDay + "."
            );
        }
    }
};

// we can simply call john.presentation as follows
john.presentation("formal", "morning");

var emily = {
    name: "Emily",
    yearOfBirth: 1984,
    job: "designer"
};

// We can use method borrowing using call() as follows:
john.presentation.call(emily, "friendly", "evening");

// example of apply()
// john.presentation.apply(emily, ["formal", "afternoon"]);
// In this code, the line above will give us an error because presentation method doesn't
// the a list argument as a parameter.


// We can use bind() for currying, i.e, for presetting some arguments before calling
// Here, we're presetting the friendly parameter as follows:
var johnFriendly = john.presentation.bind(john, "friendly");
johnFriendly("morning");    // we only send the remaining arguments' values which is in this
johnFriendly("evening");    // case, the calue for the timeOfDay

var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("morning");
emilyFormal("evening");



// exampple from first class functions
var years = [1955, 1966, 1989, 1995, 2004, 2000];

function arrayCalc(arr, fn) { // fn is the function
    var result = [];
    for(var i = 0; i < arr.length; ++i)
        result.push(fn(arr[i]));    // we call the function argument 'fn' on arr[i]
    return result;
}

function calculateAge(year) {
    return 2019 - year;
}

// in some countries, age for becoming an adult is different. In japan, it is 20. Hence
// we will use the 'limit' variable to preset the age before calling the function
function isAdult(limit, age) {
    return age >= limit;    // if the age is >= 18, the function returns true, else false
}

var ages = arrayCalc(years, calculateAge);  // callback function here is calculateAge()
console.log(ages);

// arrayCalc only uses one function argument in its callback fuunction's call. Therefore, 
// presetting the 'limit' variable in isAdult function as follows
var isAdultJapan = isAdult.bind(this, 20);
var adultsJapan = arrayCalc(ages, isAdultJapan); 
console.log(adultsJapan);

// or, we can simply write the following
var adultsIndia = arrayCalc(ages, isAdult.bind(this, 18));
console.log(adultsIndia);