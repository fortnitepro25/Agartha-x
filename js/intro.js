const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 400;
let speed = 3;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: numStars }, () => ({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width
  }));
}
resize();
window.onresize = resize;

function draw() {
  ctx.fillStyle = "#010114";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  for (let star of stars) {
    star.z -= speed;
    if (star.z <= 0) star.z = canvas.width;

    let k = 128.0 / star.z;
    let px = star.x * k + canvas.width / 2;
    let py = star.y * k + canvas.height / 2;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      let size = (1 - star.z / canvas.width) * 2;
      ctx.fillRect(px, py, size, size);
    }
  }
  requestAnimationFrame(draw);
}
draw();

// Buttons
document.getElementById("yesBtn").addEventListener("click", () => {
  document.body.style.transition = "opacity 0.8s";
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "hof.html"; // redirect to HOF
  }, 800);
});

document.getElementById("noBtn").addEventListener("click", () => {
  alert("Take your time! Passerby of Agartha-X.");
});

const bgMusic = document.getElementById('bg-music');
const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', () => {
  bgMusic.muted = false;
  bgMusic.play();
  playBtn.textContent = '▶ PLAYING...';
  playBtn.disabled = true;
});
