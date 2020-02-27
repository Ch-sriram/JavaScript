// This module will have a bunch of functions regarding the search view, and we will export all of them using named exports

// We can simply get the DOM elements' data directly here, using the document.querySelector('.search').value;
// But that would make our code extremely unmaintainable. SO, we will get the DOM data from another module called
// base.js inside the ./src/js/views/ directory. Look into the ./src/js/views/base.js file to know more details.
import { elements, elementStrings } from './base';


// function to read the input from the input form with the class .search__field
export const getInput = () => elements.searchInput.value;   // returns the search query


// function to clear the input of the search query after we searched for the query.
export const clearInput = () => {
    elements.searchInput.value = '';
};


// function to clear the .results__list so that when we search the next time, we will be able to load the list items
// into the .results__list freshly.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';  // to clear the list of recipes in .results__list
    elements.searchResPages.innerHTML = ''; // to clear the next/prev buttons
};


export const highlightSelected = id => {
    // Before highlighting the selected recipe from the .results__list class, we have to remove the 
    // .results__link--active class from all the recipes in the .results__list class' elements.
    const recipeArr = Array.from(document.querySelectorAll(`.results__link`));
    recipeArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    // highlight the selected recipe from .results__list class
    const element = document.querySelector(`.results__link[href*="#${id}"]`);
    if (element) {
        element.classList.add('results__link--active');
    }
};


// function to limit the recipe name in the .results__list class
export const limitRecipeTitle = (title, limit = 17) => {   // 17 is the sweet spot for limiting the no. of letters
    let newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit)
                newTitle.push(curr);
            return acc + curr.length;
        }, 0);
        const __title__ = newTitle;
        return `${__title__.join(' ')} ...`;
    }
    return title;
}; 


// function to render a single recipe onto the app's front-end
const renderRecipe = recipe => {
    // we get the HTML for each of the recipe result from ./src/index.html, where the it is a list tag available 
    // under the .results__list class.
    // We want the markup to display the title of the dish and below that, the publisher's name. Along with that
    // we also want the image URL related to the image of the recipe that we are rendering. 
    // We also want the recipe ID of the recipe we are rendering, so that we can later on get the data related to
    // that recipe, when the user click that recipe, to the UI.
    // We render the title using the limitRecipeTitle() function defined above, only for viewing the title, not for
    // the alt attribute.
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Now we want this markup to be rendered under the .results__list, so we get the element for that using the
    // elements object that we imported from the base module
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


// function to create a button while applying the pagination. Here, page => page number we want to display, type => 
// is it the 'next' page or the 'prev'ious page
// We get the markup from .results__page class available in index.html
// 
const createButton = (page, type) => `
    <!-- 
        Here, we can specify the type of the button by simply changing the .results__btn--prev as shown below.
        We also have to plugin the data into the button containing the number of the page we want to move to, 
        whenever we click the button. Therefore, to encode the page number that's dynamically obtained inside 
        the button element, in HTML5, we have data-* attribute, which can be used to encode data into an HTML
        element. Therefore, we encode data into an HTML element using data-* attribute as shown below using 
        data-goto attribute of the <button> element. data-* => * can be any name. To access that data embedded
        inside the HTML element, we have to get that HTML element through the DOM and access the data inside it
        using: <element>.dataset.goto;  where, goto here's the name given instead of *.
     -->
    <button class="${elementStrings.pageButton} results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
        <!-- 
            If it is the previous page, then we display the icon-triangle-left, otherwise we display 
            icon-triangle-right. For that, we can use the type information. If type is 'next', then we display 
            icon-triangle-right, otherwise we display icon-triangle-left.
        -->
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


// function to render the pagination buttons. We copy the markup under the .results__page class to render the button.
// this function is called inside renderResults() method defined below. This function renders the buttons
// on the number of pages that we can have in .results__list class' element.
const renderButtons = (page, numResults, resPerPage) => {
    // numResults is the number of recipes we received from the forkify-api
    const numPages = Math.ceil(numResults / resPerPage);

    let btn;
    // The code in this if-else ladder is all going to be pretty similar, therefore, we delegate the functionality 
    // to create the buttons to another function - createButton() method defined above.
    if (numPages > 1) {
        if (page === 1) {
            // Only button to go to the next page
            btn = createButton(page, 'next');
        } else if (page === numPages) {
            // Only button to go to the previous page
            btn = createButton(page, 'prev');
        } else {
            // Buttons to go the previous and next pages.
            btn = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
        }
    }

    // Insert the btn element into .results__pages class' element. We insert using the elements object that we 
    // have imported from ./src/js/views/base.js module.
    elements.searchResPages.insertAdjacentHTML('afterbegin', btn);
};

// function to render results onto the .results__list of of index.html
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    // console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};
