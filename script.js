let timeLeft = 25 * 60; // 25 minutes
let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let interval;
let distractionCount = 0;

startBtn.addEventListener("click", function () {

    if (interval) return; // prevent multiple timers

    interval = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerDisplay.textContent =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            alert("Focus session completed!");
        }

    }, 1000);
});
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        distractionCount++;
        document.getElementById("distractionCount").textContent = distractionCount;
    }
});
function updateScore() {
    let score = 100 - (distractionCount * 5);
    if (score < 0) score = 0;
    document.getElementById("score").textContent = score;
}

setInterval(updateScore, 1000);