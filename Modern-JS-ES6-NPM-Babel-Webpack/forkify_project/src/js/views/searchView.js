// This module will have a bunch of functions regarding the search view, and we will export all of them using named exports

// We can simply get the DOM elements' data directly here, using the document.querySelector('.search').value;
// But that would make our code extremely unmaintainable. SO, we will get the DOM data from another module called
// base.js inside the ./src/js/views/ directory. Look into the ./src/js/views/base.js file to know more details.
import { elements } from './base';

// function to read the input from the input form with the class .search__field
export const getInput = () => elements.searchInput.value;   // returns the search query

// function to clear the input of the search query after we searched for the query.
export const clearInput = () => {
    elements.searchInput.value = '';
};

// function to clear the .results__list so that when we search the next time, we will be able to load the list items
// into the .results__list freshly.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// function to render a single recipe onto the app's front-end
const renderRecipe = recipe => {
    // we get the HTML for each of the recipe result from ./src/index.html, where the it is a list tag available 
    // under the .results__list class.
    // We want the markup to display the title of the dish and below that, the publisher's name. Along with that
    // we also want the image URL related to the image of the recipe that we are rendering. 
    // We also want the recipe ID of the recipe we are rendering, so that we can later on get the data related to
    // that recipe, when the user click that recipe, to the UI.
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Now we want this markup to be rendered under the .results__list, so we get the element for that using the
    // elements object that we imported from the base module
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// function to render results onto the left side of the page from the recipes array
export const renderResults = recipes => {
    // for each of the recipe inside the recipes[], we render each recipe object using renderRecipe object.
    console.log(recipes);
    recipes.forEach(renderRecipe);  
};