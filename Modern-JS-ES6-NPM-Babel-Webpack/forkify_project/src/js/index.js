/********************************************************************************************************************
 * What we'll learn:
 * ----------------
 * 1. Concept of application state.
 * 2. A simple way of implementing state.
 * 
 * Now, we will will control everything from ./src/js/index.js, which is our app controller, so naturally, it will
 * also be our search controller. Each model and each view will get its own model and view for its functionalities.
 * 
 * What is State?
 * Imagine that we have our final app built with all the search queries, recipes, likes, shopping list, etc.
 * So when an app is running, we have to ask a crucial question and that's "what's the state of our app?" in any
 * given moment. We think about state like we think about what's current;y happening in our app, i.e., What's our
 * current search query? What's the current recipe? How many servings are currently being calculated? &, What's 
 * currently in the shopping list? So all of these things in one given moment are the state. Therefore, all of this 
 * data in the current state of the app is called state, and we want that data to be in one central place, in one
 * central variable/object in which we have all the data that defines our app's state in any moment.
 * 
 * There are entire libraries that just resolve the issue of state, as it is extremely hard ot manage state.
 * Some of the popular libraries that manage state are Redux, MobX, NgRX, VueX, etc. We can always manage state
 * ourselves if we make a simple application, but when we make large applications, it is better to let a good
 * library manage your state for you.
 * 
 */

import Search from './models/Search';

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
    const query = 'pizza';  // for now, this is just a placeholder string.

    if (query) {
        // 2. If there's a query, then add it to the state as a search object.
        state.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for results
        await state.search.getResult();

        // 5. Render results on the UI -- we can render the results only after we await for the result.
        //                                Therefore, we make this function an async function and await for the
        //                                result from getResults() above, which is actually an async function.
        //                                Therefore, getResults() returns a Promise and it is saved inside 
        //                                this.results field inside the object that called the getResults() 
        //                                method. Therefore, our recipe data is stored at state.search.recipes
        console.log(state.search.recipes);
    }
}

// Now we will get the data from ./src/index.html file, where we get the search query using the DOM event listener:
document.querySelector('.search').addEventListener('submit', event => {
    // When we click the form's submit button, the page reloads. we don't want that, therefore we prevent the default action
    event.preventDefault();
    controlSearch();
});


// Therefore, we now have to prepare the view for the search functionality in the ./src/js/views/searchView.js