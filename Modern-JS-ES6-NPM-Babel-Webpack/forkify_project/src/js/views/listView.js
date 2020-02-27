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
                <input type="number" value="${item.value.count}" step="${item.value.count}" min="0" class="shopping__count-value">
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
    if (item) item.parentElement.removeChild(item);
};

export const renderDeleteBtn = () => {
    const element = document.querySelector('#delete-all-btn');
    console.log(element.hasChildNodes());
    console.log(element);
    if (!element.hasChildNodes()) {
        const markup = `<button class="btn" id="delete-all-btn_">Delete All Items</button>`;
        element.insertAdjacentHTML('afterbegin', markup);
    }
};


export const removeDeleteBtn = () => {
    document.querySelector('#delete-all-btn').innerHTML = '';
};


export const deleteAllItems = () => {
    document.querySelector('.shopping__list').innerHTML = '';
};