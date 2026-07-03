const loginForm = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "1234") {
    localStorage.setItem("user", username);

    if (!localStorage.getItem("cards")) {
      const defaultCards = [
        {
          question: "What does HTML stand for?",
          answer: "HyperText Markup Language"
        },
        {
          question: "What does CSS stand for?",
          answer: "Cascading Style Sheets"
        },
        {
          question: "What does JS stand for?",
          answer: "JavaScript"
        }
      ];

      localStorage.setItem("cards", JSON.stringify(defaultCards));
    }

    if (!localStorage.getItem("quizAttempts")) {
      localStorage.setItem("quizAttempts", "0");
    }

    if (!localStorage.getItem("bestScore")) {
      localStorage.setItem("bestScore", "0");
    }

    window.location.href = "dashboard.html";
  } else {
    errorEl.textContent = "Invalid username or password";
  }
});
