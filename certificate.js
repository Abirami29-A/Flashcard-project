const username = localStorage.getItem("user") || "Student";
const scoreValue = Number(localStorage.getItem("score")) || 0;
const totalQuestions = Number(localStorage.getItem("totalQuestions")) || 0;

document.getElementById("certificateName").textContent = username;
document.getElementById("certificateScore").textContent = `Final Quiz Score: ${scoreValue} / ${totalQuestions}`;
