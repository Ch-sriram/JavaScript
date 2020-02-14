/********************************************************************************************************************
 * Making AJAX Calls using Fetch and Async/Await
 * ---------------------------------------------
 * 
 * Using async and await, we can consume the Promises in a much easier way. 
 * We will create an asynchronous version of the getWeather() function that we created in fetch_promise.js 
 * @https://github.com/Ch-sriram/JavaScript/blob/master/Asynchronous-JS/scripts/fetch_promise.js. 
 *
 * We can see the getWeather()'s definition below.
 */


function getWeather(woeid) {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(response => {
        //console.log(response);
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


// We will now create the asynchronous version of the getWeather() function and call it getWeatherAW()

async function getWeatherAW(woeid) {
    // We enclose everything inside a try block so that we can catch an error if we encounter one
    try {
        // We simply call the fetch() and make an AJAX request and wait for the response using the await
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        //console.log(response);  
    
        // Response object contains 'body' field which is a ReadableStream, which is to be converted to JSON object.
        // We convert the Response we got, into a JavaScript object
        const data = await response.json();

        const today = data.consolidated_weather[0]; // Get today's weather data
        console.log(`Today's temperatures in ${data.title} stay between ${today.min_temp.toFixed(2)} to ${today.max_temp.toFixed(2)} \u00B0C.`);

        const tomorrow = data.consolidated_weather[0]; // Get weather data for tomorrow
        console.log(`Tomorrow's temperatures in ${data.title} stay between ${tomorrow.min_temp.toFixed(2)} to ${tomorrow.max_temp.toFixed(2)} \u00B0C.`);

        return data;

    } catch(error) {
        console.log("There is an error.");
        console.log(error);
    }
}


getWeatherAW(2487956);    // Get the min and max temperatures of San Francisco => woeid = 2487956
getWeatherAW(2295414);    // Get the min and max temperatures of Hyderabad => woeid = 2295414
getWeatherAW(44418);      // Get the min and max temperatures of London => woeid = 44418

// To store the data that comes from the async getWeatherAW() function, we cannot just store it simply in a variable
// We know that an async function always returns a Promise, so whatever is returned, on that, we can always call
// the then() and catch() methods to handle the "resolved" and "reject" states respectively.
getWeatherAW(2295420)     // Get the min and max temperatures of Bangalore => woeid = 2295420
.then(data => console.log(data))
.catch(error => console.log(error));

getWeatherAW(9283749283); // woeid is invalid, so the code in the catch block will be executed because of this call

// Output for line #63: getWeatherAW(9283749283);
//          fetch_async_await.js:40 GET https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/9283749283/ 404 (Not Found)
//          getWeatherAW @ fetch_async_await.js:40
//          (anonymous) @ fetch_async_await.js:62
//          fetch_async_await.js:53 There is an error.
//          fetch_async_await.js:54 TypeError: Cannot read property '0' of undefined at getWeatherAW (fetch_async_await.js:47)


/**
 * Full Output
   -----------

fetch_async_await.js:40 GET https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/9283749283/ 404 (Not Found)
getWeatherAW @ fetch_async_await.js:40
(anonymous) @ fetch_async_await.js:73
fetch_async_await.js:56 There is an error.
fetch_async_await.js:57 TypeError: Cannot read property '0' of undefined at getWeatherAW (fetch_async_await.js:47)
fetch_async_await.js:48 Today's temperatures in Bangalore stay between 17.13 to 32.72 °C.
fetch_async_await.js:51 Tomorrow's temperatures in Bangalore stay between 17.13 to 32.72 °C.
fetch_async_await.js:70 {consolidated_weather: Array(6), time: "2020-02-15T00:03:27.073004+05:30", sun_rise: "2020-02-15T06:42:15.368068+05:30", sun_set: "2020-02-15T18:25:13.444930+05:30", timezone_name: "LMT", …}
fetch_async_await.js:24 Temperatures today in Hyderabad stay between 19.25 to 33.52 °C.
fetch_async_await.js:24 Temperatures today in London stay between 6.09 to 11.29 °C.
fetch_async_await.js:24 Temperatures today in San Francisco stay between 8.48 to 13.65 °C.
fetch_async_await.js:48 Today's temperatures in London stay between 6.09 to 11.29 °C.
fetch_async_await.js:51 Tomorrow's temperatures in London stay between 6.09 to 11.29 °C.
fetch_async_await.js:48 Today's temperatures in Hyderabad stay between 19.25 to 33.52 °C.
fetch_async_await.js:51 Tomorrow's temperatures in Hyderabad stay between 19.25 to 33.52 °C.
fetch_async_await.js:48 Today's temperatures in San Francisco stay between 8.48 to 13.65 °C.
fetch_async_await.js:51 Tomorrow's temperatures in San Francisco stay between 8.48 to 13.65 °C.
 */