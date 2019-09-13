
/* The Pig Game
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/********************************************************************************************
 * Events: Notifications that are sent to notify the JS code that something has happened 
 *         on the Webpage. Ex: Clicking a button, resizing a window, scrolling down or 
 *         pressing a key.
 * 
 * Event Listener: A function that performs an action based on a certain event. It waits for
 *                 a specific event to happen in the browser.
 * 
 * Q) How are events processed?
 * A) The rule is that, for an even to be processed, all the functions that are in the 
 *    stack i.e., all the execution stacks have to be processed first, and then, any event
 *    can be processed on top of the Global Execution Stack. All the events wait inside 
 *    the Message Queue. From the message queue, the events are executed in FIFO order.
 *    For every event, there's an evenet listener which is the event handler which calls
 *    a function and an execution context for that event handler is pushed on top of the
 *    execution stack.
 */


/********************************************************************************************
 * What we'll learn:
 * 1. How to setup an event handler
 * 2. What a callback function is
 * 3. What an anonymous function is
 * 4. Another way to select elements by ID
 * 5. How to change the image in an <img> element
 */

//var scores = [0, 0];
//var roundScore = 0;
//var activePlayer = 0;   //  0 => Player-1;  1 => Player-2
//var dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);  // Testing the dice functionality.
//document.querySelector("#score-0").textContent = dice;
//document.querySelector("#current-0").textContent = dice;
//activePlayer = 1;
//document.querySelector("#score-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
//document.querySelector("#score-" + activePlayer).textContent = "<em>" + dice + "</em>";
//var dom = document.querySelector("#score-0").textContent;
//console.log(dom);
//document.querySelector(".dice").style.display = "none";


// We generally write variable declarations on top for a small project, so that the code 
// seems uniform and simple to navigate.

var scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;   //  0 => Player-1;  1 => Player-2

// Hide the dice image when opening the page for the first time
document.querySelector('.dice').style.display = "none";

/* Adding an Event Listener */
// Add functionality to wiht "Roll Dice" which has the .btn-roll class.
// We use addEventListener(<event_type>, <event_handler>)

// The <event_type> is a string that is an event. To get a click on the button, we send
// the 'click' event as the <event_type>. For more event definitions, follow this link:
// https://developer.mozilla.org/en-US/docs/Web/Events

// <event_handler> is a parameter that takes a function. The addEventListener() takes in 
// a string (which is <event_type>) & a function (which is <event_handler>). 
// This function can be passed in 2 different ways (we'll understand this later). 
// The function that's passed, will be called by the addEventListener() method, whenever
// the event is actually triggered in the webpage by the user/browser, and thereby, 
// the function is called. Therefore, in this case, addEventListener() is a function, that
// takes in a function, and calls that function (which is the <event_handler>) only when
// the event to that related function happens, this makes the addEventListener() method,
// a callback method/function. A function which call another function due to certain
// events, is known as a Callback function.

// There are 2 different ways to send the function as a parameter in JS.
// Way #1: Define the function using function expression & send the variable associated
//         to that function as the <event_handler> to addEventListener() method i.e.,
// var btn_roll = function() {
//     // Do Something to Handle the Event
// };
// document.querySelector(".btn-roll").addEventListener('click', btn_roll);

// Way #2: Define the function in the <event_handler>'s parameter, as an anonyous function
// as follows:

// The <event_handler> to the addEventListener() method in line 100, is defined when passing
// and also, that function has no name, and therefore, such functions are known to be 
// Anonymous Functions.

document.querySelector(".btn-roll").addEventListener("click", function() {
    // 1. Generate a Random Number for the dice:
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the Result
    var diceDOM = document.querySelector(".dice");
    // Since the diceDOM is an <img> element, we can access its src attribute as a property
    diceDOM.src = "./img/dice-" + dice + ".png";
    diceDOM.style.display = "block";
    
    // 3. Update the roundScore iff dice !== 1
});

// We can select the HTML elements using the querySelector() method, or the other methods
// like getElementById(), getElementsByClassName(), getElementsByName(), 
// getElementsByTagName(), etc. getElementById() & querySelector() methods are used to select
// a single element and do something with it. But using getElementsByClass(), 
// getElementsByName(), getElementsByTagName(), etc, we select multiple elements at once.

// Example of getElementById(): 
// (We can only select elements which have id's with this method)
document.getElementById("score-0").textContent = "0";   // Set Initial Score for Player 1 = 0
document.getElementById("score-1").textContent = "0";   // Set Initial Score for Player 2 = 0
document.getElementById("current-0").textContent = "0"; //Init Overall Score for Player 1 = 0
document.getElementById("current-1").textContent = "0"; //Init Overall Score for Player 2 = 0

