/********************************************************************************************
 * Advanced JS: Objects & Functions - Object Inheritance & Prototype Chain
 * -----------------------------------------------------------------------
 * 
 * I. Objects
 * ----------
 * Everything in JS, is an object, almost everything, except for Primitives.
 * Primitives are the data types that JS internally assumes for a particular variable.
 * Primitives are Number, String, Boolean, null & undefined. Apart from these, everything
 * else is an Object. 
 * 
 * Arrays, Functions, Objects, Dates, Wrappers for Primitives for Numbers, Strings & Booleans
 * are all Objects, whereas just Number, String, Boolean, null & undefined are Primitives
 * (The image in the HTML of this script will make more sense to see and understand what
 * objects are, and what primitives are).
 * 
 * JS is an Object Oriented Programming Language. Therefore, we use objects for the following
 * reasons:
 *  1. Objects can interact with one another through properties & methods.
 *  2. Objects are used to store data, structure applications into modules & keeping
 *     our code base clean in return.
 * 
 * In JS, to create the blueprint of an object, we don't use a class. Because in JS, there's
 * nothing called a class. In JS, we create the blueprint for object using something known as
 * Function Contructor/Prototype. In other languages (like C++/Java/Python), we can think of
 * Function Contructor as a class. Once we have this constructor, based on it, we can create
 * as many instances of it (which are objects) as we want.
 * 
 * Therefore, the constructors in JS (which are classes in other langs) act as a blueprint,
 * to create instances of that constructor, which are nothing but objects in JS.
 * 
 * Example: We can have a Person Constructor and the properties we can have for this 
 * constructor is name, yearOfBirth & job. We can include a method called calculateAge().
 * Now we can create different instances of the Person constructor, and hence we will have
 * our objects. We will see the example usage below
 * 
 * 
 * II. Inheritance
 * ---------------
 * In simple terms, inheritance is when one object is based on another object, or we can say,
 * it's when one object gets access to another object's properties and methods.
 * 
 * Example: We can have a Person, who can be an Athlete. Therefore, the Athlete's Constructor
 * can inherit the Person Contructor's properties and methods along with having its own
 * properties and methods. Our Athlete Contructor can have properties like olympics and
 * olympicMedals, etc & methods like allowedOlympics(), etc. Then the Athlete Constructor can
 * inherit the Person Constructor's properties & methods so that there will be no code 
 * repetition for Athlete, because Athlete is alos a Person and this makes total sense, as an
 * Athlete will also have a name, yearOfBirth, job and so on...
 * 
 *  II.1 Then how does JS handle Inheritance?
 *  -----------------------------------------
 *  JS is a prototype based language, which means that, inheritance in JS works by something 
 *  known as Prototypes. That means, in practice, each and every object created in JS will 
 *  have something known as the "prototype" property. This "prototype" property makes
 *  inheritance possible in JS.
 * 
 *  Example: Assume that John is an instance of Person Constructor. Now, in order for John 
 *  object to be able to use calculateAge() method, that method has to be added into the 
 *  "prototype" property of the Person Contructor. After that, the John object can call the
 *  the calculateAge() method (i.e., john.calculateAge()) without any hitches, because now,
 *  John has inherited the calculateAge() method. Any other object that's an instance of 
 *  Person Contructor will inherit the calculateAge() method automatically for its use.
 * 
 * Therefore, the "prototype" property of the constructor of an object, is where we put the
 * properties and methods that we want other objects to inherit.
 * 
 * 
 * III. Confusion confusion......Prototype Chain
 * ---------------------------------------------
 * 1. A really important point to understand is that, the Person Contructor's "prototype" 
 *    property is not the "prototype" property of the Person Constructor itself, but it is 
 *    the "prototype" property of all the instances that we created through the Person 
 *    Constructor, i.e., John, in other words, the Person's "prototype" property is the 
 *    "prototype" property of the John Object. (Mind = Blown)!
 * 
 * 2. Prototype Chain: Each and every object that we ever create in JS, is an instance of 
 *    the Object Constructor, i.e., John is an instance of the Person Constructor, but in 
 *    turn, the John is in essence, an instance of the top level constructor in JS known as 
 *    the Object Constructor. Therefore, John is indirectly (through Person) an instance of 
 *    also, the Object Constructor. The Object Constructor has a lot of methods in its
 *    "prototype" property like constructor(), toString(), valueOf(), hasOwnProperty(),
 *    isPrototypeOf(), etc. Therefore, the Person Constructor inherits these methods and
 *    can call them. We can see that as John is an instance of Person, this means that
 *    John can also use the methods defined in the Object Constructor. Therefore, this is the
 *    Prototype Chain, i.e., when we try to access a certain property or method using an
 *    object (in this case it is John object), JS will first try and look for that property
 *    or method in that particular object. If it is not available in that particular object,
 *    JS will look for the required property/method in the object's Prototype, which is the
 *    "prototype" property of the object's parent (which is "prototype" property of Person
 *    in this case). If the required property/method is not even found in the parent, 
 *    the search continues until we reach the Object Constructor's "prototype" property. If
 *    the required property/method is found at the Object Constructor's "prototype" property,
 *    well and good, but if it is not found there, then there will be an error generated by
 *    the JS engine, because Object Constructor's parent is null. And therefore, this is the
 *    Prototype Chain in JS. 
 *    (See the image in the Markup/PDF to understand the concept better)
 * 
 * 
 * IV. Summary
 * -----------
 * 1. Every JS Object has a "prototype" property, which makes inheritance possible in JS.
 * 2. The "prototype" property of an object is where we put properties and methods that we
 *    want other objects to inherit.
 * 3. The Constructor's "prototype" property is NOT the prototype of the Constructor itself, 
 *    but it's the prototype of ALL instances that are created through it.
 * 4. When a certain method/property is called, the search starts in the object itself,
 *    and if it cannot be found, the search for the method/property moves on to the object's
 *    prototype. This continues until the method/property is found. This is known as the
 *    Prototype Chain.
 * 
 */

// Note: Underscores (_) are added to reuse the names as many times as possible.

/* Objects using Literals */
// Till now we've seen how to create Objects using the Object literal, which is
var johnObj = {
    name: "John",
    yearOfBirth: 1990,
    job: "teacher"
};
console.log(johnObj);


/* Objects using Function Constructors */

// But instead of creating a specific object as above, we can use a Function Constructor
// to create a Person blueprint and then instantiate a john object of that Person as follows
var _Person_ = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

// Now we make an instance of the Person type as follows:
var _john_ = new _Person_("John", 1990, "teacher"); // Person object instantiation as john
console.log(_john_);

// The new operator creates an object in memory, and then from the Person constructor
// function assigns the passed arguments during instantiation, into the the instance itself.
// The this keyword points to the Person's instance here because every new method call 
// (not a function call) has a this keyword, which points to the constructor it was
// instantiated from. If it was a normal function, then the this keyword will point to the
// global execution context, but here, this is a method, therefore, it points to the function
// constructor's execution context. Here we say that this is a method call because we used 
// the new operator. By the usage of the new operator, the this variable points to the exec
// context of the function constructor, which is the blueprint of the object we just
// instantiated.


/* Object Inheritance */

// Let's say we want to add a calculateAge() method to the john object created above. 
// We can do so by adding the method as follows:
var __Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calculateAge = function() {
        console.log(2019 - this.yearOfBirth);
    };
};

var __john = new __Person("John", 1990, "teacher");
console.log(__john);
__john.calculateAge();


// This way of defining methods inside the function constructor is fine. But what if
// we have 20 functions where each function has 200-1000 lines of code. In that scenario,
// defining a function inside the function constructor is not feasible. Therefore, in that 
// case we use the 'prototype' property of a function constructor as follows:
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

var john = new Person("John", 1990, "teacher");
var jane = new Person("Jane", 1993, "designer");
var mark = new Person("Mark", 1985, "driver");

// now we add the calculateAge() method to Person constructor using the prototype property
Person.prototype.calculateAge = function() {
    return 2019 - this.yearOfBirth;
};

console.log("John's Age is " + john.calculateAge());
console.log("Jane's Age is " + jane.calculateAge());
console.log("Mark's Age is " + mark.calculateAge());

// We can also add properties to the constructor using the prototype property

// Suppose we want to add the last name to the Person constructor to be Smith, then
// we will do so by adding it as a property using the prototype property of the Person
// Consructor as follows:
Person.prototype.lastName = "Smith";
console.log(john.name + "'s last name is " + john.lastName);
console.log(jane.name + "'s last name is " + jane.lastName);
console.log(mark.name + "'s last name is " + mark.lastName);


/********************************************************************************************
 * Type the following in the Developer Console of the browser after opening obj.html
 * ---------------------------------------------------------------------------------
 *  
 * (1)
 *  john    - We will see the entire john object and its prototype in the form of __proto__
 *            The __proto__ of john is same as that of the Person's __proto__
 *            We can check it by typing in the following expression in the console.
 * 
 *      john.__proto__ === Person.prototype                 // true
 * 
 * (2) 
 *  Inside the john object, there's a __proto__ field, which again has a __proto__ field.
 *  The first __proto__ field corresponds to the Person's prototype property. The second
 *  __proto__ (i.e., the __proto__ inside the __proto__ of the john object) is the 
 *  prototype property of the Object constructor which is the top level constructor. Type 
 *  the following expression in the console:
 * 
 *      john.__proto__.__proto__ === Object.prototype       // true
 * 
 *  This is nothing but the Prototype Chain in action, inside the Browser.
 *   
 * (3)
 *  Because of the prototype chain, we can use the methods defined inside the Object
 *  constructor for the john object as follows:
 *      john.hasOwnProperty("job");         // true
 *      john.hasOwnProperty("lastName");    // false
 * 
 *  john.hasOwnProperty("lastName") evaluates to false because lastName is an inherited 
 *  property from the Person constructor.
 * 
 * (4)
 *      john instanceof Person;                 // true
 *  The above expression, which uses the instanceof operator, is used to know whether an
 *  object is an instanceof some constructor or not. Simultaneously, for the following
 *  expression,
 *      john instanceof Object;                 // will also evaluate to true
 *  because, john is ultimately an instance of the Object constructor.
 *  
 * 
 * (5)
 *  Even an array is also an object. Check the console images in obj.html or obj.pdf to 
 *  understand this point. 
 * 
 * Everything discussed here can been seen in the prototypeChain.pdf or obj.html.
 */


/********************************************************************************************
 * Creating Objects in JS using Object.create()
 * --------------------------------------------
 * The Object.create() method creates a new object, using an existing object as the 
 * prototype of the newly created object. 
 * Example shown below:
 */


// This can be thought of as a normal object, which is the blueprint of Person
var personProto = {
    calculateAge: function() {
        return 2019 - this.yearOfBirth;
    }
};

// We can use the above object as a prototype in the Object.create() as follows:
var John = Object.create(personProto);
console.log(John.__proto__ === personProto);    // true
console.log(John); 

// John object is created, but it has no properties. It only inherited a method called
// calculateAge(). Apart from that, we have to give the John object some properties as shown 
// below
John.name = "John";
John.yearOfBirth = 1990;
John.job = "teacher";

// Now the John object has three properties and 1 method
console.log(John);


// We have another way of adding properties to an object using the Object.create()
// where, the create() method takes in the second parameter as follows
var Jane = Object.create(personProto, {
    name: { value: "Jane" },
    yearOfBirth: { value: 1992 },
    job: { value: "designer" }
});
// This way of creating objects is more tedious, therefore, we use the above way to 
// create objects using Object.create()

console.log(Jane);

console.log(John.__proto__ === Jane.__proto__);     // true