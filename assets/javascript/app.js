// Global vars
//correct answer array
var allAnswers = [3, 4, 2, 4, 4, 3, 1, 4, 4, 1, 3, 2, 1, 2, 1];
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
var time = 120;
var intervalId;
var submit = false;
var allQuestions = [
  {
    question: "What is The Dude's favorite drink?",
    choices: ["Gin and Tonic", "Black Tooth Grin", "White Russian", "Wine Spritzer"],
    correctChoice: 2
  },
  {
    question:
      "After one of the thugs inspects his bowling ball, asking what it is, the Dude states, 'Obviously, you are not a ______.'",
    choices: ["Bowler", "Plumber", "Electrician", "Golfer"],
    correctChoice: 3
  },
  {
    question: "What famous musician portrays one of the Nihilists?",
    choices: ["Moby", "Flea", "Madonna", "Cher"],
    correctChoice: 1
  },
  {
    question: "What does bowling have that 'Nam does not?",
    choices: ["Beer", "Judaism", "Dogs", "Rules"],
    correctChoice: 3
  },
  {
    question: "What band does The Dude hate?",
    choices: ["Creedence Clearwater Revival", "The Beatles", "Metallica", "The Eagles"],
    correctChoice: 3
  },
  {
    question: "What's inside the briefcase that Walter throws to the nihilists?",
    choices: ["Phone books", "Fake money", "Dirty undies", "Newspaper"],
    correctChoice: 2
  },
  {
    question: "'Sometimes you eat the ____, and sometimes the ____ eats you.'",
    choices: ["Bar", "Bear", "World", "Ball"],
    correctChoice: 0
  },
  {
    question: "At the end of the movie, what drink does the mysterious stranger order?",
    choices: ["Phosphate", "Milkshake", "Beer", "Sarsaparilla"],
    correctChoice: 3
  },
  {
    question: "What is the name of the movie The Dude hallucinates himself in?",
    choices: ["Logjammin'", "The Dude and The Dudette", "The Plumber and The Viking Queen", "Gutterballs"],
    correctChoice: 3
  },
  {
    question: "The Big Lebowski sponsers a group of youths called the 'Little Lebowski ______ _______.'",
    choices: ["Urban Achievers", "Suburban Achievers", "Rural Achievers", "Urban Go-Getters"],
    correctChoice: 0
  },
  {
    question: "What is the name of the Big Lebowski's butler?",
    choices: ["Burt", "Brett", "Brandt", "Bart"],
    correctChoice: 2
  },
  {
    question: "What band's tapes did The Dude lose when his car was stolen?",
    choices: ["The Eagles", "Creedence Clearwater Revival", "Bob Dylan", "The Byrds"],
    correctChoice: 1
  },
  {
    question: "What chain store card serves as The Dude's only form of ID?",
    choices: ["Ralph's", "Roses", "Food Lion", "Harris Teeter"],
    correctChoice: 0
  },
  {
    question: " What kind of dog does Walter think he's babysitting for his ex?",
    choices: ["Schnauzer", "Chihuahua", "Pomeranian", "Labradoodle"],
    correctChoice: 2
  },
  {
    question: "What is the name of the Nihilist's electro-pop band?",
    choices: ["Autobahn", "Kraftwerk", "The Nihilists", "Nagelbett"],
    correctChoice: 0
  }
];

function start() {
  if (!clockRunning) {
    intervalId = setInterval(countdown, 1000);
    clockRunning = true;
    displayQuestions();
  }
}

function countdown() {
  time--;
  $("#timer").html("<h3>" + time + " seconds left" + "</h3>");
  if (time < 1) {
    $("#qBody").hide();
    alert("You ran out of time!");
    endGame();
    $("#endGame").show();
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}

function displayQuestions() {
  for (i = allQuestions.length - 1; i > -1; i--) {
    var q = allQuestions[i].question;
    var choices = allQuestions[i].choices;
    var newQDiv = $("<div>").attr("class", "question" + i);
    newQDiv = $("<div>").attr("class", "ques");
    newQDiv.text(q);
    for (r = 0; r < 4; r++) {
      var newFormDiv = $("<div>").attr("class", "form-check");
      var newRadInput = $("<input>").attr("id", "radio" + r);
      var newLabel = $("<label>").attr("for", "radio" + r);
      newRadInput.attr("class", "form-check-input");
      newRadInput.attr("type", "radio");
      newRadInput.attr("name", "exampleRad" + i);
      newRadInput.attr("value", r);
      newFormDiv.append(newRadInput);
      newLabel.attr("class", "form-check-label");
      newLabel.text(choices[r]);
      newFormDiv.append(newLabel);
      newQDiv.append(newFormDiv);
    }
    $("#qBody").prepend("<br>");
    $("#qBody").prepend(newQDiv);
  }
  var submitBtn = $("<button>")
    .attr("type", "submit")
    .addClass("btn btn-primary mb-2")
    .attr("id", "submitButton")
    .text("Submit");
  $("#qBody").append(submitBtn);
}

// Display timer and start timer button
$("#timer").html("<h3>" + time + " seconds left" + "</h3>");
$("#qBody").hide();
$("#endGame").hide();

// When start button is clicked, countdown starts and questions and submit button are displayed
$("#startTimerButton").on("click", function() {
  $("#startTimerButton").hide();
  $("#qBody").show();
  start();
});

//compare user answers and correct answers
$("#qBody").on("click", "#submitButton", function() {
  submit = true;
  endGame();
  $("#endGame").show();
});
// game ends when submit button is pressed or timer runs out
// When game ends, hide questions and submit button and display # of correct and incorrect answers
function endGame() {
  stop();
  $("#qBody").hide();
  $(".ques").each(function(qNum) {
    var chosen = $("input[name=exampleRad" + qNum + "]:checked").val();
    userAnswers.push(chosen);
    if (chosen == allQuestions[qNum].correctChoice) {
      userCorrect++;
    } else {
      userIncorrect++;
      incorrectAnswerArray.push(allQuestions[qNum]);
    }
  });
  var score = userCorrect + "/" + allQuestions.length;
  $("#endGame").html("<h2>" + "Your Score: " + score + "</h2>");
  showCorrectedAnswers();
  var tryAgainBtn = $("<button>")
    .addClass("btn btn-primary mb-2")
    .text("Try Again")
    .attr("type", "button")
    .attr("id", "tryAgain");
  $("#endGame").append(tryAgainBtn);
}

$("#endGame").on("click", "#tryAgain", function() {
  userAnswers = [];
  userCorrect = 0;
  userIncorrect = 0;
  incorrectAnswerArray = [];
  clockRunning = false;
  time = 120;
  submit = false;
  $("#endGame")
    .empty()
    .hide();
  $("#qBody").empty();
  $("#startTimerButton").show();
  $("#timer").html("<h3>" + time + " seconds left" + "</h3>");
});

// also display which questions were answered incorrectly, along with their answer and the correct answer
function showCorrectedAnswers() {
  var correctedAnswersDiv = $("<div>").attr("id", "correctedAnswers");
  incorrectAnswerArray.forEach((item, index) => {
    var newCorrectedAnswer = $("<div>").attr("id", "answer" + index);
    var yourAnswer,
      correctAnswer = item.choices[item.correctChoice];
    allQuestions.forEach((question, id) => {
      if (question.question === item.question) {
        yourAnswer = item.choices[userAnswers[id]];
      }
    });
    var rightAnswerDiv = $("<div>").addClass("rightAnswer");
    var correctSymbol = $("<span>")
      .addClass("fas fa-check")
      .attr("style", "color:lime");
    $(rightAnswerDiv).append(correctSymbol, " ", correctAnswer);
    var wrongAnswerDiv = $("<div>").addClass("wrongAnswer");
    var wrongSymbol = $("<span>")
      .addClass("fas fa-times")
      .attr("style", "color:red");
    $(wrongAnswerDiv).append(wrongSymbol, " ", yourAnswer);

    $(newCorrectedAnswer).append("<p><strong>" + item.question + "</strong></p>");
    $(newCorrectedAnswer).append(wrongAnswerDiv);
    $(newCorrectedAnswer).append(rightAnswerDiv, "<br>");
    $(correctedAnswersDiv).append(newCorrectedAnswer);
  });
  $("#endGame").append(correctedAnswersDiv);
}
