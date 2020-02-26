import { elements } from './base';


export const renderItem = item => {
    // Get the markup below .shopping__list class in ./index.html
/** Array Version */
    // const markup = `
    //     <li class="shopping__item" data-itemid=${item.id}>
    //         <div class="shopping__count">
    //             <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
    //             <p>${item.unit}</p>
    //         </div>
    //         <p class="shopping__description">${item.ingredient}</p>
    //         <button class="shopping__delete btn-tiny">
    //             <svg>
    //                 <use href="img/icons.svg#icon-circle-with-cross"></use>
    //             </svg>
    //         </button>
    //     </li>
    // `;

/** Map Version */
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.value.count}" step="${item.value.count}" class="shopping__count-value">
                <p>${item.value.unit}</p>
            </div>
            <p class="shopping__description">${item.value.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shopping.insertAdjacentHTML('beforeend', markup);
};


export const deleteItem = id => {
/** Array Version */
    // const item = document.querySelector(`[data-itemid="${id}"]`);
    // item.parentElement.removeChild(item);

/** Map Version */
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};

