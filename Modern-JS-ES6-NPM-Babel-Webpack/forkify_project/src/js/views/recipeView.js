import { elements, elementStrings } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

// look into documentation of fraction.js @https://github.com/ekg/fraction.js/
const formatCount = count => {
    if (count) {
        // count = 2.5 --> 2 1/2
        // count = 0.5 --> 1/2
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

        // count = 2 --> 2  // there's no dec
        if (!dec) return count;

        // count = 0.5 --> 1/2
        if (int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            // count = 2.5 --> 2 1/2
            // if we create a fraction for 2.5, we will get 5/2, which we don't want. Therefore,
            // we will create a fraction only for 0.5 and append it to 2. For that, we would
            // take the difference between the count and the int and pass it to the Fraction's constructor.
            const fr = new Fraction(count - int);
            const numerator = parseInt(fr.numerator.toString().slice(0, 1));
            const denominator = fr.denominator.toString();
            const sliceTill = (denominator.length > 1) ? 2 : 1;
            return `${int} ${numerator}/${parseInt(denominator.slice(0, sliceTill))}`;
        }
    }
    return 1;
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    // we get the markup under .recipe class in index.html
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>

            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '': '-outlined'}"></use>
                </svg>
            </button>

        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                <!-- 
                    We don't know the number of ingredients that'll be in a recipe, therefore, we have to loop 
                    through the number of ingredients and then create the list element for each ingredient of recipe
                 -->
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};


export const updateServingsAndIngredients = recipe => {
    // Update the number of servings on UI
    document.querySelector(`.${elementStrings.servings}`).textContent = recipe.servings;

    // Update the ingredient quantities (i.e., count) on UI
    const ingredientQuantities = Array.from(document.querySelectorAll(`.${elementStrings.ingredientQuantity}`));
    ingredientQuantities.forEach((el, idx) => {
        el.textContent = formatCount(recipe.ingredients[idx].count);
    });
};