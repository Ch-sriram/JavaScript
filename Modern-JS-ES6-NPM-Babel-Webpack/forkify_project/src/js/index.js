/********************************************************************************************************************
 * Here, we will learn how to implement pagination where, instead of displaying all the results in a single page,
 * we simply display 10-20 results per page, depending on the need, and then put the rest of the results
 * on the subsequent pages.
 * 
 * To implement pagination, in ./src/js/views/searchView.js module, we modify the implementation of 
 * the renderResults() method. Along with the recipes that we pass into the renderResults() method, we will
 * pass in the page number - 'page' and the number of recipes we want to show per page, let's say we want 10 recipes - 'resPerPage'
 * per page. 
 * 
 * Then, we have to render the Next Page and Previous Page buttons onto the .results__pages class in 
 * index.html. After that, we have to attach the event handler to these buttons to handle the clicks to 
 * the buttons, so that they actually change the page that we want, and get the previous/next 10 recipes in 
 * .results__list class' list.
 * 
 * We can see the changes made to renderResults() method inside ./src/js/views/searchView.js module.
 * 
 * 
 * Inside the controller i.e., this file, we will handle the button clicks for the next and prev pages by event 
 * delegation. We can see the code below where we attach the event handler to .results__page class which is 
 * imported using elements.searchResPages
 * 
 * What we'll learn:
 * ----------------
 * 1. How to use the closest() method for easier event handling.
 * 2. How and why to use data-* attributes in HTML5.
 * 
 * 
 */

import Search from './models/Search';
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