/********************************************************************************************
 * Objects - Properties
 */

/* Object declaration using object literal {} */
var ram = {
    // object contains <property>:<value> pairs as follows:
    firstName: "Sriram",    // Another declarations way is: "firstName" : "Sriram",
    lastName: "Chandrabhatta",
    dob: 1995,
    // A property can also be an array as shown below:
    family: ["Ramakrishna", "Padmavathy", "Sai Siva Krishna", "Sruti Swaroop"],
    job: "software engineer",
    isMarried: false
};

console.log(ram);
// accessing object properties:
console.log(ram.firstName);     // accessing using dot operator .
console.log(ram['lastName']);  // accessing using array brackets []

// property addition into the object
ram.isGraduate = true;
ram['isPostGraduate'] = false;
console.log(ram);

// object property mutation:
ram.job = "coder";      // Changed the ram's property - job from "software engineer" to "coder"
ram['family'][2] = "SS Krishna";
console.log(ram);


/* Object creations using new Object(): */
var roop = new Object();
console.log(roop);      // empty object, has no properties & methods

// adding properties into the object:
roop.firstName = "Sruti Swaroop";
roop.lastName = "Chandrabhatta";
roop.dob = 1996;
roop.family = ["Ramakrishna", "Padmavathy", "Sai Siva Krishna", "Sriram"];
roop.job = "student";
roop.isMarried = false;

console.log(roop);


/**
 * Object Methods
 */ 
var siva = {
    firstName: "Sai Siva Krishna",
    lastName: "Chandrabhatta",
    dob: 1989,
    family: ["Ramakrishna", "Padmavathy", "Sriram", "Sruti Swaroop"],
    job: 'student',
    isMarried: false,
    // method declaration in an object
    calcAge: function(dob) {
        return 2019 - dob;
    }
};

// Calling the method in the object. Note that the method needs an argument to be passed into it
console.log(siva.calcAge(1989));

// The problem with the calcAge() method defined in siva object is that it takes in dob
// as a parameter, which it has with itself. We will now write a calcAge() for the roop
// object and in that calcAge(), we will use the dob present in the object itself using the
// 'this' keyword:
roop.calcAge = function() {
    return 2019 - this.dob;
}

// now the calcAge() function will return the age, and we can store it in a new property
// of the object itself as follows:
roop.age = roop.calcAge();
console.log(roop);


// We can save the make the property inside the function and assign the new age to itself as follows:

// function definition
ram.calcAge = function() {
    this.age = 2019 - this.dob;
}

// call the method
ram.calcAge();
console.log(ram);