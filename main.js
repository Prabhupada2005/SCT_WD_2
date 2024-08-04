let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapTimes = [];

const timer = document.getElementById("timer");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function startStopWatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(function () {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        displayTime(difference);
    }, 10);
}

function displayTime(time) {
    let hrs = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((time % (1000 * 60)) / 1000);
    let millisecs = Math.floor((time % 1000) / 10);

    hrs = (hrs < 10) ? "0" + hrs : hrs;
    mins = (mins < 10) ? "0" + mins : mins;
    secs = (secs < 10) ? "0" + secs : secs;
    millisecs = (millisecs < 10) ? "0" + millisecs : millisecs;

    timer.innerHTML = hrs + ":" + mins + ":" + secs + "." + millisecs;
}

function startStop() {
    if (!running) {
        startStopWatch();
        startStopBtn.innerHTML = "Pause";
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function resetWatch() {
    clearInterval(timerInterval);
    timer.innerHTML = "00:00:00.00";
    startStopBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    running = false;
    lapTimes = [];
    laps.innerHTML = "";
}

function recordLap() {
    if (running) {
        lapTimes.push(timer.innerHTML);
        const lapItem = document.createElement("li");
        lapItem.innerText = timer.innerHTML;
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", resetWatch);
lapBtn.addEventListener("click", recordLap);