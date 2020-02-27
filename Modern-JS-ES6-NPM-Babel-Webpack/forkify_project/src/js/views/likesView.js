import { elements, elementStrings } from './base';
import { limitRecipeTitle } from './searchView';


export const toggleLikeBtn = isLiked => {
    /**
     * <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
     */

    // we have to change 'icon-heart-outlined' to 'icon-heart'
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    // change the href of the .recipe__love button, for which we select the use element inside the
    // .recipe__love class as follows: document.querySelector('.recipe__love use') and then change the 
    // href attribute to the one we want.
    // document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)

    document.querySelector(`.${elementStrings.loveButton} use`).setAttribute('href', `img/icons.svg#${iconString}`);
};

// called inside the controlLike() method at ./src/js/index.js, which is the controller for the likes.
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};


export const renderLike = like => {
    // Taken from ./src/index.html under the .likes__list class
    // console.log(like);  // TESTING
    
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.value.img}" alt="${like.value.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.value.title)}</h4>
                    <p class="likes__author">${like.value.author}</p>
                </div>
            </a>
        </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
};


export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};