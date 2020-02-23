// we will have all the DOM elements in here, and if the user needs any DOM elements, they've to get it by importing
// the this module

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages')
};


// inside the elementStrings object, we will have all the dynamically created DOM elements that are created and 
// then removed after a while. One such example is the spinning loader.
export const elementStrings = {
    loader: "loader",
    pageButton: "btn-inline"
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