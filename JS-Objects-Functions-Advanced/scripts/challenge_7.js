/*
Coding Challenge - VII
======================
--- Let's build a fun quiz game in the console ---
1. Build a function constructor called Question to describe a question. A question should include:
    a) question itself
    b) the answers from which the player can choose the correct one (choose an adequate data 
       structure here, array, object, etc.)
    c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
( function() {  // Using an IIFE so that this code is private, inaccessible to other code 
    // constructor for the Questions & Answers
    var Question = function(question, answers, correctChoice) {
        this.question = question;
        this.answers = answers;
        this.correctChoice = correctChoice;
    };

    var q1 = new Question(
        "How do you feel about Coding?",
        ["fun, but tedious", "easy peesy lemon squeezy", "really really hard", "boring"], 0
    );

    var q2 = new Question(
        "What's the best programming language for Web Development?",
        ["C", "C++", "Java", "JavaScript"], 3
    );

    var q3 = new Question(
        "Which one's a Markup Language out of all of these options?",
        ["CSS", "Perl", "HTML", "Python"], 2
    );

    var q4 = new Question(
        "Which one's the faster Programming Language amongst these options?",
        ["C++", "C", "JavaScript", "Python"], 1 
    );

    var questions = [q1, q2, q3, q4];

    function questionSelector(questions) {
        return Math.floor(Math.random() * questions.length);
    }

    function startGame(questions) {
        selectedQuestion = questionSelector(questions);
        console.log("Q. " + questions[selectedQuestion].question);
        for(var i = 0; i < questions[selectedQuestion].answers.length; ++i) 
            console.log(" " + i + ". " + questions[selectedQuestion].answers[i]);
        var userAnswer = prompt(questions[selectedQuestion].question);
        if (userAnswer == questions[selectedQuestion].correctChoice)
            console.log("Correct Answer.");
        else console.log("Wrong Answer. Try Again!");
    }

    window.addEventListener("load", startGame(questions));

})();
*/

/*
--- Expert level ---
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this.
*/

( function() {  // Using an IIFE so that this code is private, inaccessible to other code 
    // constructor for the Questions & Answers
    var Question = function(question, answers, correctChoice) {
        this.question = question;
        this.answers = answers;
        this.correctChoice = correctChoice;
    };

    var q1 = new Question(
        "How do you feel about Coding?",
        ["fun, but tedious", "easy peesy lemon squeezy", "really really hard", "boring"], 0
    );

    var q2 = new Question(
        "What's the best programming language for Web Development?",
        ["C", "C++", "Java", "JavaScript"], 3
    );

    var q3 = new Question(
        "Which one's a Markup Language out of all of these options?",
        ["CSS", "Perl", "HTML", "Python"], 2
    );

    var q4 = new Question(
        "Which one's the fastest Programming Languages amongst these options?",
        ["C++", "C", "JavaScript", "Python"], 1 
    );

    var questions = [q1, q2, q3, q4];
    var score = 0;

    function getRandomQuestion() {
        return Math.floor(Math.random() * questions.length);
    }

    function getScore() {
        return score;
    }

    function updateScore() {
        ++score;
    }

    function resetScore() {
        score = 0;
    }

    function separate() {
        console.log("----------------------------------------------------------------");
    }

    function startGame(questions) {
        console.clear();
        var previousQuestion = -1;
        var currentQuestion;
        var userAnswer; 
        var gameStatus = true;  // game is being played
        var answerStatus = "correct";   // default: "correct"
        
        function displayScore() {
            console.log("Your Score: " + getScore());
        }
        
        function getQuestion() {
            var randomQuestion = getRandomQuestion();
            if (previousQuestion !== currentQuestion)
                currentQuestion = randomQuestion;
            else 
                while(true) {
                    randomQuestion = getRandomQuestion();
                    if(randomQuestion !== previousQuestion) {
                        currentQuestion = randomQuestion;
                        break;
                    }
                }
        }
        
        function displayQuestion() {
            console.log("Q. " + questions[currentQuestion].question);
            for(var i = 0; i < questions[currentQuestion].answers.length; ++i) 
                console.log(" " + i + ". " + questions[currentQuestion].answers[i]);
        }
        
        function getAnswer() {
            userAnswer = prompt(questions[currentQuestion].question);
            if(userAnswer == "exit")
                gameStatus = false;
            else if(userAnswer == questions[currentQuestion].correctChoice) {
                updateScore();
                previousQuestion = currentQuestion;
                answerStatus = "correct";
                gameStatus = true;
            }
            else {
                answerStatus = "incorrect";
                gameStatus = true;
            }
        }
        
        var gameExitFlag = false;
        while(true && gameExitFlag === false) {
            displayScore();
            getQuestion();
            displayQuestion();
            getAnswer();
            if(gameStatus === false)
                break;
            else {
                if(answerStatus === "correct") {
                    console.log("Correct Answer. Next Question.");
                    separate();
                } else {    // answerStatus === "incorrect"
                    var answered = false;
                    
                    while (answered === false) {
                        console.log("Wrong Answer. Try Again!");
                        separate();
                        displayScore();
                        displayQuestion();
                        getAnswer();
                        if (gameStatus === false) {
                            gameExitFlag = true;
                            break; 
                        } else if (answerStatus === "correct") {
                            separate();
                            break;
                        }
                    }
                }
            }
        }
        displayScore();
        console.log("Thank you, play the game again some time soon :)");
        resetScore();
    }

    window.addEventListener("load", startGame(questions));
})();