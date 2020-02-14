/********************************************************************************************************************
 * Making AJAX Calls using Fetch and Promises
 * ------------------------------------------
 * 
 * Here, we will learn how to use all the concepts we learned about Asynchronous JavaScript to make an AJAX Request
 * and get some Weather Data from a Real Weather API (https://www.metaweather.com/api/). In order to the AJAX Request
 * we are going to use a modern Web API called fetch() [By "Web API", we mean that these parts are available to the
 * browser and are not really part of the JavaScript language itself. See more at event_loop.pdf @https://github.com/Ch-sriram/JavaScript/blob/master/Asynchronous-JS/assets/event_loop.pdf].
 * 
 * With fetch() we can do AJAX Requests in a very simple way. We can do Asynchronous Network Requests across the
 * internet to fetch data from other servers or even from our own server. We used to previously make AJAX Calls 
 * using the rather complex XML HTTP Request Interface, and quite frankly, it has better browser support compared to 
 * fetch() because it has been around for more time compared to fetch().
 * 
 * Now, we'll see how to use the fetch() function.
 */

// To make an AJAX Call (here, we are specifically requesting data), all we have to do is use the fetch() function.
// The syntax of fetch function: fetch(<URL>), where URL is where the API is located i.e., the URL to which we are 
// sending the request. We are using a Weather API called metaweather. Read the documentation of the metaweather API
// @https://www.metaweather.com/api/. Normally, APIs request a key in order to use it, but metaweather API is simple
// API and it doesn't require an API key, so it will make our life easier understanding the concept of AJAX Calls.

// All of the following is taken from the documentation of https://metaweather.com/api/
// The syntax of the URL of metaweather API (aka API Endpoint) we are using is: "/api/location/(woeid)/" where 
// 'woeid' means, "Where in The World ID". Each 'woeid' corresponds to place on Earth.

// Example URL of San Francisco: https://www.metaweather.com/api/location/2487956/, where we can see that the woeid
// of San Francisco is 2487956. So the entire API URL is https://metaweather.com/<API Endpoint>/
// When we open https://www.metaweather.com/api/location/2487956/ in a browser, we can see some data in JSON 
// (JavaScript Object Notation) format, which looks like a JavaScript Object, but it is not really an Object. JSON 
// is a text-based data format which is similar looking to the JavaScript Object, but the difference is that JSON is 
// really just a single string and not an entire object inside the JavaScript Engine. Therefore, data in the JSON 
// format is like string that we receive from the server, and then we can convert that string into a JavaScript 
// Object, and we'll see how to convert the string we received in JSON format into a JavaScript Object.

// Specifically, the JSON formatted string from https://www.metaweather.com/api/location/2487956/ contains a field
// called "consolidated_weather" which is an array that contains data for the forecast of the next 5 days of the 
// weather in San Francisco. Under the "consolidated_weather" field we have other fields which are "title", "woeid", 
// "timezone", "latt_long", "time", "sun_rise", "sun_set", etc.

// Now, this is how we make an AJAX request for San Francisco's Weather Data using the fetch() function.
//fetch('https://www.metaweather.com/api/location/2487956/');
// Output:
//          Error 1:
//          Access to fetch at 'https://www.metaweather.com/api/location/2487956/' from origin 'null' has been 
//          blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If 
//          an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with 
//          CORS disabled.
//          
//          Error 2:
//          Failed to load resource: net::ERR_FAILED
//          
//          Error 3:
//          Uncaught (in promise) TypeError: Failed to fetch

// The reason why we get the 1st Error is because of a JavaScript Policy which is known as "Same Origin Policy",
// which prevents us from making AJAX requests to a domain different than our own domain. Right now, we don't have 
// any domain of our own and we are just opening the fetch_promise.html using the FTP, and the domain that we are 
// requesting the data from is from metaweather API. And so because of this same origin policy, we can then not 
// access the data/resources from the metaweather API.

// Now in order to actually allow developers to make requests to different domains, something called CORS (Cross
// Origin Resource Sharing) was developed. In simple terms, the developers of the API that we are requesting from,
// they need to implement CORS on their server. That's actually the case for many APIs.
// Coming to our case, metaweather hasn't developed their own CORS, therefore, this is a problem that needs to be
// fixed. When these kind of problems arise, what developers usually do is to proxy or to channel the request through
// their own server, like doing the AJAX Request on our own server where the same origin policy doesn't exist, and
// then send the data to the browser. So that's the work-around to the same origin policy problem. 

// Now we cannot channel the request through our own server because we do not have our own server. Therefore, we 
// are not going to do that. So to keep it simple, we can use a service that exactly does what we discussed till now.
// So we are going to use a proxy called Cross Origin @https://www.crossorigin.me. It is extremely easy to use.
// We just have to prefix our API Endpoint with 'https://crossorigin.me'. 
// Example: https://crossorigin.me/https://www.metaweather.com/api/location/2487956/ which will fetch us the JSON
// formatted string for San Francisco's weather details.
//fetch('https://crossorigin.me/https://www.metaweather.com/api/location/2487956/');

// Now we won't see anything in the console because we simply fired off the request for the data, but we didn't 
// handle the response. Now, one thing we need to know is that, the fetch() API gets our data and returns a Promise.
// And this Promise can either return the data that we want (if the Promise goes to "Resolved State"), or return an
// error (if the Promise goes to "Reject State"). As the programmer who's requesting the data, we must always handle
// both the cases. We use the then() and catch() methods on the Promise that we got to handle the "Resolved" &
// "Reject" states of the Promise respectively.

// If the crossorigin.me proxy doesn't work, then use this instead: https://cors-anywhere.herokuapp.com/ 

// const proxyURL = 'https://cors-anywhere.herokuapp.com/';
// const targetURL = 'https://www.metaweather.com/api/location/2487956/';

// fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956/')
// .then(response => {
//     console.log(response);
// })
// .catch(error => {
//     console.log(error);
// });


// Now, the response we get above is a Response Object, in which there's a "body" field which will be a 
// ReadableStream. We need to convert the Response object into a JSON object as follows:

// fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956/')
// .then(response => {
//     console.log(response);
//     const json = response.json();
//     // if we log the json object to the console, we would get "Promise <pending>", because all the handlers
//     // return a Promise, and the Promise always runs asynchronously. Therefore, we return the json object (which is
//     // a Promise object), which will then be handled by the then() method below @Line #112.
//     return json;
// })
// .then(data => {
//     console.log(data);  // in here, we will see the required object which has the weather data of San Francisco City
//     // Now we will print today's minimum and maximum temperatures in San Francisco
//     const today = data.consolidated_weather[0]; // 0 => today, 1 => tomorrow, 2 => day after tomorrow and so on...
//     console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} to ${today.max_temp} \u00B0C.`);
// })    
// .catch(error => console.log(error));



// Now we can use the code above and create a function that just takes in the 'woeid' to get the weather of the 
// city we want to get the min and max temperatures for as follows:


function getWeather(woeid) {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(response => {
        console.log(response);
        const json = response.json();
        return json;
    })
    .then(data => {
        //console.log(data);
        // Now we will print today's minimum and maximum temperatures in San Francisco
        const today = data.consolidated_weather[0]; // 0 => today, 1 => tomorrow, 2 => day after tomorrow & so on...
        console.log(`Temperatures today in ${data.title} stay between ${today.min_temp.toFixed(2)} to ${today.max_temp.toFixed(2)} \u00B0C.`);
    })    
    .catch(error => console.log(error));
}

getWeather(2487956);    // Get the min and max temperatures of San Francisco => woeid = 2487956
getWeather(2295414);    // Get the min and max temperatures of Hyderabad => woeid = 2295414
getWeather(44418);      // Get the min and max temperatures of London => woeid = 44418

// Remember, since the AJAX requests are asynchronous in nature, the weather data for Hyderabad may arrive the 
// weather data for San Francisco's and so, Hyderabad's weather details may get printed before San Francisco's.

// If we give a wrong 'woeid', then we will get a GET request error:
getWeather(883298392);  // Not a valid 'woeid'

// Output:
//          fetch_promise.js:127 GET https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/883298392/ 404 (Not Found)
//          getWeather @ fetch_promise.js:127
//          (anonymous) @ fetch_promise.js:150
//          TypeError: Cannot read property '0' of undefined at fetch_promise.js:136