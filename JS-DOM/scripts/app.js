/* The Pig Game
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to 
  his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next 
  player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL 
  score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declaring all the global variables at a single place
var scores;         // Global Score Array for P1 & P2
var roundScore;     // Current Round's Score
var activePlayer;   // Currently active player whomsoever has the dice right now
var gamePlaying;    // State of the Game. (true => Game is being played)
var winningScore;   // Score to be achieved to win the Game
var dieRolled;      // Checking whether the die has been rolled at least once
var prevRoll;       // Stores the previous die roll of the current active player 

init();             // Initialiaze all the Global Game Variables

/********************************************************************************************
 * Event Handlers for different events (in order of their appearence in the Web App)
 */

/* Event Handler for Starting a New Game */
document.querySelector(".btn-new").addEventListener("click", init);

/* Event Handler for Changing the Winning Score*/
document.querySelector("#winning-button").addEventListener('click', function() {
    document.getElementById("overlay").style.display = "block";
    
    // Creating a Heading Element <h4>
    var heading = document.createElement("h1");
    heading.setAttribute("id", "score-header");
    heading.textContent = "Change the Winning Score";
    document.getElementById("text").appendChild(heading);

    // Creating a <p> tag
    var para = document.createElement("p");
    para.setAttribute("id", "win-wrap");
    para.innerHTML = "Score Range: [min = 20, max = 999], " + 
                    "Current Winning Score is " + winningScore + ".";
    document.getElementById("text").appendChild(para);

    // Creating an input field to take in the value of the new winningScore
    var winningInput = document.createElement("input");
    winningInput.setAttribute("id", "win-input");
    winningInput.setAttribute("type", "text");
    winningInput.setAttribute("minlength", "2");
    winningInput.setAttribute("maxlength", "4");
    winningInput.setAttribute("placeholder", "100");
    document.getElementById("text").appendChild(winningInput);

    // Creating an input button to get the winning input score
    var winBtn = document.createElement("input");
    winBtn.setAttribute("id", "btn-win-submit");
    winBtn.setAttribute("type", "button");
    winBtn.setAttribute("value", "Change Score");
    document.getElementById("text").appendChild(winBtn);

    // Creating another button to close the winning score overlay w/o changing the score
    var winCls = document.createElement("input");
    winCls.setAttribute("id", "btn-win-close");
    winCls.setAttribute("type", "button");
    winCls.setAttribute("value", "Close");
    document.getElementById("text").appendChild(winCls);
});

/* Event Handler for Showing Information to the User */
document.querySelector("#rules").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block";
    
    /**
     * Check the following website to understand the code below:
     * https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ol_create
     */

    // Create the Heading Element (<h1> element)
    var heading = document.createElement("h1");
    heading.setAttribute("id", "rule-heading");
    heading.textContent = "Rules of the Game";
    document.getElementById("text").appendChild(heading);

    // Create the List Element for the Rules
    createRules();
    function createRules() {
        var rulesOL = document.createElement("ol");
        rulesOL.setAttribute("id", "game-rules");
        document.getElementById("text").appendChild(rulesOL);

        var ruleList = [];
        ruleList[0] = "The game has 2 players, playing in rounds (By default, Player 1 starts)";
        ruleList[1] = "In each turn, a player rolls a dice as many times as s/he wishes. Each die roll's result gets added to their ROUND score";
        ruleList[2] = "BUT, if the player rolls a 1, entire ROUND score accumulated till now, becomes 0. After that, it's the next player's turn";
        ruleList[3] = "Also, if the player rolls two-6's consecutively, the entire score the player accumulated till now, becomes 0";
        ruleList[4] = "The player can choose to 'Hold', which means that the current player's ROUND score gets added to their GLOBAL score. After that, it's the next player's turn";
        ruleList[5] = "The first player to reach " + winningScore + " points (Default is 100) on GLOBAL score wins the game";

        for(var i = 0; i < ruleList.length; ++i) {
            var li = document.createElement("li");
            var rule = document.createTextNode(ruleList[i] + ".");
            li.appendChild(rule);
            document.getElementById("game-rules").appendChild(li);
        }
    }

    // Creating the button to close the overlay
    var closeButton = document.createElement("input");
    closeButton.setAttribute("id", "btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("value", "Close");
    document.getElementById("text").appendChild(closeButton);
});

/* Event Handler for deleting the generated content on the Overlay */
document.querySelector("#text").addEventListener("click", function(event, id) {
    /**
     * We use Event Delegation here:
     * https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1
     * https://javascript.info/event-delegation
     */
    // This part is handled using Event Delegation
    var targetElement = event.target;
    //console.log(targetElement.id);
    var selector = "input";
    if (targetElement.matches(selector)) {
        var closeRules = "btn-close";           // Close button for Rules Section
        var closeWinScore = "btn-win-close";    // Close button for Win Score Change Section
        var submitWinScore = "btn-win-submit";  // Submit button for Win Score Change Section
        if (targetElement.id === closeRules || targetElement.id === closeWinScore) {
            overlayOff();
        } else if (targetElement.id === submitWinScore) {
            if (!dieRolled) {   
                /**
                 * If the dice was rolled not even once, then let the user change the winning score.
                 */
                var newScore = document.getElementById("win-input").value;
                var regex = /^[0-9]{2,3}$/;
                console.log(regex.test(newScore));
                if (newScore.match(regex)) {
                    // The new winning score can be valid
                    newScore = Number(newScore);
                    if (newScore >= 20 && newScore <= 999) {
                        // The new winning score is perfectly valid    
                        winningScore = Number(newScore);
                        alert("New Winning Score is " + winningScore);
                        overlayOff();
                    } else {
                        // The new winning score is definitely invalid
                        alert("Please type in an integer between 20 & 999.");
                    }
                } else {
                    // The new winning score is definitely invalid
                    alert("Please type in an integer between 20 & 999.");
                }
            } else {
                /**
                 * If the dice was rolled even once, don't let the user change the winning score.
                 */
                alert("Please start a New Game to change the Winning Score.");
            }
            
        }
    }
});

/* Event Handler for Rolling the Dice */
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        dieRolled = true;   // The dice has been rolled at least once now
        var dice = Math.floor(Math.random() * 6) + 1;   // Random number from 1 to 6
        
        /* Display the dice roll as an image using the DOM onto the Web App */
        var diceDOM = document.querySelector(".dice");
        diceDOM.src = "./img/dice-" + dice + ".png";
        diceDOM.style.display = "block";

        if (dice === 6) {   // When the die roll is a 6, check for
            if (prevRoll === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = "0";
                nextActivePlayer();
            } else {
                updateRoundScore(dice);
            }            
        } else if (dice > 1 && dice < 6) {    // When we don't roll a 1 or a 6
            updateRoundScore(dice);
        } else {    // When the die roll is a 1
            nextActivePlayer();
        }
    }
});

/* Event Handler for Recording accumulated Round Score to be the Global Score */
document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore; // Update the global score of the active player

        /* Display the global score in the game */
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) { // active player has won the game
            /* Show that the active player is the winner */
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";

            /* Hide the dice */
            document.querySelector(".dice").style.display = "none";
            
            /* Prettify the "Winner!" using the addition of .winner class (defined in the 
            style.css) to the .player-x-panel (x = {0,1}) class of the markup */
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

            gamePlaying = false; // Set the Game State to False, as the Game is Over!
        } 
        else  // active player has not won the game, therefore, change the player
            nextActivePlayer();
    }
});

/********************************************************************************************
 * Function Declarations for Global Use (in order of their execution in the Game)
 */

/* Function to initialize all the Game Data */
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;   //  0 => Player-1;  1 => Player-2
    gamePlaying = true; // Set the game state to playing
    winningScore = 100; // Default winning score is 100
    dieRolled = false;  // the dice has/have not yet been rolled even once
    prevRoll = 0;       // If there hasn't been any previous dice roll, set it to 0

    // Hide the dice image when opening the page for the first time
    document.querySelector('.dice').style.display = "none";

    document.getElementById("score-0").textContent = "0";   // Init 0 for P1
    document.getElementById("score-1").textContent = "0";   // Init 0 for P2
    document.getElementById("current-0").textContent = "0"; // Init 0 for roundScore P1
    document.getElementById("current-1").textContent = "0"; // Init 0 for roundScore P2

    // The names of the Players should be restored to what they were previously
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    // Remove all the classes that might've been applied to the player panels before
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    // Add the active class to .player-0-panel as the active player after init() is P1
    document.querySelector(".player-0-panel").classList.add("active");
}

/* Function to Update the Round Score in the Game */
function updateRoundScore(dice) {
    roundScore += dice; // Add the score generated by the dice to the roundScore
    prevRoll = dice;    // Update the current roll as the previous dice roll

    /* Display the roundScore to the current activePlayer's temporary score holder */
    document.getElementById("current-" + activePlayer).textContent = roundScore;
}

/* Function to toggle between players */
function nextActivePlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;  // Toggle the active player
    prevRoll = 0;   // Reset the previous dice roll to 0 for both P1 & P2
    roundScore = 0; // Reset the Round Score to 0

    /* Set the current scores of both Players (P1 & P2) to 0 */
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    /* Toggle the style for the active player */ 
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    
    /* Hide the dice image when we roll a 1 */
    document.querySelector(".dice").style.display = "none";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";

    /**
     * Go to the following link to understand the code below:
     * https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
     */

    // Deleting the child nodes of the #text div (i.e., h1 & ol) using JS
    var text = document.getElementById("text");
    var child = text.lastElementChild;  // text.firstElementChild also possible
    while(child) {
        text.removeChild(child);
        child = text.lastElementChild;  // text.firstElementChild also possible
    }
}