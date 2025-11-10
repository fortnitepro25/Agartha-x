var featuredContainer = document.getElementById("featured-artist");
var otherContainer = document.getElementById("other-artists");

// FEATURED ARTIST (HIM)
fetch("https://www.theaudiodb.com/api/v1/json/2/search.php?s=HIM")
  .then((response) => response.json())
  .then((data) => {
    var artist = data.artists[0];

    fetch(
      "https://www.theaudiodb.com/api/v1/json/2/album.php?i=" + artist.idArtist
    )
      .then((response) => response.json())
      .then((albumData) => {
        var topAlbum =
          albumData.album && albumData.album[0] ? albumData.album[0] : null;

        // Add title above HIM card
        var sectionTitle = document.createElement("h3");
        sectionTitle.className = "hof-section-title featured-title";
        sectionTitle.textContent = "Most Popular Artist in Agartha";
        featuredContainer.appendChild(sectionTitle);

        // Create HIM card
        var card = document.createElement("div");
        card.className = "hof-item featured-him";

        card.innerHTML = `
          <div class="text-left">
            <h4>${artist.strArtist}</h4>
            <p>${
              artist.strBiographyEN
                ? artist.strBiographyEN.substring(0, 150) + "…"
                : ""
            }</p>
          </div>
          <div class="images-right">
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
            ${
              topAlbum
                ? `<img src="${topAlbum.strAlbumThumb}" alt="${topAlbum.strAlbum}" />`
                : ""
            }
          </div>
        `;
        card.addEventListener("click", () => {
          window.location.href = "artists/him.html";
        });

        

        featuredContainer.appendChild(card);
      });
  });

// OTHER ARTISTS
var otherArtists = [
  { name: "Kanye West", title: "Best Rap Music in Agartha" },
  { name: "Animals As Leaders", title: "Best Alternative Music in Agartha" },
  { name: "Deftones", title: "Best Metal Music in Agartha" },
];

otherArtists.forEach((artistObj) => {
  fetch(
    "https://www.theaudiodb.com/api/v1/json/2/search.php?s=" +
      encodeURIComponent(artistObj.name)
  )
    .then((response) => response.json())
    .then((data) => {
      var artist = data.artists[0];

      fetch(
        "https://www.theaudiodb.com/api/v1/json/2/album.php?i=" +
          artist.idArtist
      )
        .then((response) => response.json())
        .then((albumData) => {
          var topAlbum =
            albumData.album && albumData.album[0] ? albumData.album[0] : null;

          var sectionTitle = document.createElement("h3");
          sectionTitle.className = "hof-section-title";
          sectionTitle.textContent = artistObj.title;
          otherContainer.appendChild(sectionTitle);

          var card = document.createElement("div");
          card.className = "hof-item";

          card.innerHTML = `
            <div class="text-left">
              <h4>${artist.strArtist}</h4>
              <p>${
                artist.strBiographyEN
                  ? artist.strBiographyEN.substring(0, 150) + "…"
                  : ""
              }</p>
            </div>
            <div class="images-right">
              <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
              ${
                topAlbum
                  ? `<img src="${topAlbum.strAlbumThumb}" alt="${topAlbum.strAlbum}" />`
                  : ""
              }
            </div>
          `;

          card.addEventListener("click", () => {
            const pageName =
              artist.strArtist.toLowerCase().replace(/\s+/g, "-") + ".html";
            window.location.href = pageName;
          });

          otherContainer.appendChild(card);
        });
    });
});
