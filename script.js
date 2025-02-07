function draw() {
  const canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(400, 400, 10, 10);
    ctx.fillRect(10, 400, 10, 50);
    ctx.fillRect(780, 400, 10, 50);
  }
}
window.addEventListener("load", draw);
