/*jshint esversion: 6*/
/********************************************************************************************************************
 * Arrow Functions Lexical 'this' Keyword
 * --------------------------------------
 * The biggest advantage of using the arrow functions is that they share the surrounding 'this' keyword, i.e., they 
 * share the 'this' keyword of the current context automatically. This means that, unlike normal functions,
 * the arrow functions don't get their own 'this' keyword. Therefore, arrow functions don't have their own 'this' 
 * keyword, they use the 'this' keyword of the context/function that they're written in, and so we say that they've a
 * lexical 'this' variable. Therefore, we can use this concept for our advantage.
 */

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        // this function just has an event handler, which is a global function being called from the Window object
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    },
};

//box5.clickMe();     // "This is box number undefined and it is undefined"

/**
 * The above code for clickMe() has a call to the global function, in which there's a callback function defined which
 * uses the 'this' keyword. But the 'this' variable inside the callback function is referring to the Window object, 
 * and not the box5 object's context, and that's because we called the addEventListener() method from the Window
 * object's context, therefore, the 'this' variable corresponding inside the callback function would be a reference
 * to the Window object, and inside the Window object, there's no variable/method like color, position & clickMe().
 * So the output would be: "This is box number undefined and it is undefined"
 */

// A work-around for the problem above is the following:
var box55 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        // this function just has an event handler, which is a global function being called from the Window object
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    },
};

//box55.clickMe();    // "This is box number 1 and it is green"


// ES6 - We'll use arrow functions to work-around the hack we used above
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        // this function just has an event handler, which is a global function being called from the Window object
        document.querySelector('.green').addEventListener('click', () => {
            // since we used the arrow function, the 'this' variable here, is pointing to the immediate object which
            // is lexically scoped before the current scope, which is the context of the box6 object, because the
            // 'this' variable inside the clickMe()'s context is the context of box6 object.
            let str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    },
};

//box6.clickMe();     // "This is box number 1 and it is green"



const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        // the function just has an event handler, which is a method being called from the Window object

        // the 'this' variable in this block points to Window object, because we are using an arrow function, and
        // arrow functions have the 'this' variable always pointing to the immediate upward object where the current
        // function is defined, thus, lexical 'this' variable
        console.log(this);
        document.querySelector('.green').addEventListener('click', () => {
            // the 'this' variable in this context points to the Window object, because the immediate upwards context
            // of the current context has the 'this' variable pointing to the Window object.
            // Therefore, this.position and this.color will be undefined
            let str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    },
};

//box66.clickMe();     // "This is box number undefined and it is undefined"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Another example
function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friendsList) {
    // the 'this' variable here points to the Person object
    var arr = friendsList.map(function(ele) {
        // the 'this' variable here points to the object that has the map() method, which is the Window object
        //console.log(this);
        return this.name + ' is friends with ' + ele;
    });
    console.log(arr);
};

friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends); // [" is friends with Bob", " is friends with Jane", " is friends with Mark"]


// The work-around for the problem above is that we can store the 'this' variable in a variable say 'self' and use
// the 'self' variable as we have used before for the box55 object's clickMe() method, or we can also use the 
// bind() method, and bind the current context (which is refered using 'this' keyword) to the callback function
Person.prototype.myFriends55 = function(friendsList) {
    // the 'this' variable here points to the Person object
    var arr = friendsList.map(function(ele) {
        // the 'this' variable here points to the object that has the map() method, which is the Window object
        //console.log(this);
        return this.name + ' is friends with ' + ele;
    }.bind(this));  // now the 'this' inside the map() method has been bound to the Person constructor's context
    console.log(arr);
};
new Person('John').myFriends55(friends); // ["John is friends with Bob", "John is friends with Jane", "John is friends with Mark"]


// ES6 - using arrow function, resolving the 'this' keyword is very simple
Person.prototype.myFriends6 = function(friendsList) {
    // the 'this' variable here points to the Person object
    var arr = friendsList.map(
        // the 'this' variable here points to the lexically immediate upward context, which is the context of Person 
        // object
        ele => `${this.name} is friends with ${ele}`
    );
    console.log(arr);
};
new Person('Mike').myFriends6(friends); // ["Mike is friends with Bob", "Mike is friends with Jane", "Mike is friends with Mark"]