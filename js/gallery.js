document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".gallery-item");

  // Load saved favorites from localStorage
  const savedFavorites = JSON.parse(
    localStorage.getItem("galleryFavorites") || "[]"
  );

  // Apply saved highlights
  savedFavorites.forEach((id) => {
    const item = document.querySelector(`.gallery-item[data-id="${id}"]`);
    if (item) item.classList.add("favorited");
  });

  // Handle favorite button clicks
  items.forEach((item) => {
    const btn = item.querySelector(".fav-btn");
    const id = item.dataset.id;

    btn.addEventListener("click", () => {
      item.classList.toggle("favorited");

      let favs = JSON.parse(localStorage.getItem("galleryFavorites") || "[]");

      if (item.classList.contains("favorited")) {
        favs.push(id);
      } else {
        favs = favs.filter((f) => f !== id);
      }

      localStorage.setItem("galleryFavorites", JSON.stringify(favs));
    });
  });
});
