var randomNumber;
var score = 0;
var count = 5;
const msg = document.querySelector(".msg");
const selectedNumber = document.querySelector(".selectedNumber");
const dice = document.getElementById("dice");
const countElement = document.querySelector(".count");
const timerElement = document.querySelector(".timer");
const countDownElement = document.querySelector(".countdown");
const countDownTimer = document.querySelector(".countdown-timer");
var selectedId;
var diceClicked = false;
var timer;
var isNumberBtnClicked = false;
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
    countDownElement.style.display = "flex";
    const countDownInterval = setInterval(() => {
      countDownTimer.innerHTML = count;
      count = count - 1;
      if (count === -1) {
        countDownTimer.innerHTML = "Go!!";
      }
    }, [1000]);
    randomNumber = getRandomInt(1, 6);
    setTimeout(() => {
      clearInterval(countDownInterval);

      countDownElement.style.display = "none";
      document.querySelector(".loading").classList.remove("show");
      timerElement.classList.add("show");
      setTimer();

      changeDiceFace(randomNumber);
      count = 5;
    }, 7000);
  }
});

document.querySelectorAll(".number-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest("[data-btn]");
    isNumberBtnClicked = true;
    clickedBtn.classList.toggle("active");
    setTimeout(() => {
      clickedBtn.classList.remove("active");
    }, 500);

    selectedId = clickedBtn.getAttribute("id");
    selectedNumber.innerHTML = selectedId.replace("btn-", "");
  });
});

//to show messages like 'you was right'
function showMsg(message) {
  msg.classList.add("show");
  msg.innerHTML = message;
  setTimeout(() => {
    msg.classList.remove("show");
    msg.innerHTML = "";
  }, 1000);
}
// to change dice face provide a number as argument.
function changeDiceFace(number) {
  let dice = document.getElementById("dice");
  dice.src = `Images/${number}.png`;
  dice.classList.add("changed");

  setTimeout(() => {
    dice.classList.remove("changed");
  }, 500);
}

// to setTimer which will decrement from 5 to 1.
function setTimer() {
  timer = setInterval(() => {
    countElement.innerHTML = count;
    count = count - 1;

    if (!isNumberBtnClicked && count === -1) {
      const rn = getRandomInt(1, 6);
      clearInterval(timer);
      count = 5;
      changeDiceFace(rn);
      setTimer();
    }
    if (count == -1 && isNumberBtnClicked) {
      if (selectedId.replace("btn-", "") == randomNumber) {
        showMsg("You was right!!");
        const rn = getRandomInt(1, 6);
        randomNumber = rn;
        count = 5;

        score += 1;
        document.querySelector(".score").innerHTML = score;
        isNumberBtnClicked = false;
        clearInterval(timer);
        setTimeout(() => {
          selectedNumber.innerHTML = "";
          changeDiceFace(rn);
          setTimer();
        }, 1000);
      } else {
        showMsg("You was wrong!!");

        const rn = getRandomInt(1, 6);
        randomNumber = rn;
        clearInterval(timer);
        count = 5;
        isNumberBtnClicked = false;

        setTimeout(() => {
          selectedNumber.innerHTML = "";

          changeDiceFace(rn);
          setTimer();
        }, 800);
      }
    }
  }, 1000);
}

// this method is used to get random number from 1 to 6.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
