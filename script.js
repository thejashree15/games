const canvas =
  document.getElementById("gameBoard");

const ctx =
  canvas.getContext("2d");

const scoreElement =
  document.getElementById("score");

const highScoreElement =
  document.getElementById("highScore");

const pauseBtn =
  document.getElementById("pauseBtn");

const resetBtn =
  document.getElementById("resetBtn");

const box = 20;

const canvasSize = 400;

let snake = [
  { x: 200, y: 200 }
];

let direction = "RIGHT";

let food = randomFood();

let score = 0;

let highScore =
  localStorage.getItem("snakeHighScore") || 0;

highScoreElement.innerText = highScore;

let isPaused = false;

function randomFood() {

  return {
    x:
      Math.floor(Math.random() * 20) * box,

    y:
      Math.floor(Math.random() * 20) * box
  };
}

function drawBackground() {

  ctx.fillStyle = "black";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function drawSnake() {

  snake.forEach((part, index) => {

    if(index === 0) {

      ctx.fillStyle = "#00FFAA";
    }

    else {

      ctx.fillStyle = "#00CC88";
    }

    ctx.shadowColor = "#00FFAA";
    ctx.shadowBlur = 10;

    ctx.fillRect(
      part.x,
      part.y,
      box,
      box
    );

    ctx.strokeStyle = "#111";

    ctx.strokeRect(
      part.x,
      part.y,
      box,
      box
    );
  });

  ctx.shadowBlur = 0;
}

function drawFood() {

  ctx.fillStyle = "red";

  ctx.shadowColor = "red";
  ctx.shadowBlur = 15;

  ctx.fillRect(
    food.x,
    food.y,
    box,
    box
  );

  ctx.shadowBlur = 0;
}

function moveSnake() {

  let headX = snake[0].x;
  let headY = snake[0].y;

  if(direction === "LEFT") {
    headX -= box;
  }

  if(direction === "RIGHT") {
    headX += box;
  }

  if(direction === "UP") {
    headY -= box;
  }

  if(direction === "DOWN") {
    headY += box;
  }

  const newHead = {
    x: headX,
    y: headY
  };

  if(
    headX === food.x &&
    headY === food.y
  ) {

    score++;

    updateScore();

    food = randomFood();
  }

  else {

    snake.pop();
  }

  snake.unshift(newHead);

  checkCollision();
}

function checkCollision() {

  const head = snake[0];

  if(
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize ||
    head.y >= canvasSize
  ) {

    gameOver();
  }

  for(let i = 1; i < snake.length; i++) {

    if(
      head.x === snake[i].x &&
      head.y === snake[i].y
    ) {

      gameOver();
    }
  }
}

function gameOver() {

  if(score > highScore) {

    highScore = score;

    localStorage.setItem(
      "snakeHighScore",
      highScore
    );
  }

  alert("Game Over!");

  resetGame();
}

function updateScore() {

  scoreElement.innerText = score;

  highScoreElement.innerText =
    highScore;
}

function resetGame() {

  snake = [
    { x: 200, y: 200 }
  ];

  direction = "RIGHT";

  food = randomFood();

  score = 0;

  updateScore();
}

document.addEventListener(
  "keydown",
  changeDirection
);

function changeDirection(event) {

  if(event.key === "ArrowLeft" &&
    direction !== "RIGHT") {

    direction = "LEFT";
  }

  else if(
    event.key === "ArrowUp" &&
    direction !== "DOWN"
  ) {

    direction = "UP";
  }

  else if(
    event.key === "ArrowRight" &&
    direction !== "LEFT"
  ) {

    direction = "RIGHT";
  }

  else if(
    event.key === "ArrowDown" &&
    direction !== "UP"
  ) {

    direction = "DOWN";
  }
}

pauseBtn.addEventListener(
  "click",
  () => {

    isPaused = !isPaused;

    pauseBtn.innerText =
      isPaused ? "Resume" : "Pause";
  }
);

resetBtn.addEventListener(
  "click",
  () => {

    resetGame();
  }
);

function drawGame() {

  if(isPaused) return;

  drawBackground();

  drawFood();

  moveSnake();

  drawSnake();
}

setInterval(drawGame, 100
    
);

updateScore();