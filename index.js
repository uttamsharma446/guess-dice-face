var randomNumber;
var score = 0;
var count = 5;
const msg = document.querySelector(".msg");
const selectedNumber = document.querySelector(".selectedNumber");
const dice = document.getElementById("dice");
const countElement = document.querySelector(".count");
const timerElement = document.querySelector(".timer");
var diceClicked = false;
var timer;
var title = document.querySelector("h1");
(function () {
  document.querySelector("h1").classList.add("show");
})();

document.addEventListener("click", (e) => {
  const isDiceCliced = e.target.matches("[data-dice]");
  if (isDiceCliced && !diceClicked) {
    diceClicked = true;
    title.classList.remove("show");
    title.classList.add("hide");
    document.querySelector(".loading").classList.add("show");
    randomNumber = getRandomInt(1, 6);
    setTimeout(() => {
      document.querySelector(".loading").classList.remove("show");
      timerElement.classList.add("show");
      setTimer();

      changeDiceFace(randomNumber);
    }, 4000);
  }
});

document.querySelectorAll(".number-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest("[data-btn]");

    clickedBtn.classList.toggle("active");
    setTimeout(() => {
      clickedBtn.classList.remove("active");
    }, 500);
    clearInterval(timer);
    count = 5;

    const selectedId = clickedBtn.getAttribute("id");
    selectedNumber.innerHTML = selectedId.replace("btn-", "");
    if (selectedId.replace("btn-", "") == randomNumber) {
      showMsg("You was right!!");
      score += randomNumber;
      document.querySelector(".score").innerHTML = score;
      randomNumber = getRandomInt(1, 6);

      setTimeout(() => {
        changeDiceFace(randomNumber);
        setTimer();
      }, 1000);
    } else {
      showMsg("You was wrong!!");

      randomNumber = getRandomInt(1, 6);
      setTimeout(() => {
        changeDiceFace(randomNumber);
        setTimer();
      }, 1000);
    }
  });
});

function showMsg(message) {
  msg.classList.add("show");
  msg.innerHTML = message;
  setTimeout(() => {
    msg.classList.remove("show");
    msg.innerHTML = "";
  }, 2000);
}
function changeDiceFace(number) {
  let dice = document.getElementById("dice");
  dice.src = `Images/${number}.png`;
  dice.classList.add("changed");

  setTimeout(() => {
    dice.classList.remove("changed");
  }, 500);
}

function setTimer() {
  timer = setInterval(() => {
    countElement.innerHTML = count;
    count = count - 1;
    console.log(count);
    if (count === -1) {
      const rn = getRandomInt(1, 6);
      clearInterval(timer);
      count = 5;
      changeDiceFace(rn);
      setTimer();
    }
  }, 1000);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
