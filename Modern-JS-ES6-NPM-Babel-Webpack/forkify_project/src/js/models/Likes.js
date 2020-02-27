export default class Likes {
    constructor() {
    /** Array Version */
        // this.likesArr = [];

    /** Map Version */
        this.likes = new Map();
    }


    addLikedItem(id, title, author, img) {
    /** Array Version */
        // const likedItem = { id, title, author, img };
        // this.likesArr.push(likedItem);

        // Persist data in window.Storage using localStorage()
        // this.persistData();

        // return likedItem;

    /** Map Version */
        this.likes.set(id, { title, author, img });

        // Persist data in window.Storage using localStorage()
        this.persistData();

        return { id, value: this.likes.get(id) };
    }


    deleteLikedItem(id) {
    /** Array Version */
        // const index = this.likesArr.findIndex(el => el.id === id);
        // this.likes.splice(index, 1);

        // // Persist data in window.Storage using localStorage()
        // this.persistData();

    /** Map Version */
        if (this.likes.has(id))
            this.likes.delete(id);
        
        // Persist data in window.Storage using localStorage()
        this.persistData();
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

    persistData() {
        // we know that both key-value pairs should be a string, therefore, we can convert the likes
        // object into a string using JSON.stringify() method and pass this.likes onto the method.
        // convert the Map elements into JSON format:
        const likesArr = [];
        for (let [key, value] of this.likes.entries()) {
            // console.log(key, value);
            likesArr.push({
                id: key,
                title: value.title,
                author: value.author, 
                img: value.img
            });
        }


        // this.likesArr = likesArr;
        // localStorage.clear();
        localStorage.setItem('likes', JSON.stringify(likesArr));
    }

    readStorage() {
        // To retrieve the data stored in the localStorage for likes data persistency.
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restoring the likes from the localStorage, convert the likesArr back to a Map() object
        if (storage) {    
        /** Array Version */
            // this.likesArr = storage;

        /** Map Version */
            storage.forEach(el => {
                if (!this.likes.has(el.id)) {
                    this.likes.set(el.id, {
                        title: el.title,
                        author: el.author,
                        img: el.img 
                    });
                }
            });
        }
    }

}