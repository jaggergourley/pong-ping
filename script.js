const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const keys = {};

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
let isPaused = false;

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

ctx.fillStyle = "white";
ctx.font = "50px 'PongScore', san-serif";
ctx.textAlign = "center";

const virtualWidth = 800;
const virtualHeight = 600;

function resizeCanvas() {
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  let scale = Math.min(
    screenHeight / virtualHeight,
    screenWidth / virtualWidth
  );
  scale *= 0.98;
  console.log("scale:", scale);

  canvas.style.height = `${canvas.height * scale}px`;
  canvas.style.width = `${canvas.width * scale}px`;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let pong = {
  height: virtualWidth * 0.01,
  width: virtualWidth * 0.01,
  x: virtualHeight / 2 - (virtualWidth * 0.01) / 2,
  y: virtualWidth / 2 - (virtualWidth * 0.01) / 2,
  dx: -5,
  dy: Math.floor(Math.random() * 11) - 5,
};

let paddleLeft = {
  height: virtualHeight * 0.07,
  width: virtualWidth * 0.01,
  x: virtualWidth * 0.03,
  y: virtualHeight / 2 - (virtualHeight * 0.07) / 2,
  dy: 10,
  score: 0,
};

let paddleRight = {
  height: virtualHeight * 0.07,
  width: virtualWidth * 0.01,
  x: virtualWidth * 0.97 - virtualWidth * 0.01,
  y: virtualHeight / 2 - (virtualHeight * 0.07) / 2,
  dy: 10,
  score: 0,
};

function update() {
  if (!isPaused) {
    pong.x += pong.dx;
    pong.y += pong.dy;
  }

  if (keys["s"] && paddleLeft.y > 0) paddleLeft.y -= paddleLeft.dy;
  if (keys["x"] && paddleLeft.y + paddleLeft.height < virtualHeight)
    paddleLeft.y += paddleLeft.dy;
  if (keys["ArrowUp"] && paddleRight.y > 0) paddleRight.y -= paddleRight.dy;
  if (keys["ArrowDown"] && paddleRight.y + paddleRight.height < virtualHeight)
    paddleRight.y += paddleRight.dy;
}

function collision() {
  if (pong.x == paddleLeft.x) {
    console.log("left and pong x");
  }
  if (pong.x == paddleRight.x) {
    console.log("right and pong.x");
  }
  // Top/bottom
  if (pong.y <= 0 || pong.y + pong.height >= virtualHeight) {
    pong.dy *= -1;
  }

  // Right paddle
  if (
    pong.x + pong.width >= paddleRight.x &&
    pong.x + pong.width <= paddleRight.x + pong.width / 2 &&
    paddleRight.y <= pong.y + pong.height / 2 &&
    pong.y + pong.height / 2 <= paddleRight.y + paddleRight.height
  ) {
    pong.dx *= -1;
    pong.dy =
      ((pong.y + pong.height / 2 - (paddleRight.y + paddleRight.height / 2)) /
        (paddleRight.height / 2)) *
      5;
  }
  // Left paddle
  if (
    pong.x <= paddleLeft.x &&
    pong.x >= paddleLeft.x - pong.width / 2 &&
    paddleLeft.y <= pong.y + pong.height / 2 &&
    pong.y + pong.height / 2 <= paddleLeft.y + paddleLeft.height
  ) {
    pong.dx *= -1;
    pong.dy =
      ((pong.y + pong.height / 2 - (paddleLeft.y + paddleLeft.height / 2)) /
        (paddleLeft.height / 2)) *
      5;
  }
}

function pauseGame() {
  isPaused = true;
  setTimeout(() => {
    console.log("pause");
    isPaused = false;
  }, 1000);
}

function resetPong() {
  if (pong.x + pong.width / 2 <= 0) {
    pong.x = virtualWidth / 2 - pong.width / 2;
    pong.y = virtualHeight / 2 - pong.height / 2;
    paddleRight.score += 1;
    pauseGame();
  }
  if (pong.x + pong.width / 2 > virtualWidth) {
    pong.x = virtualWidth / 2 - pong.width / 2;
    pong.y = virtualHeight / 2 - pong.height / 2;
    paddleLeft.score += 1;
    pauseGame();
  }
}

function draw() {
  ctx.clearRect(0, 0, virtualWidth, virtualHeight);
  if (!isPaused) {
    ctx.fillRect(pong.x, pong.y, pong.width, pong.height);
  }
  ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
  ctx.fillRect(
    paddleRight.x,
    paddleRight.y,
    paddleRight.width,
    paddleRight.height
  );
  ctx.fillText(paddleLeft.score, virtualWidth / 4, 100);
  ctx.fillText(paddleRight.score, (3 * virtualWidth) / 4, 100);
}

function gameLoop() {
  update();
  collision();
  resetPong();
  draw();
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
