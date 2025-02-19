const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const keys = {};

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

ctx.fillStyle = "white";
ctx.font = "50px 'PongScore', san-serif";
ctx.textAlign = "center";

let pong = {
  height: 10,
  width: 10,
  x: HEIGHT / 2 - 5,
  y: WIDTH / 2 - 5,
  dx: 5,
  dy: Math.random() * 10 - 5,
};

let paddleLeft = {
  height: 50,
  width: 10,
  x: 10,
  y: HEIGHT / 2 - 25,
  dy: 10,
  score: 0,
};

let paddleRight = {
  height: 50,
  width: 10,
  x: 780,
  y: HEIGHT / 2 - 25,
  dy: 10,
  score: 0,
};

function update() {
  pong.x += pong.dx;
  pong.y += pong.dy;

  if (keys["w"] && paddleLeft.y > 0) paddleLeft.y -= paddleLeft.dy;
  if (keys["s"] && paddleLeft.y + paddleLeft.height < HEIGHT)
    paddleLeft.y += paddleLeft.dy;
  if (keys["ArrowUp"] && paddleRight.y > 0) paddleRight.y -= paddleRight.dy;
  if (keys["ArrowDown"] && paddleRight.y + paddleRight.height < HEIGHT)
    paddleRight.y += paddleRight.dy;
}

function collision() {
  // Top/bottom
  if (pong.y - pong.height <= 0 || pong.y + pong.height >= HEIGHT) {
    pong.dy *= -1;
  }

  // Right paddle
  if (
    pong.x + pong.width == WIDTH - paddleRight.width * 2 &&
    paddleRight.y <= pong.y &&
    pong.y <= paddleRight.y + paddleRight.height
  ) {
    pong.dx *= -1;
  }
  // Left paddle
  if (
    pong.x == paddleLeft.width * 2 &&
    paddleLeft.y <= pong.y &&
    pong.y <= paddleLeft.y + paddleLeft.height
  ) {
    pong.dx *= -1;
  }
}

function resetPong() {
  if (pong.x < 0) {
    pong.x = WIDTH / 2 - pong.width / 2;
    pong.y = HEIGHT / 2 - pong.height / 2;
    paddleRight.score += 1;
  }
  if (pong.x > WIDTH) {
    pong.x = WIDTH / 2 - pong.width / 2;
    pong.y = HEIGHT / 2 - pong.height / 2;
    paddleLeft.score += 1;
  }
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillRect(pong.x, pong.y, pong.width, pong.height);
  ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
  ctx.fillRect(
    paddleRight.x,
    paddleRight.y,
    paddleRight.width,
    paddleRight.height
  );
  ctx.fillText(paddleLeft.score, WIDTH / 4, 100);
  ctx.fillText(paddleRight.score, (3 * WIDTH) / 4, 100);
}

function gameLoop() {
  update();
  collision();
  resetPong();
  draw();
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
