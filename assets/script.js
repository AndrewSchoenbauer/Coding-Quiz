var startQuizBtn = document.getElementById("startBtn");
var startQuizEl = document.getElementById("frontPage");
var quizBody = document.getElementById("codeQuiz");
var quizTimer = document.getElementById("timer");
var quizQuesEl = document.getElementById("quizQues");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var cBtn = document.getElementById("c");
var dBtn = document.getElementById("d");
var gameFinished = document.getElementById("gameFinish");
var finalScoreEl = document.getElementById("finalScore");
var highInitials = document.getElementById("initials");
var highscoreEl = document.getElementById("highScore");
var highscorePageEl = document.getElementById("highscore-Page");
var highscoreHeadEl = document.getElementById("highscoreHead");
var endbtnEl = document.getElementById("endbtns");
var replayEl = document.getElementById("replay");
var clearhighscoreEl = document.getElementById("clearHighscore");
var submitscoreBtn = document.getElementById("submitScore");
var highscoreInitialsEl = document.getElementById("highscoreInitials");
var highScoreScoreEl = document.getElementById("highscore-Score");

//creating a question array
var quizQuestions = [ 
    {
        question: "Inside what HTML element do we put the JavaScript?",
        choiceA: "javascript",
        choiceB: "scripting",
        choiceC: "js",
        choiceD: "script",
        correctAnswer: "d", 
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choiceA: "onmouseclick",
        choiceB: "onclick",
        choiceC: "onchange",
        choiceD: "onmouseover",
        correctAnswer: "b",
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choiceA: "=",
        choiceB: "-",
        choiceC: "*",
        choiceD: "$",
        correctAnswer: "a",
    },

];

var questionIndex = quizQuestions.length;
var currentQuestionEl = 0;
var timeLeft = 60;
var timeInterval;
var score = 0;
var correct;
//display questions with options
function generateQuiz() {
gameFinished.style.display = "none";
if (currentQuestionEl === questionIndex) {
    return endScore();
}
var currentQuestion = quizQuestions[currentQuestionEl];
quizQuesEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
aBtn.innerHTML = currentQuestion.choiceA;
bBtn.innerHTML = currentQuestion.choiceB;
cBtn.innerHTML = currentQuestion.choiceC;
dBtn.innerHTML = currentQuestion.choiceD;
 }
 //creating the timer interval so that the time counts down
 function startQuiz() {
     
     gameFinished.style.display = "none";
     startQuizEl.style.display = "none";
     endbtnEl.style.display = "none";
     highscoreEl.style,display = "none";
     generateQuiz();

     timeInterval = setInterval(function() {
         timeLeft--;
         quizTimer.textContent = "Time left: " + timeLeft;
         if(timeLeft === 0) {
             clearInterval(timeInterval);
             endScore();
         }
     }, 1000);
    quizBody.style.display = "block";
 }
 //will check if answer if correct or wrong. If wrong it will deduct 10 seconds and move on, if right, it will move on
 function answerCheck(answer) {
     correct = quizQuestions[currentQuestionEl].correctAnswer;
     if (answer === correct && currentQuestionEl !== questionIndex) {
         score++
         alert("That is correct!");
         currentQuestionEl++;
         generateQuiz();
     } else if (
         answer !== correct && currentQuestionEl !== questionIndex)
     {
         alert("That is incorrect!");
         currentQuestionEl++;
         timeLeft -= 10;
         generateQuiz();

     }
 }
 //once submit button is clicked, it will run the function to display high scores. This is also for storing it in the local storage
 submitscoreBtn.addEventListener("click", function highscores() {
     if (highInitials.value === "") {
         alert("Must enter Name!");
         return false;
     } else {
         var savedHighScores = 
         JSON.parse(localStorage.getItem("savedHighScores")) || [];
         var currentUser = highInitials.value.trim();
         var currentHighscore = {
             name: currentUser,
             score: score,
         };
         gameFinished.style.display = "none";
         highscoreEl.style.display = "flex";
         highscorePageEl.style.display = "block";
         endbtnEl.style.display = "flex";

         savedHighScores.push(currentHighscore);
         localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
         highscoresPg();
     }
 });
 // this will actually display the highscore page
 function highscoresPg() {
highscoreInitialsEl.innerHTML= "";
highScoreScoreEl.innerHTML= "";
var scoreshigh = JSON.parse(localStorage.getItem("savedHighScores")) || [];
for (i = 0; i < scoreshigh.length; i++) {
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = scoreshigh[i].name;
    newScore.textContent = scoreshigh[i].score;
    highscoreInitialsEl.appendChild(newName);
    highScoreScoreEl.appendChild(newScore);
}
 }
function displayHighscore() {
    startQuizEl.style.display = "none";
    quizBody.style.display = "none";
    gameFinished.style.display = "none";
    highscoreEl.style.display = "flex";
    highscorePageEl.style.display = "block";
    endbtnEl.style.display= "flex";
    highscoresPg();
}
function clearScore() {
    window.localStorage.clear();
    highscoreInitialsEl.textContent = "";
    highScoreScoreEl.textContent = "";
}
function replayQuiz(){
    highscoreEl.style.display = "none";
    gameFinished.style.display = "none";
    startQuizEl.style.display = "block";
    timeLeft=60;
    score = 0;
    currentQuestionEl = 0;
}


 function endScore() {
     startQuizEl.style.display = "none";
     quizBody.style.display = "none";
     gameFinished.style.display = "block";
     clearInterval(timeInterval);
     highInitials.value= "";
     finalScoreEl.textContent = "You finished with a " + score + " out of " + quizQuestions.length + " !"
     finalScoreEl.setAttribute("style", "padding-bottom: 50px; font-size: xx-large; font-weight: bold;");
 }
startQuizBtn.addEventListener("click", startQuiz);