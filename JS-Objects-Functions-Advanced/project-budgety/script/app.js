/********************************************************************************************
 * What we'll learn
 * ----------------
 * How and why to create an initialization function.
 */


// Budget Controller
var budgetController = (function() {    // Code related to handling the budget (data) logic
    
    

})();


// UI Controller
var UIController = (function(){      // Code to manipulate the UI

    /**
     * Each and every HTML DOM Element is added in this DOMStrings Object. This object
     * is used in document.querySelector(DOMString.<property>) throughout our code.
     */
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        /**
         * getInput(): returns the values present currently in the classes of the inputs
         *             which are .add__type, .add_description & .add__value, referred to as
         *             inputType, inputDescription & inputValue using the DOMStrings object
         *             which is defined above.
         */
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        /**
         * getDOMStrings(): simply returns the above defined DOMSTrings object to the 
         *                  public scope, i.e., wherever UIController.getDOMStrings() is
         *                  called.
         */
        getDOMStrings: function() {
            return DOMStrings;
        }
    };

})();


/**
 * It is always better to create an initialization function to start the app.
 * We can create an init() function inside the controller iife. Check the code below to see
 * how the init() is written.
 *
 * Also, we separate our code inside the controller itself, by separating the events into
 * a single and simple function known setupEventListeners, where all the event listeners
 * and their code will reside. We will call that function inside our init() function.
 */

// Global App Controller
var controller = (function(budgetCtrl, UICtrl){ // Code related to handling events 

    var setupEventListeners = function() {
        // Get all the DOM classes, id's, etc
        var DOM = UICtrl.getDOMStrings();

        // when we press the .add__btn, we should add the expense/income
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        // when we press the Enter/Return Key, we should add the expense/income
        document.addEventListener("keypress", function(event) {
            // If we press the Enter/Return Key, do the following
            if (event.keyCode === 13 || event.which === 13) 
                ctrlAddItem();
        });
    };
    

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput();
        // console.log(input); // testing

        // 2. Add the item to the budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget at the UI

        // console.log("Its okay!");   // testing
    };

    // to be able to call the init() function from the global scope, we return an 
    // object that contains the init() function as follows:
    return {
        init: function() {
            console.log("Application has started.");    // test
            setupEventListeners();
        }
    };

})(budgetController, UIController);


// This is the only piece of code that we write in the global scope
controller.init();