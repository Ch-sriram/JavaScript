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

    parseIngredients() {
        // We create 2 Maps where one map stores the units that can occur in plural form,
        // for eg: teaspoons, tablespoons, etc and then store their values into short-form
        // units, which are tsp, tbsp, etc, respectively. And another map for units that
        // can occur in singular form i.e., teaspoon, tablespoon, etc. We will convert all of 
        // the singular units also into an their respective short-forms as show n above.
        const abbrUnits = ['tbsp', 'tsp', 'cup', 'oz', 'pound', 'kg', 'g'];

        const pluralUnits = new Map();
        pluralUnits.set('tablespoons', abbrUnits[0]);
        pluralUnits.set('teaspoons', abbrUnits[1]);
        pluralUnits.set('cups', 'cup');
        pluralUnits.set('ounces', abbrUnits[3]);
        pluralUnits.set('pounds', abbrUnits[4]);

        const singularUnits = new Map();
        singularUnits.set('tablespoon', abbrUnits[0]);
        singularUnits.set('teaspoon', abbrUnits[1]);
        singularUnits.set('ounce', abbrUnits[3]);

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            for (let [key, value] of pluralUnits.entries()) {
                if (ingredient.includes(key))
                    ingredient = ingredient.replace(key, value);
            }

            for (let [key, value] of singularUnits.entries()) {
                if (ingredient.includes(key))
                    ingredient = ingredient.replace(key, value);
            }

            // 2. Remove Parentheses --- Regex taken from: 
            // https://stackoverflow.com/questions/4292468/javascript-regex-remove-text-between-parentheses
            ingredient = ingredient.replace(/\([^)]*\)/g, '');

            // 3. Parse ingredients into count, unit and ingredient
            // The hardest part of parsing the ingredients is to separate out the count and units.
            // That's because in the list of ingredients, some have the count in-front
            // and some don't. Therefore, we have to be clever about the way we decouple the quantity
            // and the unit of the ingredient. A good way is to use the index of the unit
            // and then decouple the quantity from the unit.
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => abbrUnits.includes(el));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit -- the difficult one to implement.

                // first we pick the quantity(s) before the units
                // Ex. if arrIng is ['4, '1/2', 'cup', ...] => arrCount is ['4', 1/2']
                // Ex. if arrIng is ['4', 'cup', ...] => arrCount is ['4']
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1)
                    count = eval(arrIng[0].replace('-', '+'));  // For the strings which are like: '1-1/2 cup'
                else {
                    // Now, we have the elements of arrCount as strings, but we are also sure that they are
                    // strings that are numeric in nature. Therefore, whenever we have such a situation, we can 
                    // simply call the eval() method on the string (which is an arithmetic expression), so that it
                    // can evaluate the arithmetic expression passed to it.

                    // console.log(arrCount);
                    count = eval(arrCount.slice(0, 2).join('+'));

                    // if arrCount is ['4', '1/2'], then the line above will convert into '4+1/2' and then that's
                    // passed onto the eval() method which will then evaluate the expression as JS Code, and actually
                    // the string as an arithmetic expression and return 4.5
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                    
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient  // In ES6, to mention 'ingredient: ingredient', we need not assign it, we simply 
                                // mention it. Therefore, 'ingredient: ingredient' can be written as 'ingredient'
                };
            } 

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Update the servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Update the ingredients' quantities (i.e., ingredient.count)
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
};

// In the .recipe class, we have the ingredients given as 4.5 cup, 1.75 tsp salt, etc. We don't want to show it like 
// that, we want to show it as 4 1/2 cup, 1 3/4 tsp salt, etc. Therefore, we see that next.