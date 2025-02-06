function draw() {
  const canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
  }
}
window.addEventListener("load", draw);
