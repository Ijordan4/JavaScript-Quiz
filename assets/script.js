var quizQuestions = [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["var", "let", "const", "variable"],
      correctAnswer: "var"
    },
    {
      question: "What is the correct syntax for a JavaScript comment?",
      choices: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
      correctAnswer: "// This is a comment"
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      choices: ["string", "boolean", "number", "array"],
      correctAnswer: "array"
    },
    {
      question: "What is the output of the following code?\n\nconsole.log('Hello, ' + 'world!');",
      choices: ["Hello, ", "Hello, world!", "undefined", "NaN"],
      correctAnswer: "Hello, world!"
    },
    {
      question: "Which built-in method can be used to convert a string to uppercase letters?",
      choices: ["toUpperCase()", "toLowerCase()", "toUpperCasecase()", "toUppercase()"],
      correctAnswer: "toUpperCase()"
    }
  ];
  
  var currentQuestionIndex = 0;
  var time = 60;
  var timerInterval;
  var score = 0;
  
  function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    timerInterval = setInterval(function() {
      time--;
      document.getElementById("timer").textContent = "Time: " + time;
      if (time <= 0) {
        endQuiz();
      }
    }, 1000);
    showQuestion();
  }
  
  function showQuestion() {
    var choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
  
    var currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
  
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = currentQuestion.choices[i];
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", currentQuestion.choices[i]);
      choiceBtn.onclick = checkAnswer;
      choicesContainer.appendChild(choiceBtn);
    }
  }
  
  function checkAnswer() {
    if (this.value === quizQuestions[currentQuestionIndex].correctAnswer) {
      score++;
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      document.getElementById("timer").textContent = "Time: " + time;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("score").textContent = "Final Score: " + score;
    document.getElementById("initials-form").style.display = "block";
  }
  
  function saveScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value.trim();
    var scoreData = {
      initials: initials,
      score: score
    };
  
    localStorage.setItem("highScore", JSON.stringify(scoreData));
  }
  
  function resetQuiz() {
    currentQuestionIndex = 0;
    time = 60;
    score = 0;
    document.getElementById("score").textContent = "";
    document.getElementById("initials-form").style.display = "none";
    document.getElementById("reset-button").style.display = "none";
    startQuiz();
  }
  
  // Check if a high score exists in localStorage
  var highScoreData = localStorage.getItem("highScore");
  if (highScoreData !== null) {
    // Display the high score
    var highScore = JSON.parse(highScoreData);
    document.getElementById("high-score").textContent = "High Score: " + highScore.score + " by " + highScore.initials;
  }