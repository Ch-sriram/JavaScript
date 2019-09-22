/********************************************************************************************
 * What we'll learn
 * ----------------
 * 1. How to setup event listeners for keypress events.
 * 2. How to use the event object.
 */


// Budget Controller
var budgetController = (function() {    // Code related to handling the budget (data) logic
    


})();


// UI Controller
var UIController = (function(){      // Code to manipulate the UI



})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl){ // Code related to handling events 

    var ctrlAddItem = function() {
        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget at the UI

        console.log("Its okay!");   // testing
    };

    // when we press the .add__btn, we should add the expense/income
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

    // when we press the Enter/Return Key, we should add the expense/income
    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) // If we press the Enter/Return Key
            ctrlAddItem();
    });

    // document.addEventListener("keypress", function(event){
    //     // console.log(event);  // check the browser's console after pressing some keys
    //                             // in the browser, when the document is active.
    //     // any keypress on the browser will be shown in the console.
    //     // every key has a keyCode property, which is what we need.
    //     // in older browsers, the "keyCode" property was called the "which" property
    //     if (event.keyCode === 13 || event.which === 13) {
    //         // console.log("Enter Key");    // test code
    //         // when the Enter/Return Key is pressed, we should follow the steps of 
    //         // whatever happens when we press the .add__btn button,
    //         // therefore, we create a common function for the events, named as
    //         // ctrlAddItem function, above
    //     }   
    // });
    
})(budgetController, UIController);