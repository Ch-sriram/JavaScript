import axios from 'axios';

export default class Recipe {
    constructor(id) {
        // each recipe is identified by an ID, and when we want to get the data related to a recipe, we will pass in 
        // that recipe's ID to the data related to that respective recipe.
        this.id = id;
    }

    async getRecipe() {
        try {
            // for getting the recipe details, example is: https://forkify-api.herokuapp.com/api/get?rId=47746
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //console.log(result);
            /**
             * We get the following object:
              {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
                data:
                    recipe:
                        publisher: "101 Cookbooks"
                        ingredients: (6) ["4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled", "1 3/4 (.44 ounce) teaspoons salt", "1 teaspoon (.11 ounce) instant yeast", "1/4 cup (2 ounces) olive oil (optional)", "1 3/4 cups (14 ounces) water, ice cold (40F)", "Semolina flour OR cornmeal for dusting"]
                        source_url: "http://www.101cookbooks.com/archives/001199.html"
                        recipe_id: "47746"
                        image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
                        social_rank: 100
                        publisher_url: "http://www.101cookbooks.com"
                        title: "Best Pizza Dough Ever"
                        __proto__: Object
                    __proto__: Object
                status: 200
                statusText: "OK"
                headers: {content-length: "615", content-type: "application/json; charset=utf-8"}
                config: {url: "https://forkify-api.herokuapp.com/api/get?rId=47746", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
                request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
                __proto__: Object
             */
            // we just need the information inside the data.recipe field to display the recipe's content
            // under the element that has .recipe class
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert(error);
            alert("Please check the search queries that can be searched for, from: https://forkify-api.herokuapp.com/phrases.html");
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);  // Assuming that we need 15 min each for 3 ingredients
        this.time = periods * 15;   // in minutes
    }

    calcServings() {
        // We can implement this function using some complicated algorithm, but we can keep it simple
        // by just saying that every dish will serve 4 people no matter what.
        this.servings = 4;
    }
};