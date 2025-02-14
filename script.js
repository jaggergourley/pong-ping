const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";

let pong = {
  height: 10,
  width: 10,
  x: 400,
  y: 400,
  dx: 5,
  dy: 0,
};

let paddleLeft = {
  height: 50,
  width: 10,
  x: 10,
  y: 400,
  dy: 10,
};

let paddleRight = {
  height: 50,
  width: 10,
  x: 780,
  y: 400,
  dy: 10,
};

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillRect(pong.x, pong.y, pong.width, pong.height);
  function updatePong() {
    if (pong.x + 5 >= 800 || pong.x - 5 <= 0) {
      pong.dx *= -1;
    }
    pong.x += pong.dx;
    ctx.fillRect(pong.x, pong.y, 10, 10);
  }
  ctx.fillRect(paddleLeft.x, paddleLeft.y, 10, 50);
  function moveLeftPaddle() {}
  ctx.fillRect(paddleRight.x, paddleRight.y, 10, 50);
  function moveRightPaddle() {}
  updatePong();
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
