const API_KEY = "2";
document.addEventListener("DOMContentLoaded", async () => {
  const slug = window.location.pathname.split("/").pop().replace(".html", "");
  const searchName = slugToName(slug);
  document.title = `${searchName} • Agartha-X Hall of Fame`;

  try {
    // PROXY FIX
    const searchUrl = `https://www.theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=${encodeURIComponent(
      searchName
    )}`;
    const res = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(searchUrl),
      {
        headers: { "User-Agent": "Agartha-X/1.0" },
      }
    );
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    const data = await res.json();
    const artist = data.artists?.[0];
    if (!artist) throw new Error("Artist not found");

    // Populate info
    document.querySelector(".artist-name").textContent = artist.strArtist;
    document.getElementById("artist-thumb").src =
      artist.strArtistThumb || "../img/placeholder.jpg";

    // FULL BIO
    const fullBio =
      artist.strBiographyEN ||
      "NO BIO TRANSMITTED. SUBJECT UNDER SURVEILLANCE.";
    document.getElementById("artist-bio").innerHTML = fullBio
      .replace(/\r\n/g, "<br>")
      .replace(/\n/g, "<br>");

    await new Promise((r) => setTimeout(r, 800)); // respect rate limit

    // Albums via proxy
    const albumUrl = `https://www.theaudiodb.com/api/v1/json/${API_KEY}/album.php?i=${artist.idArtist}`;
    const albumRes = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(albumUrl),
      {
        headers: { "User-Agent": "Agartha-X/1.0" },
      }
    );
    if (!albumRes.ok) throw new Error(`Albums failed: ${albumRes.status}`);
    const albumData = await albumRes.json();
    const albums = (albumData.album || []).slice(0, 8);

    const grid = document.getElementById("artist-albums");
    grid.innerHTML = "";
    if (albums.length === 0) {
      grid.innerHTML = "<p class='note'>No albums archived yet…</p>";
    } else {
      albums.forEach((alb) => {
        const card = document.createElement("div");
        card.className = "album-card";
        card.innerHTML = `
          <img src="${alb.strAlbumThumb || "../img/noart.jpg"}" alt="${
          alb.strAlbum
        }">
          <p>${alb.strAlbum}<br><span class="year">${
          alb.intYearReleased || "????"
        }</span></p>
        `;
        grid.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
    document.querySelector(".artist-content").innerHTML = `
      <p class="error">TRANSMISSION LOST<br>${err.message}</p>
    `;
  }
});

function slugToName(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
