/*jshint esversion: 6*/
/********************************************************************************************************************
 * The Spread (...) Operator
 * -------------------------
 * The newly introduced Spread Operator is a very convenient way to expand elements of an array in function
 * arguments. But what do we mean by "expanding elements of an array"? Let's see that below:
 */

// Now to send in multiple arguments to a function, we can do that in many ways. One way is to send is send all the 
// elements individually as follows:
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

// ES5
console.log(addFourAges(18, 29, 74, 90));   // 211

// We can also do the same above thing as follows, using apply() method:
var ages = [18, 30, 20, 64];
console.log(addFourAges.apply(null, ages)); // 132
// To the apply() method, we send null because even if we send 'this', we won't make any changes to the context of 'this'

// ES6
console.log(addFourAges(...ages));  // 132
// Here we used the Spread (...) Operator. The Spread Operator expands/spreads the array - 'ages' (that has been 
// sent as an argument to the addFourAges() function), into individual variables. We can see that the function 
// definition has 4 variables. These 4 variables a, b, c & d are assigned ages[0], ages[1], ages[2] & ages[3] 
// respectively in that order.

ages.push(70);  // [18, 30, 20, 64, 70]
console.log(addFourAges(...ages));  // 132, because ages[4] (i.e., 70) is not assigned to anything

ages.pop(); //  [18, 30, 20, 64]
ages.pop(); //  [18, 30, 20]
console.log(addFourAges(...ages));  // NaN, because (18 + 30 + 20 + undefined = NaN)

// Either we use Spread Operator (...) or the apply() method, it doesn't matter, the output produced by the function
// calls above, would be the same, i.e., if ages = [18, 30, 20]
// console.log(addFourAges.apply(null, ages));  // NaN

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// There's another way to use the Spread Operator (...) and it is to Join 2 or more arrays as follows:
const familySmith = ["John", "Mark", "Emily"];
const familyMiller = ["Joe", "Quinn", "Bob"];
const familySmithMiller = [...familySmith, ...familyMiller];  
console.log(familySmithMiller); // ["John", "Mark", "Emily", "Joe", "Quinn", "Bob"]

const allFamily = [...familySmith, "Anthony", "Ben", ...familyMiller];
console.log(allFamily); // ["John", "Mark", "Emily", "Anthony", "Ben", "Joe", "Quinn", "Bob"]

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// We can use the Spread Operator (...) anywhere where there's an array, like the NodeList. A good way to use it is
// as follows:

const heading = document.querySelector("h1");
const boxes = document.querySelectorAll(".box");
const allElements = [heading, ...boxes];

// console.log(allElements);
// console.log(Array.from(allElements));

// Change all the text of <h1> and .box elements into purple.
Array.from(allElements).forEach(cur => cur.style.color = "purple");
