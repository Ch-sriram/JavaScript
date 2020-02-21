/********************************************************************************************************************
 * What we'll learn:
 * ----------------
 * 1. How to build simple data model using ES6 Classes.
 * 
 * For the search query, we are going to describe the data model using ES6 classes inside the 
 * ./src/js/models/Search.js file. Therefore, inside Search.js, the only thing we export is the class. 
 * Inside Search.js, we will have a class called Search, which is exported and that class takes in a parameter in 
 * its constructor called query, because that's what the query given by the user is. The query is taken from the user
 * and provided to the getResult function inside the Search class (Open the Search class to check the code).
 */

import axios from 'axios';
import Search from './models/Search';

const search = new Search('pizza');
console.log(search);
search.getResult(); // for this example, we have hard-coded the search to 'pizza', later, we will get the query from
                    // the DOM