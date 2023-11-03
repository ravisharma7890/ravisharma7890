const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is capital of India?",
    options: ["Gandhinagar", "Surat", "Dehli", "Goa"],
    answer: "Dehli",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "none of the above"],
    answer: "1995",
  },
];
const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

let currentQuestion = 0;
let score = 0;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  nextButton.style.display = "none";
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      document.getElementById("showresult").innerHTML = "Answer is Correct!";
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
      score++;
    } else {
      document.getElementById("showresult").innerHTML =
        "Answer is not correct.";
      // submitButton.style.display = "none";
      nextButton.style.display = "none";
    }
    // submitButton.disabled = true;
  }
}

function loadScore() {
  const totalScore = document.getElementById("score");
  totalScore.textContent = ` Your Quiz are Completed Your scored ${score} out of ${quizData.length}`;
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    displayQuestion();
    submitButton.disabled = false;
    nextButton.style.display = "none";
    document.getElementById("showresult").innerHTML = " ";
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    document.getElementById("quiz").remove()
        document.getElementById("showresult").remove()
        document.getElementById("submit").remove()
        loadScore();
    // document.getElementById("showresult").innerHTML =
    //   `Your Quiz are Completed Your Score is ` + score + "/3";
  }
}
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
displayQuestion();
