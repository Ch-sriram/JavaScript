/*jshint esversion:6*/
/********************************************************************************************************************
 * The Map Data Structure
 * ----------------------
 * A very common use of JS Objects is to use them as Hash Maps, where the keys are strictly a String data internally
 * and these String type keys could be mapped to arbitrary values.
 * One of the example is:
 *                           var john = {
 *                              firstName: "John",
 *                              lastName: "Smith",
 *                              yob: 1990
 *                           };
 * In the example above, we can refer to john's firstName as john['firstName'] because internally, the key is stored
 * as a string type data. 
 * 
 * But now, after the introduction of the Map data structure in ES6, we need not use objects as the hash map, we can
 * simply use the Map data structure, where the keys are mapped to arbitrary values and the key can be of any type, 
 * it need not just be a string type, it can also be a number/undefined/object type.
 * 
 * Therefore, using Object() objects as Hash Maps, we are limited to keys being a string, but using Map() objects as 
 * Hash Maps, we can have keys to be number/string/boolean/function or even an object of some other type.
 * 
 * We'll see how Maps in ES6 work with the example below
 */

// Quiz Example

var question = new Map();

// To add data to the map, we set a key to a value using the set() method
question.set("question", "What is the official name of the latest major JavaScript version?");  // key: <string> type
question.set(1, "ES5"); // typeof(key) is number
question.set(2, "ES6"); // typeof(key) is number
question.set(3, "ES2015");  // typeof(key) is number
question.set(4, "ES7"); // typeof(key) is number
question.set("answer", 3);  // typeof(key) is string and the typeof(value) is number
question.set(true, "Correct Answer ^_^");   // typeof(key) is boolean
question.set(false, "Wrong Answer, Please Try Again!"); // typeof(key) is boolean

/*
console.log(question);

// We can get the value associated to key by using the get() method as follows:
console.log(question.get("question"));

// We can get the number of keys in the map using size property as follows:
console.log(question.size); // 8

// To delete a key from the map, we can use the delete() method as follows:
question.delete(4); // This deletes the key-4 along with the value associated to it
console.log(question);
console.log(question.size); // 7
question.set(4, "ES7");


// Now, we should never delete a key without check whether that key is present in the map or not, therefore, for that
// reason, we use the has() method in map as follows:
if(question.has(4)) {
    question.delete(4); // executed because key-4 is present in the map
}
console.log(question); 

if(question.has(4)) {
    question.delete(4); // not executed because key-4 is not in the map
}
console.log(question);

// Now, to delete all the keys in the map, we can simply call the clear() method, and by doing that, all the keys
// (along with their values) are deleted from the map.
// question.clear(); 
// console.log(question);  // Map(0) {}
question.set(4, "ES7");

// set(), get(), has() and clear() are the most basic methods that we can use to manipulate the Map object.

// One of the most useful feature of a Map object is that maps are iterable, and therefore, we can always iterate
// through the keys of a map. 
// We can iterate through a Map object in 2 ways:
// 1. Using the forEach() method which is defined inside the prototype of the Map object.
// 2. Using the for-of loop.

// 1. Using the forEach() method in the Map object
// forEach() method takes in a callback function can take 3 parameters, and they're: param1 is currentElement (value)
// param2 is currentIndex (key), and param3 is the Map object itself.
question.forEach((value, key) => {
    console.log(`key: ${key}, value: ${value}`);
});
console.log("\n");



// 2. Using the for-of loop. 

// We can simply loop through the entries (key,value) of the Map object as follows:
for(let entry of question) {
    console.log(`entry: ${entry}`);
}

console.log("\n");

// Or, we can destructure the entries using the entries() method in the Map object. Each entry in the Map is stored
// as an array of key and value pair named 'key' and 'value' (Check the Map Object prototype in the console)
for(let [k, v] of question.entries()) {
    if(typeof k === 'number')
        console.log(`Choice ${k}: ${v}`);
}

*/

console.log(question.get('question'));

for(let [key,value] of question.entries())
    if (typeof key === 'number')
        console.log(`Choice ${key}: ${value}`);

const userInput = parseInt(prompt("What is the correct choice? (Check the developer console for the question and options)"));

console.log(question.get(userInput === question.get('answer')));


// Summary
// Q. Why are Maps better than Objects?
// Reason 1: We can use any type data as keys in a map, whereas the Object only allows string type data as a key
// Reason 2: Maps are iterable, unlike the Object, which have to be converted to an Array and only then we can 
//           iterate through the Object.
// Reason 3: We can get the size of a Map using the size property
// Reason 4: Adding and removing data in Maps is easier compared to Objects.