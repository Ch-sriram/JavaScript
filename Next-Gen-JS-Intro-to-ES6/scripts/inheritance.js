/*jshint esversion:6*/
/********************************************************************************************************************
 * Inheritance - Classes & Subclasses
 * ----------------------------------
 * Athlete is the subclass of the super class Person. Therefore here, Athlete class inherits all the methods and 
 * properties of Person class. In ES5, we make inheritance possible using Object.create() and in ES6, we make 
 * inheritance possible using the 'extends' keyword.
 */


// ES5
// Person5 is the Super/Parent/Base Class
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    console.log(new Date().getFullYear() - this.yearOfBirth);
};

// Athlete5 is the Sub/Child/Derived Class. See that function constructor contains all the parameters required by
// the instance of the Athlete5 class.
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    // Instead of writing 3 lines of code saying:
    // this.name = name; this.yearOfBirth = yearOfBirth; this.job = job;  we can simply call Person5's constructor
    // in the following way:
    Person5.call(this, name, yearOfBirth, job); // 'this' here will refer to memory created by the new operator when it is called using Athlete5's function constructor
    this.olympicGames = olympicGames;
    this.medals = medals;
};

// This is the line of code used to connect the prototype of Athlete5 to Person5, and it makes Athlete5 as the
// subclass of Person5 class. Object.create() allows us to manually set the prototype property of the object.
Athlete5.prototype = Object.create(Person5.prototype);  // we successfully created a prototype chain from Athlete5 to Person5

// This is a method specific to the instances of the Athlete5 classes. An instance of Person5 class cannot access
// the wonMedal() method.
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
};

var johnAthlete5 = new Athlete5("John", 1990, "Swimmer", 5, 10);
console.log(johnAthlete5);
johnAthlete5.calculateAge();    //  30 (Athlete5's instance has inherited all the methods from the Person5 class)
johnAthlete5.wonMedal();    // 11

console.log(`\n`);

// This is how we connect 2 function constructors in ES5 and make prototypical inheritance possible.


// ES6
// Person6 is the Super Class
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        console.log(new Date().getFullYear() - this.yearOfBirth);
    }
}

// In ES6, it is way easier to create a subclass compared to the way we create in ES5 (using Object.create()).
// We simply use the 'extends' keyword as follows:
class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        //Person6.call(name, yearOfBirth, job);
        // or, we can call the super class' constructor using the super() method as follows:
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6("John", 1990, "Swimmer", 5, 10);
console.log(johnAthlete6);
johnAthlete6.calculateAge();
johnAthlete6.wonMedal();



// NOTE
// Before using the prototypical inheritance using the ES6 way (i.e., using 'class' keyword) we have to completely
// understand how prototypical inheritance works (like prototype chain and what the prototype property is and all),
// because under the hood, JS is just changing the classes created in the ES6 way (i.e., classes created using the
// 'class' keyword) into same as classes created using ES5 way (i.e., classes created using function constructor).