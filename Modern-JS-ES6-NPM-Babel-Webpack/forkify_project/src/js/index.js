/********************************************************************************************************************
 * We want the to render the loading spinner when we are trying to fetch all the recipes about say 'pizza' and 
 * putting that in our view as a list inside the <ul> with the class .results__list. Now, the loading spinner is not
 * only used to be shown in the front-end before rendering the results onto the .results__list, but also, it is to be
 * used for also to render the recipe onto the front-end when one of the recipes from the .results__list is clicked
 * on. And so, for the purpose of re-usability, we write the function that renders the loading spinner inside a
 * common module for the views and it is inside ./src/js/views/base.js module.
 * We use that function in here at controlSearch() async function where it is used for step 3, which is the 
 * preparation of the UI for results. For that, we have to import the renderLoader() method from the 
 * ./src/js/views/base.js module
 * 
 * What we'll learn:
 * ----------------
 * 1. Advanced DOM manipulation techniques.
 * 2. How to use ES6 template string to render entire HTML components.
 * 3. How to create a loading spinner.
 */

import Search from './models/Search';
import * as searchView from './views/searchView';   // we import everything from the ./src/js/views/searchView module

// we import the the elements in ./src/js/views/base module to get DOM elements. renderLoader() to import the 
// Spinning Loader and to render it to the UI. clearLoader() to clear the spinning loader from front-end.
import { elements, renderLoader, clearLoader } from './views/base';    

/**
 * Global State of the app:
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes  -- Stored persistently. We'll know about JS local storage (i.e., persistent data) later.
 */
const state = {};

const controlSearch = async () => {
    // 1. Get the search query from the view
    // const query = 'pizza';  // for now, this is just a placeholder string.
    const query = searchView.getInput();    // we get the search query from the searchView module that we imported
    console.log(query); // testing purposes

    if (query) {
        // 2. If there's a query, then add it to the state as a search object.
        state.search = new Search(query);

        // 3. Prepare UI for results
        // After we get the result, we have to clear the input form
        searchView.clearInput();
        searchView.clearResults();
        
        // We send in the .results class' element from the elements imported from base module
        renderLoader(elements.searchRes);  

        // 4. Search for results
        await state.search.getResult();

        // 5. Render results on the UI  //console.log(state.search.recipes);
        // After we get the results, before rendering them to the front-end, we render the spinning loader invisible
        clearLoader();
        searchView.renderResults(state.search.recipes);
    }
}

// Now we will get the data from ./src/index.html file, where we get the search query using the DOM event listener:
elements.searchForm.addEventListener('submit', event => {
    // When we click the form's submit button, the page reloads. we don't want that, therefore we prevent the default action
    event.preventDefault();
    controlSearch();
});


// The next thing we are going to do is to shorten the titles of the results in the .results__list