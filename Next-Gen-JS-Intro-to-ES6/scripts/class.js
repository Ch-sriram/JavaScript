/*jshint esversion:6*/
/********************************************************************************************************************
 * Classes
 * -------
 * Classes actually don't add anything new to JS itself, meaning that, classes are just syntactic sugar to the way 
 * we do prototypical inheritence in JS. And therefore that means that classes simply make it easier to implement
 * inheritance and to create objects based on blueprints. So, in ES5, these blueprints are basically function 
 * constructors. In ES5 we added methods through the prototype property of the function constructor to make sure that
 * the instances of object in question actually inherits the methods we defined.
 * 
 * Therefore, we'll first see how we make inheritance possible in ES5 and then look into ES6.
 */

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    console.log(new Date().getFullYear() - this.yearOfBirth);
};

var john5 = new Person5("John", 1990, "Teacher");
console.log(john5);


// Now we will define the exact blueprint as Person5 using ES6 classes
// ES6
class Person6 {
    // Every class has to have a constructor() method that's to be defined. We can contrast it with function 
    // constructor method to define blueprint of an object and see that the parameters in the function there, are
    // also the parameters to the constructor() method here.
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    // We can directly add methods to the class as follows: (see that there's no usage of the 'function' keyword 
    // before defining the function)
    calculateAge() {
        console.log(new Date().getFullYear() - this.yearOfBirth);
    }

    // One important point is that, we cannot define properties inside a class. In general, it is a bad practice to
    // have properties in a class, because then, all those properties will be inherited by the instance of the class
    // also. Therefore, this was kept in mind while not allowing classes to have properties to be defined inside 
    // them. But we can have properties in the blueprint of the object by making the blueprint using the 
    // function constructor way of defining the blueprint of the instance we want.
}

const john6 = new Person6("John", 1990, "Teacher");
console.log(john6);

// Now, when we look into the structure of john6 and john5, we will see no difference at all, because under the hood,
// JS automatically converts the class definition into a function constructor and the blueprint is created. And 
// therefore, classes are just syntactic sugar which makes it easier to write blueprints for object instances in an 
// easier fashion. 


// One thing that we can do with classes is that we can add static methods to the classes. These static methods are
// functions that are attached to the class but not to the instances of the class. Check it out:

class Person66 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        console.log(new Date().getFullYear() - this.yearOfBirth);
    }

    static greeting() {
        console.log("Hey There!");
    }
}

const john66 = new Person66("John", 1990, "Teacher");
// john66.greeting();  // Uncaught TypeError: john66.greeting is not a function
Person66.greeting();    // Hey There!


// Two very important points about classes:
// 1. Blueprints made using ES6 classes are not hoisted. So unlike blueprints created using function constructors,
//    we need to implement the class before we make an instance of that class.
// 2. We can only add methods to classes, but not properties, as explained above in the comments Person6 class.