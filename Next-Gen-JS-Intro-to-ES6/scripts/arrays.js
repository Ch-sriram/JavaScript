/*jshint esversion: 6*/
/********************************************************************************************************************
 * Arrays in ES6
 * -------------
 * There are a lot of new methods added to arrays compared to arrays in ES5. Certain methods which are popular are
 * used in this program.
 */

var boxes = document.querySelectorAll('.box');  
// boxes is now a NodeList that contains all the elements of class .box

// Conversion of the NodeList to Array

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);

// Now to change all the boxes to blue color in ES5, we can simply change their CSS classes to .blue as follows:
// boxesArr5.forEach(function(cur) {
//     cur.style.background = 'dodgerblue';
// });


// ES6
const boxesArr6 = Array.from(boxes);

// Now to change all the boxes to blue color in ES6, we can simply change their CSS classes to .blue as follows:
boxesArr6.forEach(cur => cur.style.background = "dodgerblue");  
// as there's only 1 param and 1 statement in the callback function, we need no () for the param and no {} for the 
// statement cur.style...... = "dod....";

// We need not even take boxesArr6, we can simply write the foll. piece of code:
// Array.from(boxes).forEach(cur => cur.style.background = 'dodgerblue');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Now when looping through and Array/NodeList, in ES5/ES6, we cannot use 'break' or 'continue' statements inside
// the forEach and map methods. Therefore, we go for the traditional loop sequences like 'while' or 'for'.

// Changing the text on the boxes
// ES5 - for loops
// for(var i = 0; i < boxesArr6.length; ++i) {
//     if(boxesArr6[i].className === "blue box")
//         continue;   // use 'break' for a different output;
//     boxesArr6[i].textContent = "I've changed to blue!";
// }


// ES6 - for-of loops. These are new loops which are known as 'for-of' loops
// for(let cur of boxesArr6) {
//     if(cur.className === "blue box")
//         continue;
//     cur.textContent = "I've changed to blue!";
// }

// Instead of using cur.className === "blue box", we can simply do the following:
for(let cur of boxesArr6) {
    if(cur.className.includes("blue"))
        continue;
    cur.textContent = "I've changed to blue!";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// There are 2 new Array methods which are very useful. They can be used in tandem with indexOf() method.

// To check if someone is of full age, we do the foll.

// ES5
const ages = [12, 13, 14, 17, 18, 21];
var full5 = ages.map(function(cur){
    return cur >= 18;
});
console.log(full5); // [false, false, false, false, true, true]

// To get the index of the 1st person who is of full age:
console.log(full5.indexOf(true));   // 4

// To get the age of the index of the 1st person who is of full age:
console.log(ages[full5.indexOf(true)]);    // 18



// ES6, we have findIndex() and find() method and they can be used as follows:

// The findIndex() method takes in a callback function, which takes in 3 parameters. 
// <arrayX>.findIndex((param1, param2, param3) => {...some statement(s)...}); 
// param1 is currentElement, param2 is currentIndex and param3 is the array on which the callback was called.
// findIndex() will return the index of the first element that satisfies the condition(s) given as the statement
console.log(ages.findIndex(cur => cur >= 18)); // 4

// The find() method has the exact description as the findIndex method. The only difference is, find() will return
// us the first element that satisfies the condition in the statement.
console.log(ages.find(cur => cur >= 18));   // 18
