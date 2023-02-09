let scoreElement = document.querySelector(".score");
let highscoreElem = document.querySelector(".high-score");
let gameBoard = document.querySelector(".game-board");
let controls = document.querySelectorAll(".controls i");
console.log(controls);
let intervalId;
let score = 0;
let highscore = localStorage.getItem("high-score");
highscoreElem.innerText = `High Score: ${highscore}`;

// food row and column position in our grid systeme
let foodX, foodY;
// snake head position fixed
let snakeX = 15,
  snakeY = 10,
  snakeBody = [];

// velocity to change snake directions;
let velocityX = 0,
  velocityY = 0;

// game over
let gameOver = false;
// food random position

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class ='food' style='grid-area: ${foodY}/${foodX}'></div>`;
  // updating snake head position based on current velocity
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPos();
    snakeBody.push([foodX, foodY]); // pushing snake food position to snake body array;
    score++;
    highscore = score >= highscore ? score : highscore;
    localStorage.setItem("high-score", highscore);
    scoreElement.innerText = `Score: ${score}`;
    highscoreElem.innerText = `High Score: ${highscore}`;
  }
  //  shifting forward the values of the elements in the snake body by one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; // setting first elem of snake body to current snake position

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    // adding a div for each part of the snake body.
    htmlMarkup += `<div class ='head' style='grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}'></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  // insert the htmlMarkup divs in game board
  gameBoard.innerHTML = htmlMarkup;
};

const handleGameOver = () => {
  // clearing the timer and reloading the game on gameOver
  clearInterval(intervalId);
  alert("Game Over! Press OK to Restart The Game");
  location.reload();
};

const changeFoodPos = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  // changing velocity based on key press
  if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
};
controls.forEach((key) => {
  key.addEventListener("click", () => {
    changeDirection({ key: key.dataset.key });
  });
});

document.addEventListener("keydown", changeDirection);

changeFoodPos();
intervalId = setInterval(initGame, 125);
