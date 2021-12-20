var startQuizBtn = document.getElementById("startBtn");
var startQuizEl = document.getElementById("frontPage");
var quizBody = document.getElementById("codeQuiz");
var quizTimer = document.getElementById("timer");
var quizQuesEl = document.getElementById("quizQues");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var cBtn = document.getElementById("c");
var dBtn = document.getElementById("d");
var results = document.getElementById("finalResult");
var gameFinished = document.getElementById("gameFinish");
var finalScoreEl = document.getElementById("finalScore");
var highInitials = document.getElementById("initials");
// var submitBtn = document.addEventListener("submitScore");

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
 function startQuiz() {
     
     gameFinished.style.display = "none";
     startQuizEl.style.display = "none";
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








































































































































startQuizBtn.addEventListener("click", startQuiz);