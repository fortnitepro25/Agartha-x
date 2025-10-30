document.addEventListener("DOMContentLoaded", () => {
  const number = document.getElementById("visitor-count");
  if (number && !number.querySelector(".visitor-number-inner")) {
    const text = number.textContent.trim();
    number.textContent = ""; // clear original

    const inner = document.createElement("span");
    inner.className = "visitor-number-inner";

    inner.innerHTML = `<span>${text}</span><span>${text}</span>`;

    number.appendChild(inner);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('hof-stars');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const starsCount = 50;
  const stars = [];

  function resize() {
    const wrapper = document.getElementById('hof-title-wrapper');
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 2.5,
        blinkSpeed: 0.01 + Math.random() * 0.02,
        opacity: Math.random(),
        opacityDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.opacity += star.blinkSpeed * star.opacityDir;
      if (star.opacity >= 1) {
        star.opacity = 1;
        star.opacityDir = -1;
      } else if (star.opacity <= 0) {
        star.opacity = 0;
        star.opacityDir = 1;
      }
      // STAR COLOR
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    initStars();
    animate();
  }

  window.addEventListener('resize', () => {
    resize();
    initStars();
  });

  init();
});
