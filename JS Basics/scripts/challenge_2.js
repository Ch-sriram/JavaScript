/********************************************************************************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.
1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)
4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.
GOOD LUCK 😀
*/

// John's Score Details
var johnFirst = 89, johnSecond = 120, johnThird = 103;
var johnSum = johnFirst + johnSecond + johnThird;
var johnAverage = johnSum / 3;

// Mike's Score Details
var mikeFirst = 116, mikeSecond = 94, mikeThird = 123;
var mikeSum = mikeFirst + mikeSecond + mikeThird;
var mikeAverage = mikeSum / 3;

// Mary's Score Details
var maryFirst = 97, marySecond = 134, maryThird = 105;
var marySum = maryFirst + marySecond + maryThird;
var maryAverage = marySum / 3;

// The average scores are:
console.log("John's Average: " + johnAverage + "\n" +
            "Mike's Average: " + mikeAverage + "\n" +
            "Mary's Average: " + maryAverage);

// Calculating the Greatest Average between John's, Mike's & Mary's Scores
if (johnAverage > mikeAverage && johnAverage > maryAverage) // John's Average Score is the Greatest
    console.log("Winner is John with an average score of " + johnAverage);
else if (mikeAverage > johnAverage && mikeAverage > maryAverage) // Mike's Average Score is the Greatest
    console.log("Winner is Mike with an average score of " + mikeAverage);
else if (maryAverage > johnAverage && maryAverage > mikeAverage) // Mary's Average Score is the Greatest
    console.log("Winner is Mary with an average score of " + maryAverage);
else {
    // Cases when there's a draw:
    // 1. All of them have the same average scores
    //    johnAverage === mikeAverage && johnAverage === maryAverage
    // 2. Only Two of them have the same average 
    //    1. johnAverage === mikeAverage && johnAverage !== maryAverage
    //    2. mikeAverage === maryAverage && mikeAverage !== johnAverage
    //    3. johnAverage === maryAverage && johnAverage !== mikeAverage
    var draw = "There's a Draw!";
    if (johnAverage === mikeAverage && johnAverage === maryAverage)
        draw += " John's, Mike's & Mary's average scores are equal: " + johnAverage;
    else if (johnAverage === mikeAverage && johnAverage !== maryAverage)
        draw += " John's & Mike's average scores are equal: " + johnAverage;
    else if (johnAverage === maryAverage && johnAverage !== mikeAverage)
        draw += " John's & Mary's average scores are equal: " + maryAverage;
    else if (mikeAverage === maryAverage && mikeAverage !== johnAverage)
        draw += " Mike's & Mary's average scores are equal: " + mikeAverage;
    
    console.log(draw);
}


