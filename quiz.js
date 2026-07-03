const questions = [

{
q: "HTML stands for?",
a: [
"HyperText Markup Language",
"Home Tool Markup Language",
"Hyper Transfer Markup Language",
"HighText Machine Language"
],
c: 0
},

{
q: "CSS stands for?",
a: [
"Creative Style Sheets",
"Cascading Style Sheets",
"Computer Style Sheets",
"Colorful Style Sheets"
],
c: 1
},

{
q: "Which language is used for web page interactivity?",
a: ["HTML","CSS","JavaScript","XML"],
c: 2
},

{
q: "Which tag is used for the largest heading in HTML?",
a: ["<h6>","<head>","<h1>","<p>"],
c: 2
},

{
q: "Which CSS property changes text color?",
a: ["font-style","background","color","text-align"],
c: 2
},

{
q: "Which HTML tag creates a hyperlink?",
a: ["<a>","<link>","<href>","<url>"],
c: 0
},

{
q: "Which symbol is used for IDs in CSS?",
a: [".","#","@","$"],
c: 1
},

{
q: "Which keyword declares a variable in JavaScript?",
a: ["var","int","string","define"],
c: 0
},

{
q: "Which method displays output in browser console?",
a: [
"console.log()",
"print()",
"document.write()",
"alert()"
],
c: 0
},

{
q: "Which HTML element is used for images?",
a: ["<img>","<picture>","<image>","<src>"],
c: 0
},

{
q: "What does JS stand for?",
a: [
"Java Source",
"JavaScript",
"Jumbo Script",
"JSON Script"
],
c: 1
},

{
q: "Which CSS property changes background color?",
a: [
"background-color",
"color",
"font-color",
"text-color"
],
c: 0
},

{
q: "Which HTML tag creates a paragraph?",
a: [
"<para>",
"<p>",
"<text>",
"<h1>"
],
c: 1
},

{
q: "Which operator is used for equality in JavaScript?",
a: [
"=",
"==",
"!=",
">"
],
c: 1
},

{
q: "Which method shows a popup alert?",
a: [
"prompt()",
"confirm()",
"alert()",
"log()"
],
c: 2
},

{
q: "Which property changes font size in CSS?",
a: [
"font-size",
"text-size",
"size",
"font-style"
],
c: 0
},

{
q: "Which HTML tag creates a button?",
a: [
"<button>",
"<input>",
"<submit>",
"<click>"
],
c: 0
},

{
q: "Which company developed JavaScript?",
a: [
"Microsoft",
"Google",
"Netscape",
"Apple"
],
c: 2
},

{
q: "Which HTML tag is used for lists?",
a: [
"<ul>",
"<list>",
"<li>",
"<ol>"
],
c: 0
},

{
q: "Which CSS property makes text bold?",
a: [
"font-weight",
"text-bold",
"bold",
"font-style"
],
c: 0
}

];

let current = 0;
let score = 0;
let selected = false;
let timeLeft = 60;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");

function loadQuestion() {
  selected = false;
  const currentQuestion = questions[current];
  questionEl.textContent = currentQuestion.q;
  optionsEl.innerHTML = "";

  currentQuestion.a.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = function () {
      checkAnswer(index, btn);
    };
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (selected) return;

  selected = true;
  const correctIndex = questions[current].c;
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((button, i) => {
    button.disabled = true;

    if (i === correctIndex) {
      button.classList.add("correct");
    }

    if (i === index && i !== correctIndex) {
      button.classList.add("wrong");
    }
  });

  if (index === correctIndex) {
    score++;
  }
}

function nextQuestion() {
  if (!selected) {
    alert("Please select an answer first");
    return;
  }

  current++;

  if (current >= questions.length) {
    finishQuiz();
  } else {
    loadQuestion();
  }
}

function finishQuiz() {
  localStorage.setItem("score", score);
  localStorage.setItem("totalQuestions", questions.length);

  let attempts = Number(localStorage.getItem("quizAttempts")) || 0;
  attempts++;
  localStorage.setItem("quizAttempts", attempts);

  let bestScore = Number(localStorage.getItem("bestScore")) || 0;
  if (score > bestScore) {
    localStorage.setItem("bestScore", score);
  }

  window.location.href = "result.html";
}

const timer = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    finishQuiz();
  }
}, 1000);

loadQuestion();
