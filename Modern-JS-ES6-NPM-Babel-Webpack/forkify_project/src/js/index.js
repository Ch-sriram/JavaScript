/********************************************************************************************************************
 * What we'll learn:
 * ----------------
 * 1. How and why to create unique IDs using an external package called 'uniqid'.
 * 2. Difference between Array.slice() and Array.splice() methods.
 * 3. More use cases for Array.findIndex() and Array.find() methods.
 * 
 * We make a new model which is the List Model which handles the data for the Shopping List. Check out the List 
 * Module at ./src/js/models/List.js. One thing to note is that we generate unique ID's for each item inside the List
 * Module using a 3rd party API known as 'uniqid' which we install using npm by the command: 'npm i uniqid --save' in
 * the project directory. And then we can import it inside the List Model Module. Note that we can import the package
 * because it is not a dev dependency but it is a code dependency. Therefore, we can go ahead and import the code
 * related to 'uniqid' package.
 * 
 */
// Import Data Models
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';

// Import Front-End Views
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

// Import Common Code Base
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
        
        try {
            // We send in the .results class' element from the elements imported from base module
            renderLoader(elements.searchRes);  
    
            // 4. Search for results
            await state.search.getResult();
    
            // 5. Render results on the UI  //console.log(state.search.recipes);
            clearLoader();
            searchView.renderResults(state.search.recipes);
        } catch (error) {
            alert("Something went wrong with the search... \n Dev Note: Check the console for the error");
            console.log(error);
            clearLoader();
        }
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

// Test Code:
// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
    // Get the hash-link
    const id = window.location.hash.replace('#', '');   //console.log(id);

    // Check if we have an id, only then, we would go ahead and execute the following code
    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        // Highlight the selected recipe
        if (state.search)
            searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);
        // window.r = state.recipe;    // TEST CODE

        try {
            // Get the recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings of the recipe and time required to make the recipe.
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            // Render Recipe -- console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            clearLoader();
            alert("Something went wrong with processing the recipe... \nDev Note: Check the developer console for the error");
            console.log(error);
        }
    }
};

// // we have to render the recipes when there's hashchange event
// window.addEventListener('hashchange', controlRecipe);

// // we also have to render the recipes when the page reloads, to save the state of the recipe
// window.addEventListener('load', controlRecipe);

// Instead of adding the same event handler - controlRecipe() for two events on window, we can simply 
// do it in a single line using the forEach() method as shown below.
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    // This time we cannot use the closest() method because this time we have two buttons that can be clicked.
    // Therefore, the best way to handle the even this time is to use the matches() method as shown below.
    // if the target matches .btn-decrease class or any class under .btn-decrease, then, we want to 
    // decrease the number of servings. Ex: event.target.matches(`.btn-decrease, .btn-decrease *`)
    // where, '.btn-decrease *' means all the children elements of the .btn-decrease class.

    // Decrease Servings Button is clicked
    if (event.target.matches(`.${elementStrings.servingsDecreaseButton}, .${elementStrings.servingsDecreaseButton} *`)
        && state.recipe.servings > 1)
        state.recipe.updateServings('dec');
    
    // Increase Servings Button is clicked
    else if (event.target.matches(`.${elementStrings.servingsIncreaseButton}, .${elementStrings.servingsIncreaseButton} *`))
        state.recipe.updateServings('inc');

    recipeView.updateServingsAndIngredients(state.recipe);
    //console.log(state.recipe);  // TESTING
});


// SHOPPING LIST CONTROLLER

// TEST CODE
window.l = new List();