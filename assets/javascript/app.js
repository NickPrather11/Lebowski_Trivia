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
var submit = false;

function start() {
  if (!clockRunning) {
    intervalId = setInterval(countdown, 1000);
    clockRunning = true;
    console.log(clockRunning);
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
//$("#qBody").hide();
$("#timer").html("<h3>" + time + " seconds left" + "</h3>");

// When start button is clicked, countdown starts and questions and submit button are displayed
$("#startTimerButton").on("click", function() {
  console.log("start");
  start();
  $("#startTimerButton").hide();
});

if (time < 1 || submit === true) {
  stop();
}

//compare user answers and correct answers

// game ends when submit button is pressed or timer runs out
// When game ends, hide questions and submit button and display # of correct and incorrect answers
function endGame() {
  $("#qBody").hide();
}
// also display which questions were answered incorrectly, along with their answer and the correct answer
