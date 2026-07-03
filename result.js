const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("totalQuestions")) || 0;

const scoreText = document.getElementById("scoreText");
const percentageText = document.getElementById("percentageText");

scoreText.textContent = `Your Score: ${score} / ${total}`;

const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
percentageText.textContent = `Percentage: ${percentage}%`;
