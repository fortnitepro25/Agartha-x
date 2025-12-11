// Credits data
const credits = [
  {
    category: "Core Development",
    list: [
      "fortnitepro25 (Henkka) — Visionnaire - Lead designer",
      "JoMa888 (Jooa) — Co-Developer & Javascript specialist",
      "Ashtar — Galactic Supervisor (Honorary)",
    ],
  },
  {
    category: "Art & Styling",
    list: ["fortnitepro25 (Henkka) — Visionnaire - Lead designer", "External Cyber Temple Design Group"],
  },
  {
    category: "Special Thanks",
    list: [
      "TheAudioDB — Artist & Album API",
      "Cosmic Contributors Across All Dimensions",
      "The 7th-Dimensional Wi-Fi Grid",
    ],
  },
  {
    category: "Patrons of Agartha",
    list: ["All Visitors, Supporters, and Explorers", "You — Yes, You"],
  },
];

// Colors
const colors = ["#5900ffff", "#3dd46a", "#f8ff23ff", "#5900ffff", "#b57aff", "#ff4d4d", "#e6c65c", "#4ad7e8"];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("credits-container");
  if (!container) return;

  let colorIndex = 0;

  credits.forEach((section) => {
    const block = document.createElement("div");
    block.className = "credits-section";

    // Renders items with auto colors
    const itemsHTML = section.list
      .map((item) => {
        const color = colors[colorIndex % colors.length];
        colorIndex++;
        return `<li style="color: ${color};">${item}</li>`;
      })
      .join("");

    block.innerHTML = `
      <h3 class="hof-section-title">${section.category}</h3>
      <ul class="credits-list">
        ${itemsHTML}
      </ul>
    `;

    container.appendChild(block);
  });
});
