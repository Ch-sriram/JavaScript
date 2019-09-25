/********************************************************************************************
 * What we'll learn
 * ----------------
 * 1. More DOM Manipulation
 */

// Budget Controller - Code related to handling the budget (data) logic
var budgetController = (function() {     
    
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
        },
        budget: 0,  // stores the available budget: totals.income - totals.expense
        percentage: -1, // % of expenses made out of the total income. by default it is -1
    };

    // Function to calculate the total income/expense made by the user till now
    var calculateTotal = function(type) {
        var sum = 0;    // Stores the total income/expense sum till now
        
        // loop through all the current incomes/expenses and save them in sum
        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });

        // Store the sum inside the relevant item type - income/expense
        data.totals[type] = sum;
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

        // Calculates the total budget by tallying income and expenses
        calculateBudget: function() {
            // Calculate total income/expense
            calculateTotal("income");
            calculateTotal("expense");

            // Calculate the budget: income - expense
            data.budget = data.totals.income - data.totals.expense;

            // Calculate the percentage of income that we spend, only if income !== 0
            if (data.totals.income > 0)
             data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            else data.percentage = -1;
        },

        // Returns the budget, as an object
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage: data.percentage,
            };
        },

        initBudget: function() {
            return {
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1,
            };
        },

        testing: function() {
            // use this function only for testing purpose
            return data;
        }
    };
})();


// UI Controller - Code to manipulate the UI
var UIController = (function(){

    var DOMStrings = {
        /** Object desc:
         * Each and every HTML DOM Element is added in this DOMStrings Object. This object
         * is used for getting the HTML element throughout the code using a more uniform
         * naming methodology.
         */
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',                      // newly added class
        incomeLabel: '.budget__income--value',              // newly added class
        expenseLabel: '.budget__expenses--value',           // newly added class
        percentageLabel: '.budget__expenses--percentage',   // newly added class
    };

    return {
        getInput: function() {
            /** function desc:
             * returns the values present currently in the classes of the inputs
             * which are .add__type, .add_description & .add__value, referred to as
             * inputType, inputDescription & inputValue using the DOMStrings object
             * which is defined above.
             * 
             *      type: income/expense from the <select> <option>'s value
             *      description: string from <input type="text" ...>
             *      value: number from <input type="number" ...>
             */
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
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

        clearFields: function() {
            /** Desc: Clears all the relevant HTML fields (like inputDescription and
             * inputValue from DOMStrings) after we added a new item using the addListItem 
             * into the page.
             */
            var fields; // Used to store the NodeList type list (not an array) from the 
                        // return of querySelectorAll() method.
            var fieldsArr;  // Used to store the converted fields NodeList variable as
                            // an array
            // API Reference for querySelectorAll()
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
            fields = document.querySelectorAll(DOMStrings.inputDescription + 
                                               ", " + DOMStrings.inputValue);
            //fieldsArr = Array.prototype.slice.call(fields);   // instead of this, we can
            fieldsArr = Array.from(fields);     // simply do this.
            // forEach is a fucnction that takes in a callback function.
            // That callback function takes in 3 arguments: currentValue, index, array
            // where, "currentValue" is the current element's value in the array pointed by 
            // the "index", and "array" is the entire array itself.
            fieldsArr.forEach(function(curr, idx, arr) {  
                curr.value = "";
            });
            fieldsArr[0].focus(); // fieldsArr[0] is the DOMStrings.inputDescription element
        },

        displayBudget: function(obj) {
            /** Desc: Used only to display the budget in the UI. The function uses DOM 
             * manipulation to achieve the task of displaying to the UI.
             * obj => the budget object that contains budget, totalIncome, totalExpense,
             *        and percentage properties.
             * Refer the DOMStrings object defined above to see the HTML classes that we are
             * using to refer to the objects here.
             */
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExpense;

            if (obj.percentage > 0)
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + "%";
            else document.querySelector(DOMStrings.percentageLabel).textContent = "---";
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


// Global App Controller - Code related to handling events and everything else in the app
var controller = (function(budgetCtrl, UICtrl){ 

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
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();    // console.log(budget);    // testing

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();      // console.log(input); // testing

        /**
         * We want steps 2 and above to happen, only when the input has some description and
         * some income/expense value (not 0 & NaN). Therefore, we use an if statement to
         * handle such a scenario, right here.
         */
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the input HTML fields
            UICtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();
        }
    };

    // to be able to call the init() function from the global scope, we return an 
    // object that contains the init() function as follows:
    return {
        init: function() {
            console.log("Application has started.");    // test
            UICtrl.displayBudget(budgetCtrl.initBudget());
            setupEventListeners();
        }
    };

})(budgetController, UIController);


// This is the only piece of code that we write in the global scope
controller.init();