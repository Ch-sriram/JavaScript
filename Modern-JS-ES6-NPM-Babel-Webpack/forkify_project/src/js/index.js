/********************************************************************************************************************
 * We want the titles in the .results__list list to occupy only a single line for each of the recipe. We write a 
 * function for this inside ./src/js/views/searchView.js named limitRecipeTitle(), which we call inside the 
 * renderRecipe() function inside the searchView.js module itself.
 * 
 * What we'll learn:
 * ----------------
 * 1. Advanced DOM manipulation techniques.
 * 2. How to use ES6 template string to render entire HTML components.
 * 3. How to create a loading spinner.
 */

import Search from './models/Search';
import * as searchView from './views/searchView';   // we import everything from the ./src/js/views/searchView module
import { elements } from './views/base';    // we import the the elements in ./src/js/views/base module to get DOM elements

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

        // 4. Search for results
        await state.search.getResult();

        // 5. Render results on the UI 
        //console.log(state.search.recipes);
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