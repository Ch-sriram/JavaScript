import axios from 'axios';  // We need axios to make an AJAX Request

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {    // we don't need to use the function keyword to define a function inside the class
        try {
            // Instead of query, we use this.query in the AJAX request.
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            
            //We want to get the recipe from the AJAX Request, but we want it to be stored inside this Search instance
            this.recipes = result.data.recipes;
            //console.log(this.recipes);
        } catch (error) {
            console.log(error);
            alert(error);
            alert("Please check the search queries that can be searched for, from: https://forkify-api.herokuapp.com/phrases.html");
        }
    }
}
