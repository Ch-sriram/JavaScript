/********************************************************************************************************************
 * What we'll learn:
 * ----------------
 * 1. How to make Real World API Calls.
 * 2. What API Keys are why we need them?
 * 
 * The API that we were supposed to use was known as "food2fork", but now, that API has shut down its services, and
 * therefore, we will use the 'forkify' API, which is hosted @https://forkify-api.herokuapp.com/
 * 
 * Now, if we were using the food2fork's API, then in there, there was a Recipe API which allowed us to do two things
 * 1. Search for a Recipe.
 * 2. Get Data about a specific Recipe.
 * 
 * For the searching part, we had to make a search request using the API URL: https://food2fork.com/api/search,
 * but now, we will use the following API URL: https://forkify-api.heroku-app.com/api/search
 * 
 * To get the data, we used the other API endpoint which was: https://food2fork.com/api/get, but now, we will use
 * another API endpoint which is the following: https://forkify-api.heroku-app.com/api/get
 * 
 * Using the food2fork API was free for the 500 request, but after that, the API didn't respond. But using forkify
 * API, we can have a 100 requests per hour.
 * 
 * Now, to make any API call, we had to create our own account in food2fork's website, because to make an AJAX
 * request to the API endpoint, we needed to have an API Key. An API Key is like a password that's given to each
 * user which is a unique ID that each user can use in order to make requests, due to which, the API can track the 
 * number of requests the user makes per day. The API Key is basically a long string of alphanumerics which was to
 * be included in the request link along with the search query or the get data query. But now, using forkify-api, 
 * we need not use any API Keys to search or get the data.
 * 
 * Now, we will make an API call to fetch the data from the forkify API.
 * 
 * NOTE ABOUT fetch():
 * ------------------
 * Previously, we used the fetch() API to make AJAX Requests and it is fine to work with in the latest browsers.
 * But the fetch() API doesn't really work with all the browsers yet. A very old browser, might not recognize
 * the fetch() API call. Instead, what we are going to do is to use an extremely popular HTTPRequest Library called
 * AXIOS. To use axios(), we need to install it and get it from NPM, using 'npm install axios --save' (note that
 * we save axios as a code dependency, and not as a dev dependency, because we use its implementation in our code).
 * And then we import the axios package as: import axios from 'axios'; wherever we want to use axios. Conventionally,
 * the package is always imported as "axios". Now, we don't need to provide the path because webpack will just
 * recognize the path when bundling the modules together when it sees the 'axios'. Now, axios() call works exactly
 * the same way as fetch() does, but axios() doesn't return a string in JSON format, it automatically returns a 
 * JSON object, whereas using fetch(), we had to convert the JSON formatted string that we got into a JSON object.
 * Therefore, that extra step of converting the string returned from the fetch() to a JSON object, is removed here.
 * One more thing about axios() is that, it better at error handling compared to the fetch() API.
 * 
 * We will see how we use axios() below
 */

import axios from 'axios';

async function getResult(query) {
    // Previously, we had to have a key and only then, we could query the food2fork API. An AJAX Request would be
    // as follows: (we'd need the CORS proxy to use the API, such as: https://cors-anywhere.herokuapp.com/)
    // const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const key = '1984bi1219823ibd83412';
// The foll. line of code will work, if we call the getResult() function with a search query say getResult('pizza');
    // const result = await axios(`${proxy}https://food2fork.com/api/search?key=${key}&q=${query}`);
    // console.log(result); 

    try {
        // Now, we don't need any key for the search, we simply use the forkify() API as follows:
        const key = '20200221195421';
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        //console.log(result);    // from the result we get, we only want the data field inside which the recipe 
                                  // array contains the recipes
        const recipes = result.data.recipes;
        console.log(recipes);
        // In every element of the recipes array, we have an object in which there are details about
        // the publisher, title, source_url, recipe_id, image_url, social_rank, publisher_url, etc, out of which
        // we'll require the "recipe_id" field to get the data about that recipe when we want to use the 
        // get data service using the https://forkify-api.heroku-app.com/api/get. We have to append the
        // recipe_id as follows: https://forkify-api.heroku-app.com/api/get?rId=47746, to get the data for the pizza
        // recipe.
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

getResult('pizza');
getResult('pasta');
getResult('curry');
getResult('paneer');  // error generated for this request because it is not a search phrase supported in forkify-api