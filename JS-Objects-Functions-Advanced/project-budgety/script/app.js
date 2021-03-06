// Budget Controller - Code related to handling the budget (data) logic
var budgetController = (function() {     
    
    // Function Constructor for Expense
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;   // every expense item has a percentage value, which is its
                                // percentage expense out of the total income.
    };

    // Expense Constructor has the calcPerc() method defined as follows:
    Expense.prototype.calcPerc = function(totalIncome) {
        if (totalIncome > 0)
            this.percentage = Math.round(this.value / totalIncome * 100);
        else
            this.percentage = -1;
    };

    // Expense Constructor has the getPerc() method defined as follows:
    Expense.prototype.getPerc = function() {
        return this.percentage;
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

        // Deletes the item that we added from the 'data' object defined above
        deleteItem: function(type, ID) {
            // we want to get the index of the item we want to delete from the income/expense
            // list. For that, we can simply loop over all the elements in the income/expense
            // list, depending on the type of the element we want to delete.

            // we use the map() method to loop over all the elements of the type of the list
            // to get the respective id list. map() returns a list.
            // map() can take in 3 parameters - @param1 is current element, @param2 is index
            // of the current element & @param3 is the entire array. In our case, we only
            // need @param1, the current element.

            var ids;    // list of all the IDs of the respective type of list
            var index;  // index of the ID we want to delete from the respective list type

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(ID);

            // we use the splice() method to delete the respective ID from the type list
            // splice(): returns void. splice takes in 2 parameters. @param1 is the position
            // of the index from which we want to delete the elements in the array & @param2
            // is the number of elements we want to delete from the array from the index in
            // @param1. PTR: index can be -1. Therefore, we have to assert it using an if()

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function() {
            /** Desc: calculates the percentage of each expense in the expense list against
             * the total income.
             */ 
            data.allItems.expense.forEach(function(curr) {
                curr.calcPerc(data.totals.income);
            });
        },

        getPercentages: function() {
            /** Desc: gets the percentage of each expense in the expense list against the 
             * total income.
             */
            var allPerc = data.allItems.expense.map(function(curr) {
                return curr.getPerc();
            });
            return allPerc;
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

        // This function is only used once, when there is a call made to controller.init()
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
        budgetLabel: '.budget__value',                      
        incomeLabel: '.budget__income--value',              
        expenseLabel: '.budget__expenses--value',           
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    };

    var formatNumber = function(num, type) {
        /** Desc: formats the number as follows:
         * if num = 25000 & type = income, then the function returns "+ 25,000.00"
         * if num = 5000 & type = expense, then the function returns "- 5,000.00"
         */
        var numSplit;   // array where [0] has integer part & [1] has decimal part
        var integer;    // = numSplit[0]
        var decimal;    // = numSplit[1]

        num = Math.abs(num);
        num = num.toFixed(2);  // returns a fixed floating point string till 2 decimal places

        // Get the integer and decimal part
        numSplit = num.split(".");
        integer = numSplit[0];
        decimal = numSplit[1];

        // to the integer part, we need to add the comma appropriately
        if (integer.length > 3) {
            // we use the substr() method to get the substring from a starting index to some
            // ending index. substr(starting_index, number_of_chars)
            integer = integer.substr(0, integer.length - 3) + "," + 
                                                integer.substr(integer.length - 3, 3);
        }

        return (type === "income" ? "+" : "-") + " " + integer + "." + decimal;
    };

    // We iterate over the NodeList using our own variant of the nodeListForEach() method
    var nodeListForEach = function(nodeList, callback) {
        for(var i = 0; i < nodeList.length; ++i)
            callback(nodeList[i], i);
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
            newHTML = newHTML.replace("%value%", formatNumber(obj.value, type));

            // 3. Insert the HTML into the DOM
            // Find the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
        },

        deleteListItem: function(selectorID) {
            /** Desc: deletes the list item from the UI. To delete an element from the DOM
             * we need the class name or the id of that particular element. In this case
             * the element is removed using the id of the element passed in as selectorID.
             */
            // In DOM, we remove an element from the DOM using the removeChild() method.
            // the removeChild() accepts one parameter and that's the child element to
            // be removed. 

            // we first get the element we want to remove
            var element = document.getElementById(selectorID);

            // we remove the element using the removeChild() method. To remove a child
            // element, we use the parentNode property and then remove the child from the
            // parentNode as follows:
            element.parentNode.removeChild(element);
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
            var type = (obj.budget >= 0) ? "income" : "expense";

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, "income");
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpense, "expense");

            if (obj.percentage > 0)
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + "%";
            else document.querySelector(DOMStrings.percentageLabel).textContent = "---";
        },

        displayPercentages: function(percentages) {
            /** Desc: displays the percentage of expense for each expense in the expense 
             * list, against the total income.
             */

            // Get all the .item__percentage fields in expenses we have in our html page
            // as a NodeList into the fields variable below
            var fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);

            // We use the predefined nodeListForEach() method (above) as follows
            nodeListForEach(fields, function(curr, idx) {
                if (percentages[idx] > 0)
                    curr.textContent = percentages[idx] + "%";
                else 
                    curr.textContent = "---";
            });
        },

        displayDate: function() {
            /**Desc: displays the month and year when the app is opened.
             */
            // Date() constructor can take in 3 parameters and they're:
            // @param1: Year; @param2: Month (0-based indexed => December is 11)
            // @param3: Date;
            var today = new Date();     //console.log(today);
            // var newYear = new Date(2018, 11, 31); console.log(newYear);

            // Date class/prototype has a lot of methods, so we use them as follows
            var year = today.getFullYear();
            var months = ["January", "February", "March", "April", "May", "June", "July", 
                          "August", "September", "October", "November", "December"];
            var month = months[today.getMonth()];
            document.querySelector(DOMStrings.dateLabel).textContent = month + " " + year;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + "," + 
                DOMStrings.inputDescription + "," +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(curr) {
                curr.classList.toggle("red-focus"); // .red-focus found @ ../style/style.css
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
            // .red class found at ../style/style.css
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

        // when there's an event on .container class, we make a callback to ctrlDeleteItem
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);

        // when there's an event on the inputType (HTML option element), we do the foll.
        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);
    };
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();    // console.log(budget);    // testing

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        // 1. Calculate Percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();  //console.log(percentages);

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
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

            // 6. Calculate and update the percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        /** desc: We use event delegation to delete the item from the income/expense list 
         * when the user wants to delete the intended item. We apply this event handler on 
         * the parent (not immediate) element denoted by the .container class.
         */
        var itemID; // used for storing the id attribute we want to delete from the income/
                    // expense list from the DOM
        var splitID;    // used for storing the itemID as an array, which is returned from  
                        // the use of split() on the itemID variable
        var type;   // splitID[0] contains the type of the item from the list, whether it is
                    // is an income/expense item
        var ID; // splitID[1] contains the id number of the income/expense item we want
                // to delete.

        // Getting the required information from the event
        //itemID = event.target;
        
        // The line above gives an <i> element, we don't want that, we only want the id of 
        // the income/expense list's item that we want to delete. We can get that by using 
        // the parentNode property of the event.target object.
        //itemID = event.target.parentNode;

        // from the code in the line above, we get a <div class="item__delete">...</div>
        // element. We don't want that either. We want an element where we can fetch the
        // id, whether that's income or an expense? Therefore, we try and look for what we 
        // require even more above the current node's parentNode
        //itemID = event.target.parentNode.parentNode.parentNode.parentNode;

        // from the line above, we get <div class="item clearfix" id="income-0">...</div>
        // which has an id attribute. Therefore, now we only need the id of that particular
        // element. Therefore we get it as follows
        //itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        // using the above line, we did get the id that we required, but the way we got it
        // is not the recommended way. We hard coded the property calls of parentNode 4 times
        // which is not an ideal way of developing what we want. Therefore, what we do is, we
        // write a loop to find our required item's ID as follows:

        // itemID = event.target;
        // while(itemID !== null) {
        //     if (itemID.tagName.toLowerCase() === "html")
        //         break;
        //     // to understand regex: https://www.youtube.com/watch?v=909NfO1St0A&t=50s
        //     else if (itemID.id !== null && typeof itemID.id === "string" &&  
        //         (/^income-[0-9]+$/.test(itemID.id) || /^expense-[0-9]+$/.test(itemID.id))) {
        //             itemID = itemID.id;
        //             break;
        //     } else itemID = itemID.parentNode;
        // } // console.log(itemID); // testing

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // now that we got the required itemID, we have to split the itemID depending on 
        // the hiphen '-' because, we want to separate out the income/expense id from the 
        // type and store them separately, i.e.,
        splitID = itemID.split('-');    //console.log(splitID); // testing
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // We have all the required information we want, now we just have to follow the steps
        // below, to delete the required item from income/expense list

        // 1. Delete the item from data structure (i.e., from "data" object in budgetCtrl)
        budgetCtrl.deleteItem(type, ID);

        // 2. Delete the item from UI
        UICtrl.deleteListItem(itemID);

        // 3. Update and show the new budget
        updateBudget();

        // 4. Calculate and update the percentages
        updatePercentages();
    };

    // to be able to call the init() function from the global scope, we return an 
    // object that contains the init() function as follows:
    return {
        init: function() {
            console.log("Application has started.");    // test
            UICtrl.displayDate();
            UICtrl.displayBudget(budgetCtrl.initBudget());
            setupEventListeners();
        }
    };

})(budgetController, UIController);


// This is the only piece of code that we write in the global scope
controller.init();