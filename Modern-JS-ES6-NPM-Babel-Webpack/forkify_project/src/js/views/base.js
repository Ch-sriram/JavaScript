// DOM Elements that are static
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};


// inside the elementStrings object, we will have all the dynamically created DOM elements that are created and 
// then removed after a while. One such example is the Loading Spinner. For that purpose, we just use their 
// class names when needed from the elementStrings object. If in case we try to get the DOM element here, it will
// be a 'null' because at the time of querying for the element, it is/was not available in the webapp.
export const elementStrings = {
    loader: "loader",
    pageButton: "btn-inline",
    servingsIncreaseButton: "btn-increase",
    servingsDecreaseButton: "btn-decrease",
    ingredientQuantity: "recipe__count",
    servings: "recipe__info-data--people",
    addToShoppingList: "recipe__btn--add",
    shoppingItem: "shopping__item",
    shoppingDelete: "shopping__delete",
    shoppingCount: "shopping__count-value",
    loveButton: "recipe__love"
};

// function to render the loading spinner from the ./dist/css/style.css.
// We want to render the loading spinner inside two elements, therefore, we take the parent element as the parameter
// to the renderLoader() function
export const renderLoader = parent => {
    // look into .loader class located inside the ./dist/css/style.css file to know how the the spinning loader functions.
    const loader = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>  
    `;
    
    // we attach the loader to the parent that we passed into the renderLoader() method
    parent.insertAdjacentHTML('afterbegin', loader);
};


// function to remove the spinning loader once the AJAX Request has been fulfilled
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader)
        loader.parentNode.removeChild(loader);
};  