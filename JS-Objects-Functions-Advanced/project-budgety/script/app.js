/********************************************************************************************
 * What we'll learn
 * ----------------
 * How to read data from different HTML input types with Separation of Concerns.
 */

/**
 * We write methods for calculating the budget in the budgetController, and in the 
 * controller function, we use the function i.e., we call the functions from the
 * budgetController (using budgetCtrl in controller) and then use them accordingly. 
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


// Global App Controller
var controller = (function(budgetCtrl, UICtrl){ // Code related to handling events 

    var DOM = UICtrl.getDOMStrings();

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget at the UI

        // console.log("Its okay!");   // testing
    };

    // when we press the .add__btn, we should add the expense/income
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    // when we press the Enter/Return Key, we should add the expense/income
    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) // If we press the Enter/Return Key
            ctrlAddItem();
    });
    
})(budgetController, UIController);