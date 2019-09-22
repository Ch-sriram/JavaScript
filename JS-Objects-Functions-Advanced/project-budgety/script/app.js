/********************************************************************************************
 * What we'll learn
 * ----------------
 * 1. How to avoid conflicts in our data structures.
 * 2. How and why to pass data from one module to another.
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

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // To create a unique ID, we will always take the Array's latest created
            // element's index (i.e., its ID) and 1 to it, to always get a unique number
            // as our ID for each and every item we add into the array. For the first element
            // added in our array, we create it with an id of 0.
            if (data.allItems[type].length === 0) {
                ID = 0;
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            // Check the type of the item we are adding, is it income or expense?
            if (type === "income")
                newItem = new Income(ID, des, val);
            else if (type === "expense")
                newItem = new Expense(ID, des, val);
            
            // Push the newly created item into our data structure
            data.allItems[type].push(newItem);

            // new item should be returned to the global controller of this app
            return newItem;
        },

        testing: function() {
            // use this function only for testing purpose
            return data;
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
             * type: income/expense
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
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
        
        // console.log(input); // testing
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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