/********************************************************************************************
 * What we'll learn
 * ----------------
 * 1. A technique for adding big chunks of HTML into the DOM;
 * 2. How to replace parts of strings;
 * 3. How to do DOM Manipulation using the insertAdjacentHTML() method;
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

    function createID(type) {
        // Every newly created item (either it is of type "Expense" or of type "Income")
        // has an "id" property. If the data.allItems.<type> has no element in their arrays,
        // then the first element's "id" would be 0. From there on, every element's id will
        // 1 more from the previous element's id from the data.allItems.<type> array, where
        // <type> can be either "expense" of "income", depending on what the user has entered
        if (data.allItems[type].length === 0)
            return 0;
        else return data.allItems[type][data.allItems[type].length - 1].id + 1;
    }

    return {
        addItem: function(type, des, val) {
            // Get a new ID for the New Item to be created
            var ID = createID(type);

            // Check the type of the item we are adding, is it income or expense?
            var newItem;    // assign the new item to this variable
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

/**
 * Adding the new items to the UI using the insertAdjacentHTML() method, in the UIController
 */

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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',       // added newly
        expenseContainer: '.expenses__list'     // added newly
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

        addListItem: function(obj, type) {
            /** Desc: Creates a HTML string with placeholder string depending on the the
             * type of the element being added. Then replaces the placeholder text (text
             * inside %<placeholder>%) with the actual data. And finally, insert the HTML
             * into the DOM.
             */
            // 1. Create HTML string with placeholder text
            var HTML;   // string is copied from index.html into the variable
            var newHTML;// used for replacing the %<placeholder>% in HTML
            var element;    // element to be added into the index.html at either the
                            // incomeContainer or at the expenseContainer. Both of which
                            // are properly defined in DOMStrings object above.
            if (type == "income") {
                element = DOMStrings.incomeContainer;
                HTML = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type == "expense") {
                element = DOMStrings.expenseContainer;
                HTML = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
                
            // 2. Replace the placeholder text with some actual data using regexp replace()
            newHTML = HTML.replace("%id%", obj.id);
            newHTML = newHTML.replace("%description%", obj.description);
            newHTML = newHTML.replace("%value%", obj.value);

            // 3. Insert the HTML into the DOM
            // Find the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
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
        input = UICtrl.getInput();      // console.log(input); // testing

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to UI
        UICtrl.addListItem(newItem, input.type);

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