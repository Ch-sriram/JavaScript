export default class Likes {
    constructor() {
    /** Array Version */
        // this.likes = [];

    /** Map Version */
        this.likes = new Map();
    }


    addLikedItem(id, title, author, img) {
    /** Array Version */
        // const likedItem = { id, title, author, img };
        // this.likes.push(likedItem);
        // return likedItem;

    /** Map Version */
        this.likes.set(id, { title, author, img });
        return { id, value: this.likes.get(id) };
    }


    deleteLikedItem(id) {
    /** Array Version */
        // const index = this.likes.findIndex(el => el.id === id);
        // this.likes.splice(index, 1);

    /** Map Version */
        if (this.likes.has(id))
            this.likes.delete(id);
    }

    // When we load a particular recipe, we have to know whether that recipe has been liked previously
    // or not, so we can style the recipe accordingly on to the front-end view.
    isLikedItem(id) {
    /** Array Version */
        // return this.likes.findIndex(el => el.id === id) !== -1;

    /** Map Version */
        return this.likes.has(id);
    }

    getNumberOfLikedItems() {
    /**Array Version */
        // return this.likes.length;

    /** Map Version */
        return this.likes.size;
    }
}