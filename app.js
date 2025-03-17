const daysElements = document.querySelectorAll(".day");
const labelTimer = document.querySelector(".timerDisplay");
const timerBtn = document.querySelector(".timer-button");
const pauseBtn = document.querySelector(".pause-button");
const resetTimerBtn = document.querySelector(".reset-button");
const todayDate = document.querySelector(".todayDate");
const pomodoroCounter = document.querySelector(".pomodoro-counter");
const counterResetTotal = document.querySelector(".counter-button");

const hiddenBox = document.querySelector(".hidden-box");
const openIntro = document.querySelector(".open-btn");
const closeIntro = document.querySelector(".close-intro");

const closeModalBtn = document.querySelector(".close-modal");

// open side intro
openIntro.addEventListener("click", () => hiddenBox.classList.remove("hidden"));
closeIntro.addEventListener("click", () => hiddenBox.classList.add("hidden"));

// Highlight the current day
const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const weekday = new Date().getDay();
let currentDay = weekdays[weekday];
daysElements.forEach(function (d, i) {
  if (d.classList.contains(currentDay)) daysElements[i].style.opacity = 1;
});

// current date
const dayDate = new Date().getDate();
const month = new Date().getMonth() + 1;

function day() {
  todayDate.textContent = `${String(dayDate).padStart(2, 0)}/${String(
    month
  ).padStart(2, 0)}`;
}
day();

// TIMER
const alarm = new Audio(
  "/images/mixkit-rooster-crowing-in-the-morning-2462.wav"
);

let counterP = 0;
let totalP = +localStorage.getItem("totalps");
let timer;

const setTotalCounter = function () {
  pomodoroCounter.textContent = `${String(counterP).padStart(2, 0)}/${String(
    totalP
  ).padStart(2, 0)}`;
};
setTotalCounter();

let time = 60 * 25;

function pomodoroTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      alarm.play();
      clearInterval(timer);
      labelTimer.textContent = `Time UP `;
      counterP++;
      setTotalCounter();
    }

    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);

  pauseBtn.addEventListener("click", () => {
    console.log(labelTimer.textContent);
    clearInterval(timer);
    labelTimer.textContent = labelTimer.textContent;
  });

  return timer;
}

timerBtn.addEventListener("click", pomodoroTimer);

resetTimerBtn.addEventListener("click", function () {
  clearInterval(timer);
  time = 60 * 25;
  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(Math.trunc(time % 60)).padStart(2, 0);

  labelTimer.textContent = `${min}:${sec}`;
});

// total pomodoros
counterResetTotal.addEventListener("click", function () {
  totalP = 0;
  localStorage.setItem("totalps", totalP);
  setTotalCounter();
});

// TODO APP
const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector(".list-container");
const btnAdd = document.getElementById("button-add");
const inputNumber = document.querySelector(".input__number");

const addTask = function () {
  if (inputBox.value === "") console.log("empty");
  else {
    let li = document.createElement("li");
    li.innerHTML = `${inputBox.value} &xrarr; ${+inputNumber.value} pomodoros`;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
};

const saveNumber = function () {
  const amount = +inputNumber.value;
  console.log(amount);
  totalP = totalP + amount;
  pomodoroCounter.textContent = `${String(counterP).padStart(2, 0)}/${String(
    totalP
  ).padStart(2, 0)}`;
  localStorage.setItem("totalps", totalP);

  inputNumber.value = "";
};

btnAdd.addEventListener("click", () => {
  addTask();
  saveNumber();
  saveData();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
    saveNumber();
    saveData();
  }
});

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    const pToDelete = Number(
      e.target.parentElement.innerHTML.split("⟶ ")[1].slice(0, 2)
    );

    totalP = totalP - pToDelete;

    localStorage.setItem("totalps", totalP);
    localStorage.getItem("totalPs");
    setTotalCounter();
    saveData();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

// sava data
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// MODAL WINDOW
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

daysElements.forEach((day) => day.addEventListener("click", openModal));

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

closeModalBtn.addEventListener("click", closeModal);

// Change Hero Img

const hero_img = document.querySelector(".hero_img");

hero_img.addEventListener("click", function () {
  if (hero_img.src.endsWith("images/img_red.png")) {
    hero_img.src = "images/img_blue.png";
  } else if (hero_img.src.endsWith("images/img_blue.png")) {
    hero_img.src = "images/img_white.png";
  } else {
    hero_img.src = "images/img_red.png";
  }
});

// Change color palette
const body = document.body;
const colorBtns = document.querySelectorAll(".colorbtn");
const svgs = document.querySelectorAll(".svg");
const thirdBoxes = document.querySelectorAll(".border-box");
const pressBtns = document.querySelectorAll(".pressbtn");
let paletteIndex = 0;

// Colors array
const colorPalettes = [
  [{ background: "#ffffea", primary: "#ff0000" }],
  [{ background: "#ffffff", primary: "#0000ff" }],
  [{ background: "#424242", primary: "#ffffff" }],
];

// Start State
const init = function () {
  body.style.background = colorPalettes[paletteIndex][0].background;
  body.style.color = colorPalettes[paletteIndex][0].primary;
  modal.style.borderColor = colorPalettes[paletteIndex][0].primary;
  modal.style.background = colorPalettes[paletteIndex][0].background;
  hiddenBox.style.background = colorPalettes[paletteIndex][0].background;

  colorBtns.forEach((btn) => {
    btn.style.color = colorPalettes[paletteIndex][0].primary;
    btn.style.borderColor = colorPalettes[paletteIndex][0].primary;
    btn.style.background = colorPalettes[paletteIndex][0].background;
  });

  pressBtns.forEach((btn) => {
    btn.addEventListener(
      "mouseover",
      () => (
        (btn.style.color = colorPalettes[paletteIndex][0].background),
        (btn.style.background = colorPalettes[paletteIndex][0].primary)
      )
    );
    btn.addEventListener(
      "mouseout",
      () => (
        (btn.style.color = colorPalettes[paletteIndex][0].primary),
        (btn.style.background = colorPalettes[paletteIndex][0].background)
      )
    );
  });

  svgs.forEach((s) => {
    s.style.stroke = colorPalettes[paletteIndex][0].primary;
  });

  thirdBoxes.forEach(
    (box) => (box.style.borderColor = colorPalettes[paletteIndex][0].primary)
  );
};

// colorBtns.forEach((btn) =>
//   btn.addEventListener("mouseover", () => (btn.style.color = "black"))
// );

init();

const changePalette = () => {
  if (paletteIndex >= 2) {
    paletteIndex = 0;
  } else {
    paletteIndex++;
  }
  init();
};

hero_img.addEventListener("click", changePalette);
