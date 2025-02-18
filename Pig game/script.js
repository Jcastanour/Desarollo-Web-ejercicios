let score = [0, 0]; //Global score
let roundScore = 0; //round score
let current = 0; //current player  (0 or 1)
let dice;
let gameRunning = true;
let animation = 0;

document.querySelector(".score-0").textContent = score[0];
document.querySelector(".score-1").textContent = score[1];
document.querySelector(".current-0").textContent = "0";
document.querySelector(".current-1").textContent = "0";

document.getElementById("rotate").onclick = function () {
  //roll the dice
  dice = Math.floor(Math.random() * 6 + 1);

  if (gameRunning) {
    //get value of dice
    document.querySelector("#dice-img").src = "assets/dice-" + dice + ".JPG";

    //This is just for cool effects
    if (animation === 0) {
      document.querySelector("#dice-img").classList.add("tada");
      document.querySelector("#dice-img").classList.remove("shake");
      animation = 1;
    } else {
      document.querySelector("#dice-img").classList.remove("tada");
      document.querySelector("#dice-img").classList.add("shake");
      animation = 0;
    }

    //YOUR CODE HERE

    //Here are the rules of pig game
    //1. User rolls the dice
    //2. If value is different from 1, User can roll again and obtain a bigger accumulated value in his round score

    console.log(dice);
    console.log(roundScore);
    console.log(current);
    console.log(score);
    roundScore += dice;
    lost();

    document.querySelector(".current-" + current).textContent = roundScore;

    //or he could decided to hold and end turn
    //3. If value is one, user lost his accumulated value and his turn.
    //hint: toggle seems cool, don't you think? Only applies if user lost turn
    //hint # 2: Current user is either 0 or 1
  }
};

document.getElementById("hold").onclick = function () {
  if (gameRunning) {
    score[current] += roundScore;
    roundScore = 0;
    document.querySelector(".score-0").textContent = score[0];
    document.querySelector(".score-1").textContent = score[1];
    document.querySelector(".current-" + current).textContent = roundScore;
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
    victory();

    current = 1 - current;
  }
  //Your code here
  //As long as the game is running, the score of the CURRENT USER should be accumulated if the usert holds
  //this value should be visible in his score
  //current user wins if his/her/their score is equal or more than 100. Afther this, game should be stopped
};

document.querySelector("#new").addEventListener("click", game);

function lost() {
  if (dice === 1) {
    roundScore = 0;
    document.querySelector(".current-" + current).textContent = roundScore;
    current = 1 - current;
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
  }
}

function victory() {
  if (score[current] >= 100) {
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
    document.querySelector(
      "#roll"
    ).innerHTML = `<i class="fas fa-trophy"></i> ¡El ganador es Player ${
      current + 1
    }!`;
    document.querySelector("#hold").style.display = "none";
    document.querySelector("#rotate").style.display = "none";
    console.log(document.querySelector("#dice-img"));
    document.querySelector("#dice-img").style.visibility = "hidden";
    document.querySelector("#pl-" + current).innerHTML =
      "<h2 id='pl-" +
      current +
      "'>PLAYER " +
      (current + 1) +
      " " +
      "<i class='fas fa-trophy'>" +
      "</i></h2>";

    gameRunning = false;
  }
}

function game() {
  score = [0, 0];
  roundScore = 0;
  current = 0;
  gameRunning = true;

  document.querySelector(".score-0").textContent = "0";
  document.querySelector(".score-1").textContent = "0";
  document.querySelector(".current-0").textContent = "0";
  document.querySelector(".current-1").textContent = "0";
  document.querySelector("#hold").style.display = "block";
  document.querySelector("#rotate").style.display = "block";
  document.querySelector("#dice-img").style.visibility = "visible";
  document.querySelector(
    "#roll"
  ).innerHTML = `<i class="fas fa-dice r-icon"></i> Girar dado`;

  document.querySelector("#pl-0").innerHTML =
    "<h2 id='pl-0'>PLAYER 1 " + "<i class='fas fa-cicle'>" + "</i></h2>";
  document.querySelector("#pl-1").innerHTML =
    "<h2 id='pl-1'>PLAYER 2 " + "<i class='fas fa-cicle'>" + "</i></h2>";
}
