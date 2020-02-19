/********************************************************************************************************************
 * What we'll learn:
 * 1. How to use ES6 Modules.
 * 2. Default and named exports and imports.
 * 
 * First of all, in ./src/js/ directory, we create two new directories named "models" and "views".
 * We will put all the code related to Model (Data) in MVC, in ./src/js/models/ and all the code related to 
 * View (front-end manager) in MVC, in ./src/js/views/ 
 * 
 * We create two new files - "Search.js" and "searchView.js" in "./src/js/models" and "./src/js/views" directories
 * respectively. By convention, all the files defined in Model part of MVC architecture are named with an uppercase 
 * letter as the start of the filename, hence "Search.js", and all the files defined in View part of the MVC 
 * architecture are named using Camel casing, hence "searchView.js".
 * 
 * Default Exports:
 * ---------------
 * We only use default exports in ES6, when we only have one thing to export in the project. To do a default export
 * we simply write the following code:
 *    export default "I am an exported string.";
 * 
 * The above piece of code can be written in "Search.js" @"./src/js/models" and we can import it in "index.js" 
 * i.e., this file, as follows:
 *    import str from './models/Search';  // Note that we don't need the .js extension to be mentioned when importing
 * Instead of str, we can use any name there, such as "string", "x", "ajdbcjhbc", etc.
 * 
 * 
 * Named Exports:
 * -------------
 * Now, if we want to export multiple things from a module, then we use something known as Named Export.
 * From "searchView.js" @"./src/js/views/", if we want to export the add() function to this file, then we do it as:
 *    export const add = (a, b) => a + b;
 * Instead of the name add, we can use any name. But when we import that function in the index.js file, we have
 * to use the same name as it was when it was exported, and therefore, it is imported as follows:
 *    import { add } from './views/searchView';
 * 
 * Now, we can export multiple things using named exports, as we told in the beginning. Therefore, in searchView.js
 * we will write code to export multiple things (here, things can be a value, function, etc).
 *    export const add = (a, b) => a + b;
 *    export const mul = (a, b) => a * b;
 *    export const rem = (a, b) => (a > b) ? a % b : rem(b, a);
 *    export const val = 42;
 * 
 * Now we can export these named exports in our index.js file as follows:
 *    import { add } from './views/searchView';
 *    import { mul } from './views/searchView';
 *    import { rem } from './views/searchView';
 *    import { val } from './views/searchView';
 * 
 * Or, we can import all of them in a single line as follows:
 *    import { add, mul, rem, val } from './views/searchView';
 * 
 * Remember that we have to use the exact same names to import the exported files as they were mentioned in the
 * module where we exported. Now, if we want to change the name, then we can do so by importing as follows:
 *     import { add as a, mul as m, rem as r, val as v } from './views/searchView';
 * 
 * If we want to import everything, then we do the following:
 *     import * as searchView from './views/searchView';
 * 
 * for the full code, see below
 */

// This is how we import default exports.
import str from './models/Search';  // Note that we don't need the .js extension to be mentioned when importing
console.log(`The string that we imported from Search.js is: ${str}\n\n`);

// We import named exports as follows:
import { add, mul, rem, val } from './views/searchView';
console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`2 * 3 = ${mul(2, 3)}`);
console.log(`3 % 2 = ${rem(3, 2)}`);
console.log(`The value that we imported from searchView.js is: ${val}\n\n`);


// If we want to import the things from another module but we want to name them as we please, we use 'as' syntax:
import { add as a, mul as m, rem as r, val as v } from './views/searchView';
console.log(`2 + 3 = ${a(2, 3)}`);
console.log(`2 * 3 = ${m(2, 3)}`);
console.log(`3 % 2 = ${r(3, 2)}`);
console.log(`The value that we imported from searchView.js is: ${v}\n\n`);


// When we want to import everything from a module into a single object, we do the following:
import * as searchView from './views/searchView';
console.log(`2 + 3 = ${searchView.add(2, 3)}`);
console.log(`2 * 3 = ${searchView.mul(2, 3)}`);
console.log(`3 % 2 = ${searchView.rem(3, 2)}`);
console.log(`The value that we imported from searchView.js is: ${searchView.val}`);
