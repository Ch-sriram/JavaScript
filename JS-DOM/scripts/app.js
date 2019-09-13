
/* The Pig Game
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/**
 * What we'll learn:
 * 1. How to create our fundamental game variables
 * 2. How to generate a random number
 * 3. How to manipulate the DOM
 * 4. How to read from the DOM
 * 5. How to change the CSS Styles
 */

// To store the score for each player, we use the score[] array.
// score[0] corresponds to "Player 1" & score[1] corresponds to "Player 2"
var scores = [0, 0];

// Per round (i.e., per cahnce of the player), there'll be a single score for the round.
// Therefore, mainting a variable for the round's score:
var roundScore = 0;

// We'll have a varibale to denote the active player playing the game.
var activePlayer = 0;   //  0 => Player-1;  1 => Player-2

// We'll need a variable for the dice, which generates a random number from 1-6 everytime
// we roll the dice. We'll use the random() from the in-built Math object. Read MDN Docs
// to know more about random() function
var dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);  // Testing the dice functionality.

// To get access to the DOM, we use the document object. document object has many other
// objects & functions. We can simply access any id, class or element by using the
// querySelector() function. We'll use the document.querySelector() function to show the
// dice variables output onto some element in the browser using textContent property of that
// selected HTML element using the id/class/element as follows:
document.querySelector("#score-0").textContent = dice;
// Now everytime we refresh the page, we will be seeing a new value at the element which
// has the id="score-0". Give it a try!

// To get the dice appear anywhere we want, we can just select that id, class or element
// using the querySelector() function & change its textContent to edit the text inside it.
//document.querySelector("#current-0").textContent = dice;

// We can use the activePlayer variable to select our id's/classes cleverly as follows:
activePlayer = 1;
document.querySelector("#score-" + activePlayer).textContent = dice;

// We are using the textContent property to of a selected element/id/class to edit the 
// the text without parsing it as HTML. If we want to parse HTML, then we will use the
// innerHTML property as follows:
document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

// If we would do the same above thing using the textContent property, we would not parse 
// the string as HTML i.e.,
document.querySelector("#score-" + activePlayer).textContent = "<em>" + dice + "</em>";

// We can simply store our dom object in a variable and use it later in the code
var dom = document.querySelector("#score-0").textContent;
console.log(dom);


// We can change the CSS rule for a certain id/class/element by taking selecting that
// particular id/class/element. In our case, we don't want to see the dice image when
// we open the game in the beginning. Therefore, we have to change its style using JS
// as follows: (The img tag has the dice class)
document.querySelector(".dice").style.display = "none";
// we used the style property to change the CSS style & the display property in CSS to change
// its actual value.
// Everytime we change the style of some div/id/class/element, we essentially apply it as 
// inline CSS, i.e., as a style attribute to the element.