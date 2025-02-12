const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
ctx.fillStyle = "white";

let pongX = 400;
let pongY = 400;
let pongDX = 5;

function draw() {
  //console.log("draw");
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillRect(pongX, pongY, 10, 10);
  function update() {
    //console.log("update");
    if (pongX + 3 == window.innerWidth + 5) {
      pongDX *= -1;
    }
    pongX += pongDX;
    ctx.fillRect(pongX, pongY, 10, 10);
  }
  ctx.fillRect(10, 400, 10, 50);
  ctx.fillRect(780, 400, 10, 50);
  update();
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

//arrow up key code -> 38
// down -> 40
// w -> 87
// s -> 83
