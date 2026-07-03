const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Welcome, ${user} 👋`;

const cards = JSON.parse(localStorage.getItem("cards")) || [];
const quizAttempts = Number(localStorage.getItem("quizAttempts")) || 0;
const bestScore = Number(localStorage.getItem("bestScore")) || 0;

document.getElementById("totalCards").textContent = cards.length;
document.getElementById("quizAttempts").textContent = quizAttempts;
document.getElementById("bestScore").textContent = bestScore;

const progress = Math.min((bestScore / 10) * 100, 100);
document.getElementById("progressFill").style.width = `${progress}%`;
document.getElementById("progressText").textContent = `${progress}% Completed`;

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀ Light";
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀ Light";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙 Dark";
  }
});
