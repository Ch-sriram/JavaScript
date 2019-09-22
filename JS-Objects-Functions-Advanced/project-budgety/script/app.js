/********************************************************************************************
 * What we'll learn
 * ----------------
 * 1. How to choose function constructors that meet our application's needs.
 * 2. How to set up a proper data structure for our budget controller.
 */

/**
 * We should have a distinct way to distinguish between expenses and incomes of the user.
 * For that, we should create function constructors for expense and income respectively.
 * Also, each user can have many expense and income values, for that, we can use a 
 * data structure like an array, to store all the user's each and every income, expense, etc
 * separately.
 */

// Budget Controller
var budgetController = (function() {    // Code related to handling the budget (data) logic
    
    // Function Constructor for Expense
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Function constructor for Incomes
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Use a Data Structure to store each and every individual income & expense uniquely
    var data = {
        allItems: { 
            income: [],     // each and every income and expense needs to be stored 
            expense: []     // separately => we use a list (array) data structure for this.
        },
        totals: {
            income: 0,      // the total income and expense would simply be a number.
            expense: 0
        }
    };
})();


// UI Controller
var UIController = (function(){      // Code to manipulate the UI

    /** Object desc:
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
        
        getInput: function() {
            /** function desc:
             * returns the values present currently in the classes of the inputs
             * which are .add__type, .add_description & .add__value, referred to as
             * inputType, inputDescription & inputValue using the DOMStrings object
             * which is defined above.
             */
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        
        getDOMStrings: function() {
            /** function desc:
             * simply returns the above defined DOMStrings object to the public scope, i.e., 
             * wherever UIController.getDOMStrings() is called.
             */
            return DOMStrings;
        }
    };

})();


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