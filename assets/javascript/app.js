// Global vars
//correct answer array
var allAnswers = [3, 3, 2, 4, 4, 3, 1, 4, 4, 1, 3, 2, 1, 2, 1];
//user answer array
var userAnswers = [];
//user correct answer num
var userCorrect = 0;
//user incorrect answer num
var userIncorrect = 0;
//user incorrect answer only array
var incorrectAnswerArray = [];
//timer vars
var clockRunning = false;
var time = 200;
var intervalId;

function start() {
  if (!clockRunning) {
    intervalId = setInterval(countdown, 1000);
    clockRunning = true;
  }
}

function countdown() {
  time--;
  $("#timer").html("<h3>" + time + " seconds left" + "</h3>");
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}

// Display timer and start timer button

// When start button is clicked, countdown starts and questions and submit button are displayed

// game ends when submit button is pressed or timer runs out
// When game ends, hide questions and submit button and display # of correct and incorrect answers
// also display which questions were answered incorrectly, along with their answer and the correct answer
