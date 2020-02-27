import uniqid from 'uniqid';

export default class List {
    constructor() {
    /** Array Version */
        // this.items = [];
        // Instead of using an array, we can simply use a Map

    /** Map Version */
        this.items = new Map();
    }

    addItem(count, unit, ingredient) {
    /** Array Version */
        // const item = {
        //     id: uniqid(),
        //     count, unit, ingredient
        // };
        // this.items.push(item);
        // return item;

    /** Map Version */
        const id = uniqid();    
        this.items.set(id, { count, unit, ingredient });
        return { id, value: this.items.get(id) };
    }

    deleteItem(id) {
        // we use the splice() method to delete the item from the this.items[]. 
        // Syntax of splice(): Array.splice(starting_index, no_of_elements_to_delete) where the deletion in the 
        // referenced Array begins from starting_index and the number of elements deleted from there onwards are 
        // mentioned in no_of_elements_to_delete. 
        // Ex: const list = [100, 200, 300, 400, 500, 600];
        //     const list2 = list.splice(2, 3); // list2 is now [300, 400, 500] and list is [100, 200, 600]
        // We can see that splice() cuts the referenced array and then mutates it, the mutated part is returned by
        // the method as an array.

        // Array.slice() works differently where the syntax is: Array.slice(start_index, last_index) where we return
        // the array elements from start_index to last_index-1 and we don't mutate the referenced Array.
        // Ex: const list = [100, 200, 300, 400, 500, 600];
        //     const list2 = list.slice(2, 3);  // list2 is now [300] & list is still [100, 200, 300, 400, 500, 600]

    /** Array Version */
        // const index = this.items.findIndex(el => el.id === id);
        // this.items.splice(index, 1);

    /** Map Version */
        if (this.items.has(id))
            this.items.delete(id);
    }

    // Update the quantity of the ingredient in the Shopping List
    updateCount(id, newCount) {
    /** Array Version */
        // this.items.find(el => el.id === id).count = newCount;

    /** Map Version */
        this.items.get(id).count = newCount;
    }

    deleteAllItems() {
        this.items.clear();
    }

}