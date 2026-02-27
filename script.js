document.addEventListener("DOMContentLoaded", function () {

// ======================
// VARIABLES (TOP)
// ======================

let totalTime = 10; // use 1500 for 25 mins later
let timeLeft = totalTime;

let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let heroStart = document.getElementById("heroStart");

let interval = null;
let distractionCount = 0;

let streak = localStorage.getItem("streak") || 0;
document.getElementById("streak").textContent = streak;

// ⭐ BEST SCORE SYSTEM
let bestScore = localStorage.getItem("bestScore") || 0;
document.getElementById("bestScore").textContent = bestScore;


// ======================
// HERO SCROLL BUTTON
// ======================

if (heroStart) {
    heroStart.addEventListener("click", function () {
        document.querySelector(".dashboard")
            .scrollIntoView({ behavior: "smooth" });
    });
}


// ======================
// START TIMER
// ======================

startBtn.addEventListener("click", function () {

    if (interval) return; // prevent multiple timers

    interval = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerDisplay.textContent =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        updateProgress();
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            interval = null;
            updateStreak();
            alert("Focus session completed!");
        }

    }, 1000);
});


// ======================
// DISTRACTION DETECTION
// ======================

document.addEventListener("visibilitychange", function () {
    if (document.hidden && interval) {
        distractionCount++;
        document.getElementById("distractionCount").textContent = distractionCount;
        updateScore();
        updateStatus();
    }
});


// ======================
// SCORE FUNCTION
// ======================

function updateScore() {
    let score = 100 - (distractionCount * 5);
    if (score < 0) score = 0;

    document.getElementById("score").textContent = score;

    // ⭐ UPDATE BEST SCORE
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScore").textContent = bestScore;
    }
}


// ======================
// STATUS FUNCTION
// ======================

function updateStatus() {
    if (distractionCount === 0) {
        document.getElementById("statusMessage").textContent = "Excellent focus 🔥";
    } else if (distractionCount < 3) {
        document.getElementById("statusMessage").textContent = "Stay focused 💪";
    } else {
        document.getElementById("statusMessage").textContent = "Too many distractions ⚠️";
    }
}


// ======================
// STREAK FUNCTION
// ======================

function updateStreak() {
    let today = new Date().toDateString();
    let lastDate = localStorage.getItem("lastDate");

    if (lastDate !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", today);
        document.getElementById("streak").textContent = streak;
    }
}


// ======================
// PROGRESS BAR
// ======================

function updateProgress() {
    let percent = (timeLeft / totalTime) * 100;
    let progressBar = document.getElementById("progress");

    progressBar.style.width = percent + "%";

    if (percent > 60) {
        progressBar.style.background = "#00ffcc";
    } else if (percent > 30) {
        progressBar.style.background = "#ffaa00";
    } else {
        progressBar.style.background = "#ff4d4d";
    }
}


// ======================
// THEME TOGGLE
// ======================

window.toggleTheme = function () {
    document.body.classList.toggle("dark-mode");
};


// ======================
// RESET FUNCTION
// ======================

window.resetSession = function () {

    clearInterval(interval);
    interval = null;

    timeLeft = totalTime;
    distractionCount = 0;

    document.getElementById("distractionCount").textContent = 0;

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    document.getElementById("timer").textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    document.getElementById("progress").style.width = "100%";

    updateScore();
    updateStatus();
};

});