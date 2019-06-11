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
var time = 80;
var intervalId;
var submit = false;
var allQuestions = [
  {
    question: "What is The Dude's favorite drink?",
    choice1: "Gin and Tonic",
    choice2: "Black Tooth Grin",
    choice3: "White Russian",
    choice4: "Wine Spritzer",
    correctChoice: 3
  },
  {
    question:
      "After one of the thugs inspects his bowling ball, asking what it is, the Dude states, 'Obviously, you are not a ______.'",
    choice1: "Bowler",
    choice2: "Plumber",
    choice3: "Electrician",
    choice4: "Golfer",
    correctChoice: 4
  },
  {
    question: "What famous musician portrays one of the Nihilists?",
    choice1: "Moby",
    choice2: "Flea",
    choice3: "Madonna",
    choice4: "Cher",
    correctChoice: 2
  },
  {
    question: "What does bowling have that 'Nam does not?",
    choice1: "Beer",
    choice2: "Judaism",
    choice3: "Dogs",
    choice4: "Rules",
    correctChoice: 4
  },
  {
    question: "What band does The Dude hate?",
    choice1: "Creedence Clearwater Revival",
    choice2: "The Beatles",
    choice3: "Metallica",
    choice4: "The Eagles",
    correctChoice: 4
  },
  {
    question: "What's inside the briefcase that Walter throws to the nihilists?",
    choice1: "Phone books",
    choice2: "Fake money",
    choice3: "Dirty undies",
    choice4: "Newspaper",
    correctChoice: 3
  },
  {
    question: "'Sometimes you eat the ____, and sometimes the ____ eats you.'",
    choice1: "Bar",
    choice2: "Bear",
    choice3: "World",
    choice4: "Ball",
    correctChoice: 1
  },
  {
    question: "At the end of the movie, what drink does the mysterious stranger order?",
    choice1: "Phosphate",
    choice2: "Milkshake",
    choice3: "Beer",
    choice4: "Sarsaparilla",
    correctChoice: 4
  },
  {
    question: "What is the name of the movie The Dude hallucinates himself in?",
    choice1: "Logjammin'",
    choice2: "The Dude and The Dudette",
    choice3: "The Plumber and The Viking Queen",
    choice4: "Gutterballs",
    correctChoice: 4
  },
  {
    question: "The Big Lebowski sponsers a group of youths called the 'Little Lebowski ______ _______.'",
    choice1: "Urban Achievers",
    choice2: "Suburban Achievers",
    choice3: "Rural Achievers",
    choice4: "Urban Go-Getters",
    correctChoice: 1
  },
  {
    question: "What is the name of the Big Lebowski's butler?",
    choice1: "Burt",
    choice2: "Brett",
    choice3: "Brandt",
    choice4: "Bart",
    correctChoice: 3
  },
  {
    question: "What band's tapes did The Dude lose when his car was stolen?",
    choice1: "The Eagles",
    choice2: "Creedence Clearwater Revival",
    choice3: "Bob Dylan",
    choice4: "The Byrds",
    correctChoice: 2
  },
  {
    question: "What chain store card serves as The Dude's only form of ID?",
    choice1: "Ralph's",
    choice2: "Roses",
    choice3: "Food Lion",
    choice4: "Harris Teeter",
    correctChoice: 1
  },
  {
    question: " What kind of dog does Walter think he's babysitting for his ex?",
    choice1: "Schnauzer",
    choice2: "Chihuahua",
    choice3: "Pomeranian",
    choice4: "Labradoodle",
    correctChoice: 3
  },
  {
    question: "What is the name of the Nihilist's electro-pop band?",
    choice1: "Autobahn",
    choice2: "Kraftwerk",
    choice3: "The Nihilists",
    choice4: "Nagelbett",
    correctChoice: 1
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
    var choices = [allQuestions[i].choice1, allQuestions[i].choice2, allQuestions[i].choice3, allQuestions[i].choice4];
    var newQDiv = $("<div>").attr("class", "question" + i);
    newQDiv = $("<div>").attr("class", "ques");
    newQDiv.text(q);
    for (r = 1; r < 5; r++) {
      var newFormDiv = $("<div>").attr("class", "form-check");
      var newRadInput = $("<input>").attr("id", "radio" + r);
      var newLabel = $("<label>").attr("for", "radio" + r);
      newRadInput.attr("class", "form-check-input");
      newRadInput.attr("type", "radio");
      newRadInput.attr("name", "exampleRad" + i);
      newRadInput.attr("value", r);
      newFormDiv.append(newRadInput);
      newLabel.attr("class", "form-check-label");
      newLabel.text(choices[r - 1]);
      newFormDiv.append(newLabel);
      newQDiv.append(newFormDiv);
    }
    $("#qBody").prepend("<br>");
    $("#qBody").prepend(newQDiv);
  }
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
$("#submitButton").on("click", function() {
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
      //console.log("correct!");
      userCorrect++;
    } else {
      //console.log("incorrect");
      userIncorrect++;
      incorrectAnswerArray.push(allQuestions[qNum]);
    }
  });
  var score = userCorrect + "/" + allQuestions.length;
  $("#endGame").html("<h2>" + "Your Score: " + score + "</h2>");

  //console.log(incorrectAnswerArray);
}

// also display which questions were answered incorrectly, along with their answer and the correct answer
