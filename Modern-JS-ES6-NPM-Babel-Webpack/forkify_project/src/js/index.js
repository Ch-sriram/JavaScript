/********************************************************************************************************************
 * We've fully implemented the MVC for Searching. Now, we will implement MVC for getting the individual recipes.
 * For that, we will create the Recipe Model (Data) at ./src/js/models/Recipe.js which will contain the class
 * related to the Recipe Data Model. The Recipe class inside the Recipe Module will contain the AJAX Request for
 * the Recipe Data that's clicked by the user from the .results__list class' element's ID. Therefore, we can
 * find that every Recipe object will take in ID as a parameter into its constructor. Check the Recipe Module.
 * We import the Recipe Model (Data) here and create get details about the recipe using the Recipe class.
 * 
 * Very Important Information
 * --------------------------
 * In general, we never store/hard-code information like API Keys, Passwords, Usernames, etc, inside
 * the JS Modules present at client-side. Therefore, we always make an AJAX Request for sensitive data
 * such as mentioned above, and get them from some other server (which is generally our own server/domain).
 * 
 */

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';   // we import everything from the ./src/js/views/searchView module


import { elements, renderLoader, clearLoader, elementStrings } from './views/base';    

/**
 * Global State of the app:
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes  -- Stored persistently. We'll know about JS local storage (i.e., persistent data) later.
 */
const state = {};

// SEARCH CONTROLLER
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


// event to handle pagination in .results__page class' element.
elements.searchResPages.addEventListener('click', event => {
    //console.log(event.target);
    // event.target is not the actual button element that we want, but it will be whatever the user 
    // click onto that's inside the button, i.e., it can be the button element, or the Page number span,
    // or it can be also be the left or right icon, depending on what the click on. Therefore, for that
    // we use the closest() method which works on all the DOM elements. Look into Element.closest() MDN Docs to know 
    // more about closest() method. We will use the closest() method to get the closest ancestor element that 
    // we want to get from the triggered event.
    const btn = event.target.closest(`.${elementStrings.pageButton}`);
    //console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);    // convert to base10 int
        // clearing the buttons code is included inside the clearResults() method
        searchView.clearResults();  
        searchView.renderResults(state.search.recipes, goToPage);   // default is page 1
        console.log(goToPage);
    }
});



// RECIPE CONTROLLER
// Testing Code:
const r = new Recipe(47746);
r.getRecipe();
console.log(r);