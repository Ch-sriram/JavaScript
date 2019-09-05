/********************************************************************************************
 * Arrays: In JS, array is an object that is used to store items of similar/dissimilar types.
 *         Since an array is an object, the array has many properties (ex: length) & methods
 *         (ex: push(), indexOf(), etc) which are predefined and can be used anytime in JS.
 */

// Array intialization: 2 ways
var names = ["John", "Ramki", "Ram"];
var years = new Array(1990, 1955, 1995);    // years => Year of Birth

// To see the entire array, we log the entire array
console.log(names);
console.log(years);

// To access individual elements of the array, we use indexing as follows:
// Note: Arrays have 0-based indexing
console.log(names[2], years[2]);

/* Array Mutation */
// In JS, we can access array elements that are out of bounds as follows:
names[5] = "Ben";   // in names[] there are only 3 elements, but we're accessing its 6th element 
console.log(names);

// We can use the length property to show the current length of the array:
console.log(years.length);
// We can use the length property to append an element to the end as follows:
years[years.length] = 2000;
console.log(years);


// We can have arrays with dissimilar data types as follows:
var ram = ["Ram", "Chandrabhatta", 1995, "coder", false];
console.log(ram);

// Array objects have many inbuilt methods as follows:
ram.push("yellow"); // Inserts "yellow" at the end of the ram[]
console.log(ram);

ram.unshift("Mr."); // Inserts "Mr." at the beginning of ram[]
console.log(ram);

ram.pop();          // Removes the last element in ram[]
console.log(ram);

ram.shift();        // Removes the first element in ram[]
console.log(ram);

// indexOf(<value>): returns the value of the index if the <value> is present in the array
//                   or else, it returns -1.
console.log(ram.indexOf(1995));         // 2
console.log(ram.indexOf("designer"));   // -1 => "designer" not found in ram[]

// We can use the indexOf() method to check whether an element is present in the array or not
// as follows:
var checkJob = function(list, job) {
    var ans = list[0];
    ans += list.indexOf(job) === -1 ? " is NOT a " : " is a "; 
    ans += job;
    return ans;
}

var checkDesigner = function(list) {
    return checkJob(list, "designer");
}

var isDesigner = checkDesigner(ram);
console.log(isDesigner);